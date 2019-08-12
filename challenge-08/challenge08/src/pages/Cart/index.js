import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CartActions from '../../store/modules/cart/actions'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { formatPrice } from '../../util/format'

import {
  Container,
  ProductInfo,
  ProductImage,
  ProductDetails,
  ProductPrice,
  ProductDelete,
  ProductControls,
  ProductAmount,
  ProductSubtotal,
  TotalContainer,
  TotalText,
  TotalAmount,
  Order,
  OrderText,
  EmptyContainer,
  EmptyText,
} from './styles'

function Cart({ products, total, removeFromCart, updateAmountRequest }) {
  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1)
  }

  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1)
  }

  return (
    <Container>
      {products.length ? (
        <>
          <View>
            {products.map(product => (
              <View key={product.id}>
                <ProductInfo>
                  <ProductImage source={{ uri: product.image }} />
                  <ProductDetails>
                    <Text>{product.title}</Text>
                    <ProductPrice>{product.priceFormatted}</ProductPrice>
                  </ProductDetails>
                  <ProductDelete onPress={() => removeFromCart(product.id)}>
                    <Icon name="delete-forever" size={24} color={'#7159ca'} />
                  </ProductDelete>
                </ProductInfo>
                <ProductControls>
                  <TouchableOpacity onPress={() => decrement(product)}>
                    <Icon name="remove-circle-outline" size={20} color={'#7159ca'} />
                  </TouchableOpacity>
                  <ProductAmount value={String(product.amount)} />
                  <TouchableOpacity onPress={() => increment(product)}>
                    <Icon name="add-circle-outline" size={20} color={'#7159ca'} />
                  </TouchableOpacity>
                  <ProductSubtotal>{product.subtotal}</ProductSubtotal>
                </ProductControls>
              </View>
            ))}
          </View>
          <TotalContainer>
            <TotalText>TOTAL</TotalText>
            <TotalAmount>{total}</TotalAmount>
            <Order>
              <OrderText>FINALIZAR PEDIDO</OrderText>
            </Order>
          </TotalContainer>
        </>
      ) : (
        <EmptyContainer>
          <Icon name="remove-shopping-cart" size={64} color="#eee" />
          <EmptyText>Seu carrinho está vazio.</EmptyText>
        </EmptyContainer>
      )}
    </Container>
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
