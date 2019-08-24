import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import CodePush from 'react-native-code-push'
import './config/ReactotronConfig'

import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'

import { store, persistor } from './store'
import App from './App'

function Index () {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#7159ca" />
        <App />
      </PersistGate>
    </Provider>
  )
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME
})(Index)
