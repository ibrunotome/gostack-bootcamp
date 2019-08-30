import React, { useState, useEffect } from 'react'

import { parseISO } from 'date-fns'
import { Link } from 'react-router-dom'
import { Form, Input } from '@rocketseat/unform'
import { MdList } from 'react-icons/md'
import { toast } from 'react-toastify'
import 'react-datepicker/dist/react-datepicker.css'

import { Container, Content, Header } from './styles'
import { Button } from '~/components/Button'

import api from '~/services/api'
import history from '~/services/history'
import CoverInput from '~/components/CoverInput'
import DatePicker from '~/components/DatePicker'

import schema from '~/validators/MeetupUpdate'

export default function Edit ({ match }) {
  const [fileId, setFileId] = useState('')
  const [meetup, setMeetup] = useState({})
  const meetupId = match.params.id

  async function handleSubmit (data) {
    try {
      setFileId(data.fileId)

      if (window.confirm('Confirma a atualização do meetup?')) {
        const response = await api.put(`meetups/${meetupId}`, data)
        const { id } = response.data

        toast.success('Meetup atualizado com sucesso')
        history.push(`/details/${id}`)
      }
    } catch (error) {
      toast.error(error.response.data.messages[0] ? error.response.data.messages[0].message : 'Confira seus dados')
    }
  }

  useEffect(() => {
    async function loadMeetup () {
      try {
        const { data } = await api.get(`meetups/${meetupId}`)

        data.date = parseISO(data.date)

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
          <h1>Editar meetup</h1>
          <Link to="/dashboard">
            <Button >
              <MdList size={20}/>
              <div>Meus meetups</div>
            </Button>
          </Link>
        </Header>

        <Form
          schema={schema}
          initialData={meetup}
          onSubmit={handleSubmit}
        >

          <Input
            id="fileId"
            type="hidden"
            value={fileId || meetup.file_id}
            name="file_id"
          />

          {meetup.cover && <CoverInput />}

          <Input
            name="title"
            type="text"
            autoComplete="off"
            placeholder="Título do Meetup"
          />

          <Input
            name="description"
            placeholder="Descrição completa"
            multiline
            value={meetup.description}
            onChange={(e) => setMeetup({ ...meetup, description: e.target.value })}
          />

          {meetup.date && <DatePicker
            name="date"
            autoComplete="off"
            placeholder="Data"
          />}

          <Input
            name="location"
            type="text"
            autoComplete="off"
            placeholder="Localização"
          />

          <div align="right" id="save">
            <button type="submit">Salvar</button>
          </div>
        </Form>
      </Content>
    </Container>
  )
}
