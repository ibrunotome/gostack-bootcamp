import styled from 'styled-components/native'
import Button from '~/components/Button'

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  margin: 0 15px 15px;
  height: 360px;
  opacity: ${props => props.past ? 0.7 : 1}
`

export const Image = styled.Image.attrs({
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4
})`
  height: 150px;
  width: 100%;
  margin-bottom: 15px;
`

export const Content = styled.View`
  flex: 1;
  height: 200px;
  padding: 0 20px;
`

export const Title = styled.Text.attrs({
  numberOfLines: 1
})`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
`

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`

export const Description = styled.Text.attrs({
  numberOfLines: 1
})`
  font-size: 14px;
  color: #333;
  margin-left: 2px;
`

export const SubmitButton = styled(Button)`
  margin-top: 10px;
`
