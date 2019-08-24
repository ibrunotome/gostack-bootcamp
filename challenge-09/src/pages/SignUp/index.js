import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup'
import logo from '~/assets/logo.svg'

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('A senha é obrigatória')
})

export default function SignUp () {
  function handleSubmit (data) {
    console.tron.log(data)
  }

  return (
    <>
      <img src={logo} alt="Meetapp" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="Seu email" />
        <Input type="text" name="name" placeholder="Seu nome" />
        <Input type="password" name="password" placeholder="Sua senha" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já possuo um login</Link>
      </Form>
    </>
  )
}
