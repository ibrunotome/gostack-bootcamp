import { parseISO, isBefore } from 'date-fns'
import Meetup from '../models/Meetup'
import Cache from '../../lib/Cache'

class CreateMeetupService {
  async run ({ title, description, location, date, fileId, userId }) {
    if (isBefore(parseISO(date), new Date())) {
      throw new Error('Você não pode criar um meetup numa data passada')
    }

    const alreadyExists = await Meetup.findOne({
      where: {
        user_id: userId,
        date: parseISO(date)
      }
    })

    if (alreadyExists) {
      throw new Error('Você já possui um meetup agendado para esse horário')
    }

    await Cache.invalidatePrefix('meetups')
    await Cache.invalidatePrefix(`organizing:${userId}`)

    return Meetup.create({
      title,
      description,
      location,
      date,
      file_id: fileId,
      user_id: userId
    })
  }
}

export default new CreateMeetupService()
