import { Op } from 'sequelize'
import File from '../models/File'
import User from '../models/User'
import Meetup from '../models/Meetup'
import Subscription from '../models/Subscription'
import Queue from '../../lib/Queue'
import SubscriptionMail from '../jobs/SubscriptionMail'
import CancelationMail from '../jobs/CancelationMail'

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
    let meetup = {}

    try {
      meetup = await Meetup.findByPk(req.params.meetupId, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name', 'email']
          }
        ]
      })
    } catch (error) {
      return res.status(404).json({ error: 'Meetup não encontrado' })
    }

    if (meetup.user_id === req.userId) {
      return res.status(422).json({ error: 'Você não pode se increver em seu próprio meetup' })
    }

    if (meetup.past) {
      return res.status(422).json({ error: 'Você não pode se inscrever em meetups que já terminaram' })
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: req.userId
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date
          }
        }
      ]
    })

    if (checkDate) {
      return res.status(422).json({ error: 'Você já está inscrito em outro meetup no mesmo horário' })
    }

    const subscription = await Subscription.create({
      user_id: req.userId,
      meetup_id: meetup.id
    })

    const user = await User.findByPk(req.userId)

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user
    })

    return res.json(subscription)
  }

  async delete (req, res) {
    const userId = req.userId

    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email']
        }
      ]
    })

    if (!meetup) {
      return res.status(404).json({ error: 'Meetup não encontrado' })
    }

    const subscription = await Subscription.findOne({
      where: {
        meetup_id: meetup.id,
        user_id: userId
      }
    })

    if (!subscription) {
      return res.status(404).json({ error: 'Incrição não encontrada' })
    }

    if (meetup.past) {
      return res.status(422).json({ error: 'Você não pode cancelar sua inscrição em meetups que já terminaram' })
    }

    await subscription.destroy()

    const user = await User.findByPk(req.userId)

    await Queue.add(CancelationMail.key, {
      meetup,
      user
    })

    return res.status(204).send()
  }
}

export default new SubscriptionController()
