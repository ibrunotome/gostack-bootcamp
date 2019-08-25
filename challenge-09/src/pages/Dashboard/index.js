import React from 'react'

import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md'
import { Container, Content, Header, Meetups, Meetup, MeetupActions } from './styles'

export default function Dashboard () {
  return (
    <Container>
      <Content>

        <Header>
          <h1>Meus meetups</h1>
          <button type="button">
            <MdAddCircleOutline size={20}/>
            <div>Novo meetup</div>
          </button>
        </Header>

        <Meetups>
          <Meetup>
            <strong>Meetup de React Native</strong>
            <MeetupActions>
              <span>24 de Junho, às 20h</span>
              <MdChevronRight size={30} />
            </MeetupActions>
          </Meetup>

          <Meetup>
            <strong>NodeJS Meetup</strong>
            <MeetupActions>
              <span>17 de Agosto, às 20h</span>
              <MdChevronRight size={30} />
            </MeetupActions>
          </Meetup>

          <Meetup>
            <strong>Rocketseat Meetup</strong>
            <MeetupActions>
              <span>30 de Agosto, às 20h</span>
              <MdChevronRight size={30} />
            </MeetupActions>
          </Meetup>
        </Meetups>

      </Content>
    </Container>
  )
}
