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

  form {
    display: flex;
    flex-direction: column;

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

    textarea {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      height: 144px;
      padding: 15px;
      color: #fff;
      margin: 0 0 10px;
      resize: vertical;
      font-size: 14px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    div#save > button {
      width: 100px;
      margin: 5px 0;
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

    .react-datepicker-wrapper > div {
      display: inline;

      > input {
        width: 100%;
      }
    }
  }

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`
