import { Op } from 'sequelize'
import File from '../models/File'
import User from '../models/User'
import Meetup from '../models/Meetup'
import Subscription from '../models/Subscription'

import SubscribeService from '../services/SubscribeService'
import UnsubscribeService from '../services/UnsubscribeService'

class SubscriptionController {
  async index (req, res) {
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
      order: [[Meetup, 'date']]
    })

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
