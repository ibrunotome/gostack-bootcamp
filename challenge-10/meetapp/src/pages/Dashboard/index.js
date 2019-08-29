import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { format, parseISO, isBefore, subDays, addDays } from 'date-fns'
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
  NoMeetupsText
} from './styles'

import api from '~/services/api'

export default function Dashboard () {
  const [date, setDate] = useState(new Date())
  const [meetups, setMeetups] = useState([])

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

        {
          (meetups.length ? (
            <MeetupList
              data={meetups}
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
                    textButton="Realizar inscrição"
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
