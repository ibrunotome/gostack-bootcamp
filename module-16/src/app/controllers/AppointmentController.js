import { isBefore, subHours } from 'date-fns'
import Appointment from '../models/Appointment'
import User from '../models/User'
import File from '../models/File'

import CancellationMail from '../jobs/CancellationMail'
import Queue from '../../lib/Queue'

import CreateAppointmentService from '../services/CreateAppointmentService'

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'date', 'past', 'cancelable'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    })

    return res.json(appointments)
  }
  async store(req, res) {
    const { provider_id, date } = req.body

    if (req.userId === provider_id) {
      return res.status(400).json({ error: 'You cannot make a appointment with your self!' })
    }

    const appointment = await CreateAppointmentService.run({
      provider_id,
      user_id: req.userId,
      date,
    })

    return res.json(appointment)
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    })

    if (appointment.user_id !== req.userId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    if (appointment.canceled_at !== null) {
      return res.status(400).json({ error: 'The appointment is already canceled' })
    }

    const dateWithSub = subHours(appointment.date, 2)

    if (isBefore(dateWithSub, new Date())) {
      return res.status(403).json({
        error: 'You can only cancel appointments 2 hours in advance',
      })
    }

    appointment.canceled_at = new Date()

    await appointment.save()

    await Queue.add(CancellationMail.key, {
      appointment,
    })

    return res.json(appointment)
  }
}

export default new AppointmentController()
