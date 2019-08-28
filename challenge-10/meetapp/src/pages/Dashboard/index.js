import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Background from '~/components/Background'
import Header from '~/components/Header'

export default function Dashboard () {
  return (
    <Background>
      <Header />
    </Background>
  )
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => <Icon name="list" size={20} color={tintColor} />
}
