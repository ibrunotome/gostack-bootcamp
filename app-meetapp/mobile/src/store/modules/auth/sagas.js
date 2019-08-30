import { Alert } from 'react-native'
import { takeLatest, call, put, all } from 'redux-saga/effects'
import api from '~/services/api'

import { signInSuccess, signFailure } from './actions'
import Navigation from '../../../navigation'

export function * signIn ({ payload }) {
  try {
    const { email, password } = payload

    const response = yield call(api.post, 'login', {
      email,
      password
    })

    const { token, user } = response.data

    api.defaults.headers.Authorization = `Bearer ${token}`

    yield put(signInSuccess(token, user))
  } catch (error) {
    Alert.alert('Falha na autenticação', 'Verifique seus dados')

    yield put(signFailure())
  }
}

export function * signUp ({ payload }) {
  try {
    const { name, email, password } = payload

    yield call(api.post, 'users', {
      name,
      email,
      password
    })

    Navigation.navigate('SignIn')

    Alert.alert('Feito!', 'Conta criada com sucesso. Faça o login para continuar')
  } catch (error) {
    Alert.alert('Falha no cadastro', error.response.data.messages[0] ? error.response.data.messages[0].message : 'Confira seus dados')

    yield put(signFailure())
  }
}

export function setToken ({ payload }) {
  if (!payload) return

  const { token } = payload.auth

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  }
}

export function signOut () {
  Alert.alert('Até mais')
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut)
])
