import { Op } from 'sequelize'
import User from '../models/User'
import Meetup from '../models/Meetup'
import Subscription from '../models/Subscription'
import Queue from '../../lib/Queue'
import SubscriptionMail from '../jobs/SubscriptionMail'

class SubscriptionController {
  async index (req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId
      },
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date()
            }
          },
          required: true
        }
      ],
      order: [[Meetup, 'date']]
    })

    return res.json(subscriptions)
  }

  async store (req, res) {
    let meetup = {}

    try {
      meetup = await Meetup.findByPk(req.params.meetupId)
    } catch (error) {
      console.error(error)
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
}

export default new SubscriptionController()
