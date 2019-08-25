import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 0 30px;
`

export const Content = styled.div`
    height: 92px;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    nav {
      display: flex;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
      }

      a {
        font-weight: bold;
        color: #7159c1;
      }
    }

    aside {
      display: flex;
      align-items: center;
    }
`

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;
    margin-right: 10px;
    margin-top: 5px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 3px;
      font-size: 12px;
      color: #999;
    }
  }

  button {
    width: 70px;
    height: 42px;
    border: 0;
    background: #D44059;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    margin-left: 10px;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.05, '#D44059')};
    }
  }
`
