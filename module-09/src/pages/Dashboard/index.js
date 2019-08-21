import React, { useState, useMemo, useEffect } from 'react'
import { utcToZonedTime } from 'date-fns-tz'
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isEqual,
  isBefore,
  parseISO
} from 'date-fns'
import pt from 'date-fns/locale/pt'
import api from '~/services/api'

import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

import { Container, Time } from './styles'

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

export default function Dashboard () {
  const [schedule, setSchedule] = useState([])
  const [date, setDate] = useState(new Date())

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  )

  useEffect(() => {
    async function loadSchedule () {
      const response = await api.get('schedules', {
        params: { date }
      })

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

      const data = range.map(hour => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0)
        const compareDate = utcToZonedTime(checkDate, timezone)

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(a =>
            isEqual(parseISO(a.date), compareDate)
          )
        }
      })

      setSchedule(data)
    }

    loadSchedule()
  }, [])

  function handlePrevDay () {
    setDate(subDays(date, 1))
  }

  function handleNextDay () {
    setDate(addDays(date, 1))
  }

  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft size={36} color="#fff" onClick={handlePrevDay} />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button">
          <MdChevronRight size={36} color="#fff" onClick={handleNextDay} />
        </button>
      </header>

      <ul>
        {schedule.map(time => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.user.name : 'Em aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  )
}
