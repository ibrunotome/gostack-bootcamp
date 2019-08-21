import { isBefore, subHours } from 'date-fns'
import User from '../models/User'
import Appointment from '../models/Appointment'

import Cache from '../../lib/Cache'
import Queue from '../../lib/Queue'
import CancellationMail from '../jobs/CancellationMail'

class CancelAppointmentService {
  async run ({ providerId, userId }) {
    const appointment = await Appointment.findByPk(providerId, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email']
        },
        {
          model: User,
          as: 'user',
          attributes: ['name']
        }
      ]
    })

    if (appointment.user_id !== userId) {
      throw new Error('Forbidden')
    }

    if (appointment.canceled_at !== null) {
      throw new Error('The appointment is already canceled')
    }

    const dateWithSub = subHours(appointment.date, 2)

    if (isBefore(dateWithSub, new Date())) {
      throw new Error('You can only cancel appointments 2 hours in advance')
    }

    appointment.canceled_at = new Date()

    await appointment.save()

    await Queue.add(CancellationMail.key, {
      appointment
    })

    await Cache.invalidatePrefix(`user:${userId}:appointments`)

    return appointment
  }
}

export default new CancelAppointmentService()
