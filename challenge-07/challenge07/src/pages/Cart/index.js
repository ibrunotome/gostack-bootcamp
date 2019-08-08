import React, { Component } from 'react'
import { ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CartActions from '../../store/modules/cart/actions'
import { formatPrice } from '../../util/format'
import Icon from 'react-native-vector-icons/MaterialIcons'

import background from '../../assets/background.png'
Icon.loadFont()

class Cart extends Component {
  render() {
    return <ImageBackground source={background} style={{ width: '100%' }}></ImageBackground>
  }
}

const mapStateToProps = state => ({
  products: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
    priceFormatted: formatPrice(product.price),
  })),
  total: formatPrice(state.cart.reduce((total, product) => total + product.price * product.amount, 0)),
})

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart)
