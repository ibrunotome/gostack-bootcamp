import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Input } from '@rocketseat/unform'
import logo from '~/assets/logo.svg'

import { signUpRequest } from '~/store/modules/auth/actions'

import schema from '~/validators/UserStore'

export default function SignUp () {
  const dispatch = useDispatch()

  function handleSubmit ({ name, email, password }) {
    dispatch(signUpRequest(name, email, password))
  }

  return (
    <>
      <img src={logo} alt="Meetapp" />

      <Form
        schema={schema}
        onSubmit={handleSubmit}
      >
        <Input type="email" name="email" placeholder="Seu email" />
        <Input type="text" name="name" placeholder="Seu nome" />
        <Input type="password" name="password" placeholder="Sua senha" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já possuo um login</Link>
      </Form>
    </>
  )
}
