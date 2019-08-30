import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input } from '@rocketseat/unform'
import { MdList } from 'react-icons/md'

import { Container, Content, Header } from './styles'
import { Button } from '~/components/Button'

import { updateProfileRequest } from '~/store/modules/user/actions'

import schema from '~/validators/UserUpdate'

export default function Profile () {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.user.profile)

  function handleSubmit (data) {
    dispatch(updateProfileRequest(data))
  }

  return (
    <Container>
      <Content>
        <Header>
          <h1>Meu perfil</h1>
          <Link to="/dashboard">
            <Button >
              <MdList size={20}/>
              <div>Meus meetups</div>
            </Button>
          </Link>
        </Header>

        <Form
          schema={schema}
          initialData={profile}
          onSubmit={handleSubmit}
        >
          <Input name="name" placeholder="Nome completo" />
          <Input name="email" type="email" placeholder="Seu endereço de e-mail" />

          <hr />

          <Input
            name="oldPassword"
            type="password"
            placeholder="Seu senha atual"
          />

          <Input name="password" type="password" placeholder="Nova senha" />

          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirmar nova senha"
          />

          <div align="right">
            <button type="submit">Salvar</button>
          </div>
        </Form>
      </Content>
    </Container>
  )
}
