import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: 15px;
`
export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 4 }
})``

export const NoMeetups = styled.View`
  flex: 1;
  color: #fff;
  align-items: center;
  justify-content: center;
  margin-top: 49px;
`

export const NoMeetupsText = styled.Text`
  color: #fff;
  font-size: 18;
`

export const Loading = styled.ActivityIndicator.attrs({
  color: '#FFF',
  size: 50
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`
