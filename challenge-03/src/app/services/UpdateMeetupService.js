import Meetup from '../models/Meetup'

class UpdateMeetupService {
  async run ({ id, title, description, location, date, fileId, userId }) {
    const meetup = await Meetup.findByPk(id)

    if (!meetup) {
      throw new Error('Meetup não encontrado')
    }

    if (meetup.user_id !== userId) {
      throw new Error('Forbidden')
    }

    if (meetup.past) {
      throw new Error('Você não pode editar meetups que já terminaram')
    }

    return meetup.update({
      title,
      description,
      location,
      date,
      file_id: fileId
    })
  }
}

export default new UpdateMeetupService()
