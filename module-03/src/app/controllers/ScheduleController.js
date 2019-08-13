import { parseISO, startOfDay, endOfDay } from 'date-fns'
import { Op } from 'sequelize'

import Appointment from '../models/Appointment'
import User from '../models/User'

class ScheduleController {
  async index(req, res) {
    const user = await User.findByPk(req.userId)

    if (!user.provider) {
      return res.status(401).json({ error: 'User is not a provider' })
    }

    const { date } = req.query
    const parseDate = parseISO(date)
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      order: ['date'],
    })

    return res.json(appointments)
  }
}

export default new ScheduleController()
