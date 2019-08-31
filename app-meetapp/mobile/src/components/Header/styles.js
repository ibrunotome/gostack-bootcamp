import styled from 'styled-components/native'
import { darken } from 'polished'

export const Logo = styled.SafeAreaView`
  color: #fff;
  align-items: center;
  justify-content: center;
  background: ${darken(0.02, '#222029')};
  height: 100px;
`
