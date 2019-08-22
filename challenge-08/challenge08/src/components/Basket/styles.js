import styled from 'styled-components/native'

import logo from '../../assets/logo.png'

export const Container = styled.View`
  margin: 0 auto;
`

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover'
})`
  width: 185px;
  height: 24px;
`

export const BasketContainer = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
  margin-right: 20px;
`

export const ItemCount = styled.Text`
  position: absolute;
  text-align: center;
  top: -8px;
  right: -8px;
  min-width: 18px;
  min-height: 18px;
  background: #7159ca;
  color: #fff;
  font-size: 12px;
  padding: 2px;
  border-radius: 9px;
  overflow: hidden;
`
