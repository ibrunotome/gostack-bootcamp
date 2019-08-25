import React from 'react'

import { MdAddCircleOutline } from 'react-icons/md'
import { Container, Content, TitleWrapper } from './styles'

export default function Dashboard () {
  return (
    <Container>
      <Content>
        <TitleWrapper>
          <h1>Meus meetups</h1>
          <button type="button">
            <MdAddCircleOutline size={20}/>
            <div>Novo meetup</div>
          </button>
        </TitleWrapper>
      </Content>
    </Container>
  )
}
