import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { Form, Input } from '@rocketseat/unform'
import { MdList } from 'react-icons/md'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import 'react-datepicker/dist/react-datepicker.css'

import { Container, Content, Header } from './styles'
import { Button } from '~/components/Button'

import api from '~/services/api'
import history from '~/services/history'
import CoverInput from '~/components/CoverInput'
import DatePicker from '~/components/DatePicker'

const schema = Yup.object().shape({
  fileId: Yup.string()
    .required('Seleciona a capa do evento'),
  title: Yup.string()
    .min(6, 'O título deve ter no mínimo 6 caracteres')
    .max(50, 'O título deve ter no máximo 50 caracteres')
    .required('O título é obrigatório'),
  description: Yup.string()
    .max(255, 'A descrição não pode ultrapassar 255 caracteres')
    .required('A descrição do evento é obrigatória'),
  location: Yup.string()
    .max(50, 'A localização não pode ultrapassar 50 caracteres')
    .required('A localização é obrigatória'),
  date: Yup.date().required('A data é obrigatória')
})

export default function New () {
  const [fileId, setFileId] = useState('')

  async function handleSubmit (data) {
    try {
      setFileId(data.fileId)

      if (window.confirm('Confirma a criação do meetup?')) {
        const response = await api.post('meetups', data)
        const { id } = response.data

        toast.success('Meetup adicionado com sucesso')
        history.push(`/details/${id}`)
      }
    } catch (error) {
      toast.error('Falha ao adicionar novo meetup')
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

        <Form schema={schema} onSubmit={handleSubmit}>
          <Input
            id="fileId"
            type="hidden"
            name="fileId"
            value={fileId}
          />

          <CoverInput />

          <Input
            name="title"
            type="text"
            autocomplete="off"
            placeholder="Título do Meetup"
          />

          <Input
            multiline
            name="description"
            autocomplete="off"
            placeholder="Descrição completa"
          />

          <DatePicker
            name="date"
            autocomplete="off"
            placeholder="Data"
          />

          <Input
            name="location"
            type="text"
            autocomplete="off"
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
