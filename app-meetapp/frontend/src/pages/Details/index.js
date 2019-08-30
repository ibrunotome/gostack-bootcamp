import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { pt } from 'date-fns/locale/es'
import { toast } from 'react-toastify'
import { MdDeleteForever, MdEdit, MdPlace, MdEvent } from 'react-icons/md'
import { Container, Content, Cover, Description, DescriptionDetails, Header, HeaderButtons } from './styles'
import { Button } from '~/components/Button'
import api from '~/services/api'

export default function Details ({ history, match }) {
  const [meetup, setMeetup] = useState([])
  const meetupId = match.params.id

  function dateFormatted (date) {
    return date ? format(parseISO(date), "dd 'de' MMMM yyyy', às' HH:mm'h'", { locale: pt }) : null
  }

  async function cancelMeetup () {
    try {
      if (window.confirm('Deseja realmente apagar este meetup?')) {
        await api.delete(`meetups/${meetupId}`)
        toast.success('O meetup foi apagado')
        history.push('/dashboard')
      }
    } catch (error) {
      toast.error('Não conseguimos cancelar o meetup')
    }
  }

  useEffect(() => {
    async function loadMeetup () {
      try {
        const { data } = await api.get(`meetups/${meetupId}`)

        setMeetup(data)
      } catch (error) {
        toast.error('Falha ao carregar meetup')
      }
    }

    loadMeetup()
  }, [meetupId])

  return (
    <Container>
      <Content>

        <Header>
          <h1>{meetup.title || 'Carregando...'}</h1>
          <HeaderButtons>
            <Link to={`/edit/${meetup.id}`}>
              <Button color="#4DBAF9" disabled={meetup.past}>
                <MdEdit size={20}/>
                <div>Editar</div>
              </Button>
            </Link>
            <Button onClick={() => cancelMeetup()} disabled={meetup.past}>
              <MdDeleteForever size={20}/>
              <div>Apagar</div>
            </Button>
          </HeaderButtons>
        </Header>

        <Cover>
          <img
            src={meetup.cover ? meetup.cover.url : 'https://coverpixs.com/images/items/itm_2013-01-27_11-43-42_2.jpg' }
            alt="Cover"
          />
        </Cover>

        <Description>
          <p>{meetup.description || 'Carregando...' }</p>

          <DescriptionDetails>
            <div>
              <MdEvent/> <span>{dateFormatted(meetup.date)}</span>
            </div>
            <div>
              <MdPlace/> <span>{meetup.location}</span>
            </div>
          </DescriptionDetails>

        </Description>

      </Content>
    </Container>
  )
}
