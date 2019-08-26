import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input } from '@rocketseat/unform'
import { Container, Content } from './styles'

import { updateProfileRequest } from '~/store/modules/user/actions'

export default function Profile () {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.user.profile)

  function handleSubmit (data) {
    dispatch(updateProfileRequest(data))
  }

  return (
    <Container>
      <Content>
        <Form initialData={profile} onSubmit={handleSubmit}>
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
