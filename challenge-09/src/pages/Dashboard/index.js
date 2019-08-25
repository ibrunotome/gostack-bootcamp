import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { format, parseISO } from 'date-fns'
import { pt } from 'date-fns/locale/es'
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md'
import { Container, Content, Header, Meetups, Meetup, MeetupActions } from './styles'
import { Button } from '~/components/Button'
import api from '~/services/api'

export default function Dashboard () {
  const [meetups, setMeetups] = useState([])

  useEffect(() => {
    async function loadMeetups () {
      try {
        const { data } = await api.get('meetups/organizing')

        setMeetups(data)
      } catch (error) {
        toast.error('Falha ao carregar meetups')
      }
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
          <Button>
            <MdAddCircleOutline size={20}/>
            <div>Novo meetup</div>
          </Button>
        </Header>

        <Meetups>
          {meetups.map(meetup => (
            <Link to={`/details/${meetup.id}`}>
              <Meetup>
                <strong>{meetup.title}</strong>
                <MeetupActions>
                  <span>{dateFormatted(meetup.date)}</span>
                  <MdChevronRight size={30} />
                </MeetupActions>
              </Meetup>
            </Link>
          ))}
        </Meetups>

      </Content>
    </Container>
  )
}
