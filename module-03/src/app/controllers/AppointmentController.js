import * as Yup from 'yup'
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Appointment from '../models/Appointment'
import User from '../models/User'
import File from '../models/File'
import Notification from '../schemas/Notification'

import CancellationMail from '../jobs/CancellationMail'
import Queue from '../../lib/Queue'

class AppointmentController {
  async index (req, res) {
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
              attributes: ['id', 'path', 'url']
            }
          ]
        }
      ]
    })

    return res.json(appointments)
  }
  async store (req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.string().required(),
      date: Yup.date().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { providerId, date } = req.body

    if (req.userId === providerId) {
      return res.status(400).json({ error: 'You cannot make a appointment with your self!' })
    }

    const isProvider = await User.findOne({
      where: { id: providerId, provider: true }
    })

    if (!isProvider) {
      return res.status(400).json({ error: 'You can only create appointments with providers' })
    }

    const hourStart = startOfHour(parseISO(date))

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' })
    }

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id: providerId,
        canceled_at: null,
        date: hourStart
      }
    })

    if (checkAvailability) {
      return res.status(400).json({ error: 'Appointment date is not available' })
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id: providerId,
      date
    })

    const user = await User.findByPk(req.userId)
    const formattedDate = format(hourStart, "dd 'de' MMMM', às' H:mm'h", { locale: ptBR })

    await Notification.create({
      content: `Novo agendamento de ${user.name} para o dia ${formattedDate}`,
      user: providerId
    })

    return res.json(appointment)
  }

  async delete (req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
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

    if (appointment.user_id !== req.userId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    if (appointment.canceled_at !== null) {
      return res.status(400).json({ error: 'The appointment is already canceled' })
    }

    const dateWithSub = subHours(appointment.date, 2)

    if (isBefore(dateWithSub, new Date())) {
      return res.status(403).json({
        error: 'You can only cancel appointments 2 hours in advance'
      })
    }

    appointment.canceled_at = new Date()

    await appointment.save()

    await Queue.add(CancellationMail.key, {
      appointment
    })

    return res.json(appointment)
  }
}

export default new AppointmentController()
