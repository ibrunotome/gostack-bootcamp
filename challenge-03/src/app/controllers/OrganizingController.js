import { Op } from 'sequelize'
import { startOfDay, endOfDay, parseISO } from 'date-fns'
import Meetup from '../models/Meetup'
import File from '../models/File'
import User from '../models/User'
import Cache from '../../lib/Cache'

class OrganizingController {
  async index (req, res) {
    const where = {
      user_id: req.userId
    }

    const page = req.query.page || 1
    const cacheKey = `organizing:${req.userId}:${req.query.date}:${page}`
    const cached = await Cache.get(cacheKey)

    if (cached) {
      return res.json(cached)
    }

    if (req.query.date) {
      const searchDate = parseISO(req.query.date)

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)]
      }
    }

    const meetups = await Meetup.findAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email']
        },
        {
          model: File,
          as: 'cover',
          attributes: ['name', 'path', 'url']
        }
      ],
      limit: 10,
      offset: 10 * page - 10,
      order: ['date']
    })

    await Cache.set(cacheKey, meetups)

    return res.json(meetups)
  }
}

export default new OrganizingController()
