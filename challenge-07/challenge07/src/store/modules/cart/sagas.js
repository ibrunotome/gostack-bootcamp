import { call, select, put, all, takeLatest } from 'redux-saga/effects'
import { Alert } from 'react-native'
import api from '../../../services/api'
import { formatPrice } from '../../../util/format'
import { addToCartSuccess, updateAmountSuccess, removeFromCart } from './actions'
import Navigation from '../../../navigation'

function* addToCart({ id }) {
  const productExists = yield select(state => state.cart.find(p => p.id === id))
  const stock = yield call(api.get, `/stock/${id}`)
  const stockAmount = stock.data.amount
  const currentAmount = productExists ? productExists.amount : 0

  const amount = currentAmount + 1

  if (amount > stockAmount) {
    Alert.alert('Sem estoque!')
    return
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount))

    Navigation.navigate('Cart')
  } else {
    const response = yield call(api.get, `/products/${id}`)

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    }

    yield put(addToCartSuccess(data))

    Navigation.navigate('Cart')
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) {
    yield put(removeFromCart(id))
  }

  const stock = yield call(api.get, `/stock/${id}`)
  const stockAmount = stock.data.amount

  if (amount > stockAmount) {
    Alert.alert('Sem estoque!')
    return
  }

  yield put(updateAmountSuccess(id, amount))
}

export default all([
  takeLatest('@cart/REMOVE', removeFromCart),
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
])
