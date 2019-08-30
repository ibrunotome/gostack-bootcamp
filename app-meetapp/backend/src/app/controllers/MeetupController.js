import { Op } from 'sequelize'
import { startOfDay, endOfDay, parseISO } from 'date-fns'
import Meetup from '../models/Meetup'
import File from '../models/File'
import User from '../models/User'

import Cache from '../../lib/Cache'

import CreateMeetupService from '../services/CreateMeetupService'
import UpdateMeetupService from '../services/UpdateMeetupService'
import DeleteMeetupService from '../services/DeleteMeetupService'

class MeetupController {
  async index (req, res) {
    const where = {}
    const page = req.query.page || 1
    const cacheKey = `meetups:${req.query.date}:${page}`
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

  async store (req, res) {
    const userId = req.userId
    const { title, description, location, date, file_id: fileId } = req.body

    try {
      const meetup = await CreateMeetupService.run({
        title,
        description,
        location,
        date,
        fileId,
        userId
      })

      return res.json(meetup)
    } catch (error) {
      return res
        .status(400)
        .json({
          error: error.message,
          messages: [
            {
              message: error.message
            }
          ]
        })
    }
  }

  async show (req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
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
      ]
    })

    if (!meetup) {
      return res.status(404).json({ error: 'Meetup not found' })
    }

    return res.status(200).json(meetup)
  }

  async update (req, res) {
    const userId = req.userId
    const { title, description, location, date, file_id: fileId } = req.body

    try {
      const meetup = await UpdateMeetupService.run({
        id: req.params.id,
        title,
        description,
        location,
        date,
        fileId,
        userId
      })

      return res.json(meetup)
    } catch (error) {
      return res
        .status(400)
        .json({
          error: error.message,
          messages: [
            {
              message: error.message
            }
          ]
        })
    }
  }

  async delete (req, res) {
    const id = req.params.id
    const userId = req.userId

    try {
      await DeleteMeetupService.run({ id, userId })

      return res.status(204).send()
    } catch (error) {
      return res
        .status(400)
        .json({
          error: error.message,
          messages: [
            {
              message: error.message
            }
          ]
        })
    }
  }
}

export default new MeetupController()
