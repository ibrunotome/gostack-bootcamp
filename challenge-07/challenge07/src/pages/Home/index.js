import React, { Component } from 'react'
import { FlatList, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

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

Icon.loadFont()

export default class Home extends Component {
  state = {
    products: [],
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const response = await api.get('/products')

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }))

    this.setState({ products: data })
  }

  renderProduct = ({ item }) => {
    return (
      <Product key={item.id}>
        <ProductImage source={{ uri: item.image }} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{formatPrice(item.price)}</ProductPrice>
        <AddButton onPress={() => ({})}>
          <ProductAmount>
            <Icon name="add-shopping-cart" color="#FFF" size={20} />
            <ProductAmountText>{0}</ProductAmountText>
          </ProductAmount>
          <AddButtonText>ADICIONAR</AddButtonText>
        </AddButton>
      </Product>
    )
  }

  render() {
    const { products } = this.state

    return (
      <ImageBackground source={background} style={{ width: '100%' }}>
        <FlatList
          horizontal
          data={products}
          extraData={this.props}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderProduct}
        />
      </ImageBackground>
    )
  }
}
