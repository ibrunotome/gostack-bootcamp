import React from 'react'
import { Link } from 'react-router-dom'
import logo from '~/assets/logo.svg'
import { Container, Content, Profile } from './styles'

export default function Header () {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="MeetApp" />
          <Link to="/dashboard"></Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Bruno Tomé</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <button type="button">Sair</button>
          </Profile>
        </aside>
      </Content>
    </Container>
  )
}
