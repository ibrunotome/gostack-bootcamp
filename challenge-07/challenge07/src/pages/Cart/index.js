import React from 'react'
import { ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CartActions from '../../store/modules/cart/actions'
import { formatPrice } from '../../util/format'
import { EmptyContainer, EmptyText } from './styles'
import background from '../../assets/background-reversed.png'
import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont()

function Cart({ navigation, products }) {
  return (
    <ImageBackground source={background} style={{ width: '100%' }}>
      {products.length === 0 && (
        <EmptyContainer>
          <Icon name="remove-shopping-cart" size={64} color="#eee" />
          <EmptyText>Seu carrinho está vazio.</EmptyText>
        </EmptyContainer>
      )}
    </ImageBackground>
  )
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
