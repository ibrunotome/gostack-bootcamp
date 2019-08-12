import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList, ImageBackground, ScrollView } from 'react-native'
import * as CartActions from '../../store/modules/cart/actions'

import background from '../../assets/background.png'

import {
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddButton,
  ProductAmount,
  ProductAmountText,
  AddButtonText,
} from './styles'

import api from '../../services/api'
import { formatPrice } from '../../util/format'
import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont()

function Home() {
  const [products, setProducts] = useState([])

  const amount = useSelector(state =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount
      return amount
    }, {}),
  )

  const dispatch = useDispatch()

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/products')

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }))

      setProducts(data)
    }

    getProducts()
  }, [])

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id))
  }

  function renderProduct({ item }) {
    return (
      <Product key={item.id}>
        <ProductImage source={{ uri: item.image }} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{formatPrice(item.price)}</ProductPrice>
        <AddButton onPress={() => handleAddProduct(item.id)}>
          <ProductAmount>
            <Icon name="add-shopping-cart" color="#FFF" size={20} />
            <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
          </ProductAmount>
          <AddButtonText>ADICIONAR</AddButtonText>
        </AddButton>
      </Product>
    )
  }

  return (
    <ImageBackground source={background} style={{ width: '100%' }}>
      <ScrollView>
        <FlatList
          horizontal
          data={products.filter(product => product.category === 'shoes')}
          extraData={amount}
          keyExtractor={item => String(item.id)}
          renderItem={renderProduct}
        />
        <FlatList
          horizontal
          data={products.filter(product => product.category === 'sandals')}
          extraData={amount}
          keyExtractor={item => String(item.id)}
          renderItem={renderProduct}
        />
      </ScrollView>
    </ImageBackground>
  )
}

export default Home
