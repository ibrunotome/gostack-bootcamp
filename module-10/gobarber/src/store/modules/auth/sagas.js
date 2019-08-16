import { Alert } from 'react-native'
import { takeLatest, call, put, all, delay } from 'redux-saga/effects'
import api from '~/services/api'

import { signInSuccess, signFailure } from './actions'

export function* signIn({ payload }) {
  try {
    const { email, password } = payload

    const response = yield call(api.post, 'auth', {
      email,
      password,
    })

    const { token, user } = response.data

    if (user.provider) {
      Alert.alert('Erro no login', 'Aplicação somente para clientes, use o website para gerenciar seus agendamentos')
      return
    }

    api.defaults.headers.Authorization = `Bearer ${token}`

    yield delay(1000)

    yield put(signInSuccess(token, user))

    // history.push('/dashboard')
  } catch (error) {
    Alert.alert('Falha na autenticação', 'Verifique seus dados')
    yield put(signFailure())
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload

    yield call(api.post, 'users', {
      name,
      email,
      password,
    })

    // history.push('/')
  } catch (error) {
    Alert.alert('Falha no cadastro', 'Verifique seus dados')

    yield put(signFailure())
  }
}

export function setToken({ payload }) {
  if (!payload) return

  const { token } = payload.auth

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  }
}

export function signOut() {
  Alert.alert('Até mais')
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
])
