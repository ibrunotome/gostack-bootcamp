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

export const Header = styled.div`
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

export const Meetups = styled.ul`
  margin-top: 30px;
  color: #fff;
`

export const Meetup = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 4px;
  margin-top: 10px;

  strong {
    font-size: 18px;
  }

  span {
    color: #ccc;
    padding: 0 30px;
  }
`

export const MeetupActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
