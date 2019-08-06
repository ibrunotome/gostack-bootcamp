import styled from 'styled-components/native'
import { darken } from 'polished'

export const Product = styled.View`
  background: #fff;
  padding: 10px;
  margin: 20px 0 20px 20px;
  border-radius: 4px;
  width: 220px;
  border-width: 1;
  border-radius: 2;
  border-color: #ddd;
  shadow-color: #000;
  shadow-opacity: 0.1;
`

export const ProductImage = styled.Image`
  height: 200px;
  width: 200px;
`

export const ProductTitle = styled.Text`
  font-size: 16px;
  padding: 5px;
  margin-bottom: 10px;
`

export const ProductPrice = styled.Text`
  font-size: 20px;
  font-weight: bold;
  padding: 0 5px;
  margin: auto 0 14px 0;
`

export const AddButton = styled.TouchableOpacity`
  background: #7159ca;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
`

export const AddButtonText = styled.Text`
  flex: 1;
  text-align: center;
  font-weight: bold;
  color: #fff;
`

export const ProductAmount = styled.View`
  padding: 12px;
  background: ${darken(0.03, '#7159ca')};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  flex-direction: row;
  align-items: center;
`

export const ProductAmountText = styled.Text`
  color: #fff;
  margin-left: 5px;
`
