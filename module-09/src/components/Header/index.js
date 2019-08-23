import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Notifications from '~/components/Notifications'
import logo from '~/assets/logo.svg'
import avatar from '~/assets/avatar.svg'

import { Container, Content, Profile } from './styles'

export default function Header () {
  const profile = useSelector(state => state.user.profile)

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" height={50} />
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src={profile.avatar ? profile.avatar.url : avatar}
              alt="Avatar"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  )
}
