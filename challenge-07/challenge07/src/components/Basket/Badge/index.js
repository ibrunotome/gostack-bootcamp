import React from 'react'
import { connect } from 'react-redux'
import { ItemCount } from '../styles'

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont()

function Badge ({ amountInCart }) {
  return <ItemCount>{amountInCart || 0}</ItemCount>
}

export default connect(
  state => ({
    amountInCart: state.cart.length
  }),
  null
)(Badge)
