import React, { Component } from 'react'
import { FlatList, Text } from 'react-native'
import { Container } from './styles'

import api from '../../services/api'
import { formatPrice } from '../../util/format'

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

  render() {
    const { products } = this.state

    return (
      <Container>
        <FlatList
          horizontal
          data={products}
          extraData={this.props}
          keyExtractor={item => String(item.id)}
          renderItem={() => <Text>oi</Text>}
        />
      </Container>
    )
  }
}
