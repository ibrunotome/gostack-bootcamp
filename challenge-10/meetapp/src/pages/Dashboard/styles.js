import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
`

export const SelectDate = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const SelectDateArrow = styled.TouchableOpacity`
  margin: 0 15px;
`

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 4 }
})``
