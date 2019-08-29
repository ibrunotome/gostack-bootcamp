import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { format, parseISO, isBefore } from 'date-fns'
import pt from 'date-fns/locale/pt'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ComunnityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import Background from '~/components/Background'
import Header from '~/components/Header'
import MeetupCard from '~/components/MeetupCard'
import {
  Container,
  MeetupList,
  NoMeetups,
  NoMeetupsText,
  Loading
} from './styles'

import api from '~/services/api'

export default function Dashboard () {
  const [meetups, setMeetups] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSubscriptions () {
      try {
        const response = await api.get('/subscriptions')

        const data = response.data.map(subscription => ({
          ...subscription.Meetup,
          date: format(parseISO(subscription.Meetup.date), "dd 'de' MMMM',' 'às' HH'h'", {
            locale: pt
          })
        }))

        setMeetups(data)
      } catch (error) {
        Alert.alert(
          'Falha ao carregar meetups',
          error.response.data.error
            ? error.response.data.error
            : 'Houve um erro ao carregar meetups'
        )
      }
    }

    loadSubscriptions()
    setLoading(false)
  })

  async function handleUnsubscribe (id) {
    try {
      await api.delete(`/meetups/${id}/unsubscribe`)

      Alert.alert('Sucesso!', 'Sua inscrição foi cancelada')

      setMeetups(meetups.filter(data => data.id !== id))
    } catch (error) {
      Alert.alert(
        'Falha ao cancelar sua inscrição',
        error.response.data.error
          ? error.response.data.error
          : 'Houve um erro ao cancelar sua inscrição no meetup'
      )
    }
  }

  async function loadMore () {
    setLoading(true)

    const nextPage = page + 1

    try {
      const response = await api.get('/subscriptions', {
        params: { page: nextPage }
      })

      const data = response.data.map(subscription => ({
        ...subscription.Meetup,
        past: isBefore(parseISO(subscription.Meetup.date), new Date()),
        date: format(parseISO(subscription.Meetup.date), "dd 'de' MMMM',' 'às' HH'h'", {
          locale: pt
        })
      }))

      setMeetups([...meetups, ...data])
      setPage(nextPage)
    } catch (error) {
      Alert.alert(
        'Falha ao carregar mais meetups',
        error.response.data.error ? error.response.data.error : 'Houve um erro ao carregar mais meetups'
      )
    }

    setLoading(false)
  }

  return (

    <Background>
      <Header />

      <Container>
        {loading && <Loading />}

        {!loading &&
          (meetups.length ? (
            <MeetupList
              data={meetups}
              onEndReachedThreshold={0.2}
              onEndReached={meetups.length >= 10 ? loadMore : null}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <MeetupCard
                  data={item}
                  onHandle={() => handleUnsubscribe(item.id)}
                  textButton="Cancelar inscrição"
                />
              )}
            />
          ) : (
            <NoMeetups>
              <Icon
                name="event-busy"
                size={48}
                color="#fff"
              />
              <NoMeetupsText>Não há inscrições</NoMeetupsText>
            </NoMeetups>
          ))
        }

      </Container>

    </Background>
  )
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => <ComunnityIcon name="tag" size={20} color={tintColor} />
}
