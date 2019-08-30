import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '~/assets/logo.svg'
import { signOut } from '~/store/modules/auth/actions'
import { Container, Content, Profile } from './styles'

export default function Header () {
  const profile = useSelector(state => state.user.profile)

  const dispatch = useDispatch()

  function handleSignOut () {
    dispatch(signOut())
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="MeetApp" />
          </Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <button type="button" onClick={handleSignOut}>Sair</button>
          </Profile>
        </aside>
      </Content>
    </Container>
  )
}
