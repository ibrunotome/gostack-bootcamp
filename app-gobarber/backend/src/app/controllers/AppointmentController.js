import Appointment from '../models/Appointment'
import User from '../models/User'
import File from '../models/File'
import Cache from '../../lib/Cache'

import CreateAppointmentService from '../services/CreateAppointmentService'
import CancelAppointmentService from '../services/CancelAppointmentService'

class AppointmentController {
  async index (req, res) {
    const { page = 1 } = req.query

    const cacheKey = `user:${req.userId}:appointments:${page}`
    const cached = await Cache.get(cacheKey)

    if (cached) {
      return res.json(cached)
    }

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

    await Cache.set(cacheKey, appointments)

    return res.json(appointments)
  }

  async store (req, res) {
    const { providerId, date } = req.body

    if (req.userId === providerId) {
      return res
        .status(400)
        .json({ error: 'You cannot make a appointment with your self!' })
    }

    try {
      const appointment = await CreateAppointmentService.run({
        providerId,
        userId: req.userId,
        date
      })

      return res.json(appointment)
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }

  async delete (req, res) {
    try {
      const appointment = await CancelAppointmentService.run({
        providerId: req.params.id,
        userId: req.userId
      })

      return res.json(appointment)
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }
}

export default new AppointmentController()
