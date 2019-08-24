import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup'

import logo from '~/assets/logo.svg'

import { signUpRequest } from '~/store/modules/auth/actions'

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
  const dispatch = useDispatch()

  function handleSubmit ({ name, email, password }) {
    dispatch(signUpRequest(name, email, password))
  }

  return (
    <>
      <img src={logo} alt="GoBarber" height={100} />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já possuo um login</Link>
      </Form>
    </>
  )
}
