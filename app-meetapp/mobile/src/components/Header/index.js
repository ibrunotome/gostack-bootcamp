import React from 'react'
import { Image } from 'react-native'
import logo from '~/assets/logo.png'

import { Logo } from './styles'

export default function Header () {
  return (
    <Logo>
      <Image source={logo} />
    </Logo>
  )
}
