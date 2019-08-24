import React from 'react'
import { Link } from 'react-router-dom'
import logo from '~/assets/logo.svg'

export default function SignUp () {
  return (
    <>
      <img src={logo} alt="Meetapp" />

      <form>
        <input type="email" name="email" placeholder="Seu email" />
        <input type="text" name="name" placeholder="Seu nome" />
        <input type="password" name="password" placeholder="Sua senha" />

        <button type="submit">Entrar</button>
        <Link to="/">Já possuo um login</Link>
      </form>
    </>
  )
}
