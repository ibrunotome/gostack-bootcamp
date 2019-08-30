import { Op } from 'sequelize'
import { isBefore, startOfDay, endOfDay, parseISO } from 'date-fns'
import Meetup from '../models/Meetup'
import File from '../models/File'
import User from '../models/User'

class MeetupController {
  async index (req, res) {
    const where = {}

    return meetupList(req, res, where)
  }

  async store (req, res) {
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Você não pode criar um meetup numa data passada' })
    }

    const userId = req.userId
    const { title, description, location, date, file_id: fileId } = req.body

    const alreadyExists = await Meetup.findOne({
      where: {
        user_id: userId,
        date: parseISO(date)
      }
    })

    if (alreadyExists) {
      return res.status(400).json({ error: 'Você já possui um meetup agendado para esse horário' })
    }

    const meetup = await Meetup.create({
      title,
      description,
      location,
      date,
      file_id: fileId,
      user_id: userId
    })

    return res.json(meetup)
  }

  async show (req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
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
    })

    if (!meetup) {
      return res.status(404).json({ error: 'Meetup not found' })
    }

    return res.status(200).json(meetup)
  }

  async update (req, res) {
    const userId = req.userId
    const meetup = await Meetup.findByPk(req.params.id)

    if (meetup.user_id !== userId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(422).json({ error: 'Você não pode atualizar o meetup com uma data passada' })
    }

    if (meetup.past) {
      return res.status(422).json({ error: 'Você não pode editar meetups que já terminaram' })
    }

    await meetup.update(req.body)

    return res.json(meetup)
  }

  async delete (req, res) {
    const userId = req.userId
    const meetup = await Meetup.findByPk(req.params.id)

    if (!meetup) {
      return res.status(404).json({ error: 'Meetup não encontrado' })
    }

    if (meetup.user_id !== userId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    if (meetup.past) {
      return res.status(422).json({ error: 'Você não pode apagar meetups que já terminaram' })
    }

    await meetup.destroy()

    return res.status(204).send()
  }

  async organizingMeetups (req, res) {
    const where = {
      user_id: req.userId
    }

    return meetupList(req, res, where)
  }
}

async function meetupList (req, res, where) {
  const page = req.query.page || 1

  if (req.query.date) {
    const searchDate = parseISO(req.query.date)

    where.date = {
      [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)]
    }
  }

  const meetups = await Meetup.findAll({
    where,
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
    ],
    limit: 10,
    offset: 10 * page - 10
  })

  return res.json(meetups)
}

export default new MeetupController()
