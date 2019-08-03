import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from '../../services/api'
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  ActivityIndicator,
} from './styles'

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  })

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  }

  state = {
    stars: [],
    loading: true,
    refreshing: false,
  }

  load = async (page = 1) => {
    const { stars } = this.state
    const { navigation } = this.props
    const user = navigation.getParam('user')

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    })

    this.setState({
      stars: page > 1 ? [...stars, ...response.data] : response.data,
      page,
      loading: false,
      refreshing: false,
    })
  }

  loadMore = () => {
    const { page } = this.state

    const nextPage = page + 1

    this.load(nextPage)
  }

  refreshList = () => {
    this.setState({ refreshing: true, stars: [] }, this.load)
  }

  async componentDidMount() {
    this.load()
  }

  render() {
    const { navigation } = this.props
    const { stars, loading, refreshing } = this.state
    const user = navigation.getParam('user')

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <ActivityIndicator size="large" color="#7159ca" animating={loading} />
        ) : (
          <Stars
            data={stars}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    )
  }
}
