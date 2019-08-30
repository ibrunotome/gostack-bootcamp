import Meetup from '../models/Meetup'

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

    return meetup.destroy()
  }
}

export default new DeleteMeetupService()
