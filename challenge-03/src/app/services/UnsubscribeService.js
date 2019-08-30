import User from '../models/User'
import Meetup from '../models/Meetup'
import Subscription from '../models/Subscription'
import Queue from '../../lib/Queue'
import CancelationMail from '../jobs/CancelationMail'

import Cache from '../../lib/Cache'

class UnsubscribeService {
  async run ({ userId, meetupId }) {
    const meetup = await Meetup.findByPk(meetupId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email']
        }
      ]
    })

    if (!meetup) {
      throw new Error('Meetup não encontrado')
    }

    const subscription = await Subscription.findOne({
      where: {
        meetup_id: meetup.id,
        user_id: userId
      }
    })

    if (!subscription) {
      throw new Error('Incrição não encontrada')
    }

    if (meetup.past) {
      throw new Error('Você não pode cancelar sua inscrição em meetups que já terminaram')
    }

    await subscription.destroy()

    const user = await User.findByPk(userId)

    await Queue.add(CancelationMail.key, {
      meetup,
      user
    })

    await Cache.invalidatePrefix(`subscriptions:${userId}`)

    return subscription
  }
}

export default new UnsubscribeService()
