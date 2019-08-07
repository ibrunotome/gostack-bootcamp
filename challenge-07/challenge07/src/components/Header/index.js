import React from 'react'
import { connect } from 'react-redux'
import { Container, Logo, BasketContainer, ItemCount } from './styles'

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont()

function Header({ amountInCart }) {
  return (
    <Container>
      <Logo />
      <BasketContainer>
        <Icon name="shopping-basket" color="#FFF" size={24} />
        <ItemCount>{amountInCart || 0}</ItemCount>
      </BasketContainer>
    </Container>
  )
}

export default connect(
  state => ({
    amountInCart: state.cart.length,
  }),
  null,
)(Header)
