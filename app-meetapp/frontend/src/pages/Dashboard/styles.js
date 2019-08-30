import styled from 'styled-components'

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
`

export const Meetups = styled.ul`
  margin-top: 30px;
  color: #fff;

  a {
    color: #fff;
  }
`

export const Meetup = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 4px;
  margin-top: 10px;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  strong {
    font-size: 18px;
    color: ${props => props.past ? 'rgba(216, 78, 104, 0.6)' : '#ccc'};
  }

  span {
    padding: 0 30px;
    color: ${props => props.past ? 'rgba(216, 78, 104, 0.6)' : '#ccc'};
  }
`

export const MeetupActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NoMeetups = styled.div`
  text-align: center;
  margin-top: 10px;
  color: #fff;
`
