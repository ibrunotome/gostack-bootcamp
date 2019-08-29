import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { format, parseISO, isBefore, subDays, addDays } from 'date-fns'
import pt from 'date-fns/locale/pt'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Background from '~/components/Background'
import Header from '~/components/Header'
import MeetupCard from '~/components/MeetupCard'
import { Container, SelectDate, SelectedDate, SelectDateButton, MeetupList } from './styles'

import api from '~/services/api'

export default function Dashboard () {
  const [date, setDate] = useState(new Date())
  const [meetups, setMeetups] = useState([])

  const dateFormatted = format(date, "dd 'de' MMMM", {
    locale: pt
  })

  useEffect(() => {
    async function loadMeetups () {
      try {
        const response = await api.get('meetups', {
          params: { date }
        })

        const data = response.data.map(meetup => ({
          ...meetup,
          past: isBefore(parseISO(meetup.date), new Date()),
          defaultDate: meetup.date,
          date: format(parseISO(meetup.date), "dd 'de' MMMM',' 'às' HH'h'", {
            locale: pt
          })
        }))

        setMeetups(data)
      } catch (error) {
        Alert.alert(
          'Falha na busca',
          'Houve um erro ao realizar a busca dos meetups'
        )
      }
    }

    loadMeetups()
  }, [date])

  function handlePrevDay () {
    setDate(subDays(date, 1))
  }

  function handleNextDay () {
    setDate(addDays(date, 1))
  }

  return (
    <Background>
      <Header />
      <Container>
        <SelectDate>
          <SelectDateButton>
            <Icon
              onPress={handlePrevDay}
              name="chevron-left"
              size={28}
              color="#fff"
            />
          </SelectDateButton>
          <SelectedDate>{dateFormatted}</SelectedDate>
          <SelectDateButton>
            <Icon
              onPress={handleNextDay}
              name="chevron-right"
              size={28}
              color="#fff"
            />
          </SelectDateButton>
        </SelectDate>

        <MeetupList
          data={meetups}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MeetupCard
              data={item}
              textButton="Realizar inscrição"
            />
          )}
        />
      </Container>
    </Background>
  )
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => <Icon name="list" size={20} color={tintColor} />
}
