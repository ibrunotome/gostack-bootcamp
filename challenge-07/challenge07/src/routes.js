import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Home from './pages/Home'
import Header from './components/Header'

const Routes = createAppContainer(
  createStackNavigator(
    { Home },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#141419',
        },
        headerTitle: <Header />,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  ),
)

export default Routes
