import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Home from './pages/Home'
import Cart from './pages/Cart'
import Badge from './components/Basket/Badge'
import { BasketContainer, Logo } from './components/Basket/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont()

const Routes = createAppContainer(
  createStackNavigator(
    { Home, Cart },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: navigation => ({
        headerStyle: {
          backgroundColor: '#141419',
        },
        headerTitle: <Logo />,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: (
          <BasketContainer onPress={() => navigation.navigation.navigate('Cart')}>
            <Icon name="shopping-basket" color="#FFF" size={24} />
            <Badge />
          </BasketContainer>
        ),
      }),
    },
  ),
)

export default Routes
