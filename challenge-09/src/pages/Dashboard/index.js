import React, { useState, useEffect } from 'react'

import { format, parseISO } from 'date-fns'
import { pt } from 'date-fns/locale/es'
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md'
import { Container, Content, Header, Meetups, Meetup, MeetupActions } from './styles'
import api from '~/services/api'

export default function Dashboard () {
  const [meetups, setMeetups] = useState([])

  useEffect(() => {
    async function loadMeetups () {
      const response = await api.get('meetups/organizing')

      setMeetups(response.data)
    }

    loadMeetups()
  }, [])

  function dateFormatted (date) {
    return format(parseISO(date), "dd 'de' MMMM yyyy', às' HH:mm'h'", { locale: pt })
  }

  return (
    <Container>
      <Content>

        <Header>
          <h1>Meus meetups</h1>
          <button type="button">
            <MdAddCircleOutline size={20}/>
            <div>Novo meetup</div>
          </button>
        </Header>

        <Meetups>
          {meetups.map(meetup => (
            <Meetup>
              <strong>{meetup.title}</strong>
              <MeetupActions>
                <span>{dateFormatted(meetup.date)}</span>
                <MdChevronRight size={30} />
              </MeetupActions>
            </Meetup>
          ))}
        </Meetups>

      </Content>
    </Container>
  )
}
