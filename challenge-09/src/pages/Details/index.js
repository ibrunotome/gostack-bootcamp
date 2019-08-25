import React from 'react'

import { MdDeleteForever, MdEdit, MdPlace, MdEvent } from 'react-icons/md'
import { Container, Content, Cover, Description, DescriptionDetails, Header, HeaderButtons } from './styles'
import { Button } from '~/components/Button'

export default function Details () {
  return (
    <Container>
      <Content>

        <Header>
          <h1>Go do zero ao deploy</h1>
          <HeaderButtons>
            <Button color="#4DBAF9">
              <MdEdit size={20}/>
              <div>Editar</div>
            </Button>
            <Button>
              <MdDeleteForever size={20}/>
              <div>Cancelar</div>
            </Button>
          </HeaderButtons>
        </Header>

        <Cover>
          <img src="https://images.sympla.com.br/5d5adfd64b9de-lg.png" />
        </Cover>

        <Description>
          <p>O Meetup de React Native é um evento que reúne a comunidade de desenvolvimento mobile utilizando React a fim de compartilhar conhecimento. Todos são convidados.</p>

          <p>Caso queira participar como palestrante do meetup envie um e-mail para organizacao@meetuprn.com.br.</p>

          <DescriptionDetails>
            <div>
              <MdEvent/> <span>24 de Junho, às 20h</span>
            </div>
            <div>
              <MdPlace/> <span>Rua Guilherme Gembala, 260</span>
            </div>
          </DescriptionDetails>

        </Description>

      </Content>
    </Container>
  )
}
