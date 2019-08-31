import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'

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
      <Image
        source={{
          uri: data.cover ? data.cover.url : 'https://coverpixs.com/images/items/itm_2013-01-27_11-43-42_2.jpg'
        }}
        resizeMode="cover"
      />

      <Content>
        <Info>
          <Title>{data.title}</Title>
        </Info>
        <Info>
          <Icon name="event" size={14} color="#333" />
          <Description>{data.date}</Description>
        </Info>
        <Info>
          <Icon name="place" size={14} color="#333" />
          <Description>{data.location}</Description>
        </Info>
        <Info>
          <Icon name="person" size={14} color="#333" />
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
