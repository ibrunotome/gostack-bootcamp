import React, { useState } from 'react'
import { DatePickerIOS } from 'react-native'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'

import { Container, DateButton, DateText } from './styles'

export default function DatePicker ({ date, onChange }) {
  const [opened, setOpened] = useState(false)

  const dateFormatted = format(date, "dd 'de' MMMM", {
    locale: pt
  })

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened && (
        <DatePickerIOS
          date={date}
          onDateChange={onChange}
          locale="pt"
          mode="date"
        />
      )}
    </Container>
  )
}
