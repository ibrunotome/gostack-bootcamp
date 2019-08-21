import { startOfHour, parseISO, isBefore, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import User from '../models/User'
import Appointment from '../models/Appointment'

import Notification from '../schemas/Notification'
import Cache from '../../lib/Cache'

class CreateAppointmentService {
  async run({ provider_id, user_id, date }) {
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
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
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    })

    if (checkAvailability) {
      throw new Error('Appointment date is not available')
    }

    const appointment = await Appointment.create({
      user_id: user_id,
      provider_id,
      date,
    })

    const user = await User.findByPk(user_id)
    const formattedDate = format(hourStart, "dd 'de' MMMM', às' H:mm'h", { locale: ptBR })

    await Notification.create({
      content: `Novo agendamento de ${user.name} para o dia ${formattedDate}`,
      user: provider_id,
    })

    await Cache.invalidatePrefix(`user:${user_id}:appointments`)

    return appointment
  }
}

export default new CreateAppointmentService()
