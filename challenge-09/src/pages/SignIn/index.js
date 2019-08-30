import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Input } from '@rocketseat/unform'
import { signInRequest } from '~/store/modules/auth/actions'

import logo from '~/assets/logo.svg'

import schema from '~/validators/LoginValidation'

export default function SignIn () {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)

  function handleSubmit ({ email, password }) {
    dispatch(signInRequest(email, password))
  }

  return (
    <>
      <img src={logo} alt="Meetapp" />

      <Form
        schema={schema}
        onSubmit={handleSubmit}
      >
        <Input type="email" name="email" placeholder="Seu email" />
        <Input type="password" name="password" placeholder="Sua senha" />

        <button type="submit">{ loading ? 'Carregando...' : 'Entrar' }</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  )
}
