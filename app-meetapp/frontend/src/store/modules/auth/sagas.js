import { takeLatest, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import history from '~/services/history'
import api from '~/services/api'

import { signInSuccess, signFailure } from './actions'

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

    history.push('/dashboard')
  } catch (error) {
    yield put(signFailure())

    if (error.response.status === 401) {
      toast.error('Falha na autenticação, verifique seus dados')
    } else if (error.response.status === 429) {
      toast.error('Você realizou muitas tentativas de login em pouco tempo... aguarde um minuto para tentar novamente')
    } else {
      toast.error(error.response.data.messages[0] ? error.response.data.messages[0].message : 'Falha na autenticação, verifique seus dados')
    }
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

    toast.success('Conta criada com sucesso. Faça o login para continuar')

    history.push('/')
  } catch (error) {
    yield put(signFailure())

    toast.error(error.response.data.messages[0] ? error.response.data.messages[0].message : 'Falha no cadastro, verifique seus dados')
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
  toast.success('Até mais')
  history.push('/')
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut)
])
