import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'

import cover from '~/assets/cover.png'

import {
  Container,
  Image,
  Content,
  Title,
  Info,
  Description,
  SubmitButton
} from './styles'

export default function MeetupCard ({ data, textButton, onHandle }) {
  return (
    <Container past={data.past}>
      {data.cover.url ? (
        <Image
          source={{
            uri: data.cover.url
          }}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={cover}
          resizeMode="cover"
        />
      )}

      <Content>
        <Info>
          <Title>{data.title}</Title>
        </Info>
        <Info>
          <Icon name="event" size={14} color="#999" />
          <Description>{data.date}</Description>
        </Info>
        <Info>
          <Icon name="place" size={14} color="#999" />
          <Description>{data.location}</Description>
        </Info>
        <Info>
          <Icon name="person" size={14} color="#999" />
          <Description>Organizador: {data.user.name}</Description>
        </Info>

        <SubmitButton onPress={onHandle}>{textButton}</SubmitButton>
      </Content>
    </Container>
  )
}

MeetupCard.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    past: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    file: PropTypes.shape({
      url: PropTypes.string.isRequired
    })
  }).isRequired,
  textButton: PropTypes.string.isRequired,
  onHandle: PropTypes.func
}

MeetupCard.defaultProps = {
  onHandle: () => {}
}
