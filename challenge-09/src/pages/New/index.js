import React, { useState } from 'react'

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

import schema from '~/validators/MeetupStore'

export default function New () {
  const [fileId, setFileId] = useState('')

  async function handleSubmit (data) {
    try {
      setFileId(data.file_id)

      if (window.confirm('Confirma a criação do meetup?')) {
        const response = await api.post('meetups', data)
        const { id } = response.data

        toast.success('Meetup adicionado com sucesso')
        history.push(`/details/${id}`)
      }
    } catch (error) {
      toast.error(error.response.data.messages[0] ? error.response.data.messages[0].message : 'Confira os dados')
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <h1>Novo meetup</h1>
          <Link to="/dashboard">
            <Button >
              <MdList size={20}/>
              <div>Meus meetups</div>
            </Button>
          </Link>
        </Header>

        <Form
          schema={schema}
          onSubmit={handleSubmit}
        >

          <Input
            id="fileId"
            type="hidden"
            name="file_id"
            value={fileId}
          />

          <CoverInput />

          <Input
            name="title"
            type="text"
            autoComplete="off"
            placeholder="Título do Meetup"
          />

          <Input
            multiline
            name="description"
            autoComplete="off"
            placeholder="Descrição completa"
          />

          <DatePicker
            name="date"
            autoComplete="off"
            placeholder="Data"
          />

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
