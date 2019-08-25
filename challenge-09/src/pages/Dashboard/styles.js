import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  padding: 0 30px;
`

export const Content = styled.div`
  max-width: 900px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
`

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F94D6A;
    border: 0;
    border-radius: 4px;
    width: 172px;
    height: 42px;
    color: #fff;
    font-weight: bold;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.05, '#F94D6A')};
    }

    div {
      margin-left: 8px;
    }
  }
`
