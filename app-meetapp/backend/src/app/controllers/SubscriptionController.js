import { Op } from 'sequelize'
import File from '../models/File'
import User from '../models/User'
import Meetup from '../models/Meetup'
import Subscription from '../models/Subscription'

import Cache from '../../lib/Cache'

import SubscribeService from '../services/SubscribeService'
import UnsubscribeService from '../services/UnsubscribeService'

class SubscriptionController {
  async index (req, res) {
    const page = req.query.page || 1
    const cacheKey = `subscriptions:${req.userId}:${page}`
    const cached = await Cache.get(cacheKey)

    if (cached) {
      return res.json(cached)
    }

    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId
      },
      attributes: ['id', 'user_id', 'meetup_id'],
      include: [
        {
          model: Meetup,
          attributes: ['id', 'title', 'description', 'location', 'date', 'past'],
          where: {
            date: {
              [Op.gt]: new Date()
            }
          },
          required: true,
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
        }
      ],
      limit: 10,
      offset: 10 * page - 10,
      order: [[Meetup, 'date']]
    })

    await Cache.set(cacheKey, subscriptions)

    return res.json(subscriptions)
  }

  async store (req, res) {
    const userId = req.userId
    const meetupId = req.params.meetupId

    try {
      const subscription = await SubscribeService.run({ userId, meetupId })

      return res.json(subscription)
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
    const userId = req.userId
    const meetupId = req.params.meetupId

    try {
      await UnsubscribeService.run({ userId, meetupId })

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

export default new SubscriptionController()
