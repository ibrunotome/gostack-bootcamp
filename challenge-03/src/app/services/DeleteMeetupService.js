import Meetup from '../models/Meetup'
import Cache from '../../lib/Cache'

class DeleteMeetupService {
  async run ({ id, userId }) {
    const meetup = await Meetup.findByPk(id)

    if (!meetup) {
      throw new Error('Meetup não encontrado')
    }

    if (meetup.user_id !== userId) {
      throw new Error('Forbidden')
    }

    if (meetup.past) {
      throw new Error('Você não pode apagar meetups que já terminaram')
    }

    await Cache.invalidatePrefix('meetups')
    await Cache.invalidatePrefix('subscriptions')
    await Cache.invalidatePrefix(`organizing:${userId}`)

    return meetup.destroy()
  }
}

export default new DeleteMeetupService()
