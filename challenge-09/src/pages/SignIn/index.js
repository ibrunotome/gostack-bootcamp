import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input } from '@rocketseat/unform'
import logo from '~/assets/logo.svg'

export default function SignIn () {
  function handleSubmit (data) {
    console.tron.log(data)
  }

  return (
    <>
      <img src={logo} alt="Meetapp" />

      <Form onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="Seu email" />
        <Input type="password" name="password" placeholder="Sua senha" />

        <button type="submit">Entrar</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  )
}
