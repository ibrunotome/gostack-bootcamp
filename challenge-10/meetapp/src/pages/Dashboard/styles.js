import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
`

export const SelectDate = styled.View`
  margin: 20px 0;
  flex-direction: row;
  align-self: center;
  align-items: center;
`

export const SelectedDate = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  margin: 0 20px;
`

export const SelectDateButton = styled.TouchableOpacity`
  margin: 0 -15px;
`

export const MeetupText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 0 20px;
  color: #fff;
`

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 4 }
})``
