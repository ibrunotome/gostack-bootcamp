import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  padding: 0 30px;
`

export const Content = styled.div`
  max-width: 900px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    input {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    button {
      width: 100px;
      margin: 5px 0 0;
      height: 44px;
      background: #F94D6A;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#F94D6A')};
      }
    }
  }
  
  hr {
    border: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin: 10px 0 20px;
  }
}
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`
