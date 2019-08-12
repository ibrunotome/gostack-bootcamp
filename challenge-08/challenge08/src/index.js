import React from 'react'
import { Provider } from 'react-redux'
import './config/ReactotronConfig'
import { StatusBar } from 'react-native'
import store from './store'

import Routes from './routes'
import Navigation from './navigation'

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes ref={navigatorRef => Navigation.setNavigator(navigatorRef)} />
    </Provider>
  )
}
