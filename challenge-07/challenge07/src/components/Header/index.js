import React from 'react'
import { Container, Logo, BasketContainer, ItemCount } from './styles'

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont()

function Header() {
  return (
    <Container>
      <Logo />
      <BasketContainer>
        <Icon name="shopping-basket" color="#FFF" size={24} />
        <ItemCount>0</ItemCount>
      </BasketContainer>
    </Container>
  )
}

export default Header
