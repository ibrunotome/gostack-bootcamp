import User from '../models/User'
import Meetup from '../models/Meetup'
import Subscription from '../models/Subscription'
import Queue from '../../lib/Queue'
import SubscriptionMail from '../jobs/SubscriptionMail'

import Cache from '../../lib/Cache'

class SubscribeService {
  async run ({ userId, meetupId }) {
    let meetup = {}

    try {
      meetup = await Meetup.findByPk(meetupId, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name', 'email']
          }
        ]
      })
    } catch (error) {
      throw new Error('Meetup não encontrado')
    }

    if (meetup.user_id === userId) {
      throw new Error('Você não pode se increver em seu próprio meetup')
    }

    if (meetup.past) {
      throw new Error('Você não pode se inscrever em meetups que já terminaram')
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: userId
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
      throw new Error('Você já está inscrito em outro meetup no mesmo horário')
    }

    const subscription = await Subscription.create({
      user_id: userId,
      meetup_id: meetup.id
    })

    const user = await User.findByPk(userId)

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user
    })

    await Cache.invalidatePrefix(`subscriptions:${userId}`)

    return subscription
  }
}

export default new SubscribeService()
