import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { format, parseISO, subDays, addDays } from 'date-fns'
import pt from 'date-fns/locale/pt'
import Icon from 'react-native-vector-icons/MaterialIcons'
import GestureRecognizer from 'react-native-swipe-gestures'

import Background from '~/components/Background'
import DatePicker from '~/components/DatePicker'
import Header from '~/components/Header'
import MeetupCard from '~/components/MeetupCard'
import {
  Container,
  SelectDate,
  SelectDateArrow,
  MeetupList,
  NoMeetups,
  NoMeetupsText,
  Loading
} from './styles'

import api from '~/services/api'

export default function Dashboard ({ navigation }) {
  const [date, setDate] = useState(new Date())
  const [meetups, setMeetups] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initialLoad () {
      const data = await reloadMeetups()

      setMeetups(data)
    }

    initialLoad()
    setLoading(false)
  }, [date])

  async function handleSubscribe (id) {
    try {
      await api.post(`/meetups/${id}/subscribe`)

      Alert.alert('Sucesso!', 'Inscrição realizada')

      const data = await reloadMeetups()

      setMeetups(data)
      setLoading(false)

      navigation.navigate('Subscriptions')
    } catch (error) {
      Alert.alert(
        'Falha ao inscrever-se',
        error.response.data.error ? error.response.data.error : 'Houve um erro ao inscrever-se no meetup'
      )
    }
  }

  async function handleUnsubscribe (id) {
    try {
      await api.delete(`/meetups/${id}/unsubscribe`)

      Alert.alert('Sucesso!', 'Sua inscrição foi cancelada')

      const data = await reloadMeetups()

      setMeetups(data)
      setLoading(false)

      navigation.navigate('Subscriptions')
    } catch (error) {
      Alert.alert(
        'Falha ao cancelar sua inscrição',
        error.response.data.error
          ? error.response.data.error
          : 'Houve um erro ao cancelar sua inscrição no meetup'
      )

      const data = await reloadMeetups()

      setMeetups(data)
      setLoading(false)
    }
  }

  async function reloadMeetups () {
    setLoading(true)

    try {
      const response = await api.get('meetups', {
        params: { date }
      })

      const mySubscriptions = await api.get('subscriptions')

      return response.data.map(meetup => ({
        ...meetup,
        subscribed: mySubscriptions.data.filter(subscription => subscription.meetup_id === meetup.id).length > 0,
        date: format(parseISO(meetup.date), "dd 'de' MMMM',' 'às' HH'h'", {
          locale: pt
        })
      }))
    } catch (error) {
      Alert.alert(
        'Falha ao carregar meetups',
        error.response.data.error ? error.response.data.error : 'Houve um erro ao carregar meetups'
      )

      return meetups
    }
  }

  async function loadMore () {
    setLoading(true)

    const nextPage = page + 1

    try {
      const response = await api.get('meetups', {
        params: { date, page: nextPage }
      })

      const data = response.data.map(meetup => ({
        ...meetup,
        date: format(parseISO(meetup.date), "dd 'de' MMMM',' 'às' HH'h'", {
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

  async function handlePrevDay () {
    setLoading(true)
    setDate(subDays(date, 1))
  }

  async function handleNextDay () {
    setLoading(true)
    setDate(addDays(date, 1))
  }

  return (

    <Background>
      <Header />

      <Container>
        <SelectDate>
          <SelectDateArrow>
            <Icon
              onPress={handlePrevDay}
              name="chevron-left"
              size={28}
              color="#fff"
            />
          </SelectDateArrow>
          <DatePicker date={date} onChange={setDate} />
          <SelectDateArrow>
            <Icon
              onPress={handleNextDay}
              name="chevron-right"
              size={28}
              color="#fff"
            />
          </SelectDateArrow>
        </SelectDate>

        {loading && <Loading />}

        {!loading &&
          (meetups.length ? (
            <MeetupList
              data={meetups}
              onEndReachedThreshold={0.2}
              onEndReached={meetups.length >= 10 ? loadMore : null}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <GestureRecognizer
                  onSwipeLeft={handleNextDay}
                  onSwipeRight={handlePrevDay}
                  style={{
                    flex: 1
                  }}
                >
                  <MeetupCard
                    data={item}
                    onHandle={() => item.subscribed ? handleUnsubscribe(item.id) : handleSubscribe(item.id)}
                    textButton={
                      item.past
                        ? 'O meetup terminou'
                        : (item.subscribed ? 'Cancelar inscrição' : 'Realizar inscrição')
                    }
                  />

                </GestureRecognizer>
              )}
            />
          ) : (
            <GestureRecognizer
              onSwipeLeft={handleNextDay}
              onSwipeRight={handlePrevDay}
              style={{
                flex: 1
              }}
            >
              <NoMeetups>
                <Icon
                  name="event-busy"
                  size={48}
                  color="#fff"
                />
                <NoMeetupsText>Não há meetups</NoMeetupsText>

              </NoMeetups>
            </GestureRecognizer>
          ))
        }

      </Container>

    </Background>
  )
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => <Icon name="list" size={20} color={tintColor} />
}
