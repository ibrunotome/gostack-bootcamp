import { startOfHour, parseISO, isBefore, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import User from '../models/User'
import Appointment from '../models/Appointment'

import Notification from '../schemas/Notification'
import Cache from '../../lib/Cache'

class CreateAppointmentService {
  async run ({ providerId, userId, date }) {
    const isProvider = await User.findOne({
      where: { id: providerId, provider: true }
    })

    if (!isProvider) {
      throw new Error('You can only create appointments with providers')
    }

    const hourStart = startOfHour(parseISO(date))

    if (isBefore(hourStart, new Date())) {
      throw new Error('Past dates are not permitted')
    }

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id: providerId,
        canceled_at: null,
        date: hourStart
      }
    })

    if (checkAvailability) {
      throw new Error('Appointment date is not available')
    }

    const appointment = await Appointment.create({
      user_id: userId,
      provider_id: providerId,
      date
    })

    const user = await User.findByPk(userId)
    const formattedDate = format(hourStart, "dd 'de' MMMM', às' H:mm'h", {
      locale: ptBR
    })

    await Notification.create({
      content: `Novo agendamento de ${user.name} para o dia ${formattedDate}`,
      user: providerId
    })

    await Cache.invalidatePrefix(`user:${userId}:appointments`)

    return appointment
  }
}

export default new CreateAppointmentService()
