import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Main from './pages/Main'
import Header from './components/Header'

const Routes = createAppContainer(
  createStackNavigator(
    { Main },
    {
      initialRouteName: 'Main',
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
