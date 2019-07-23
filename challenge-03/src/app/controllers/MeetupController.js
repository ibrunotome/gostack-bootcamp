import * as Yup from 'yup'
import { Op } from 'sequelize'
import { isBefore, startOfDay, endOfDay, parseISO } from 'date-fns'
import Meetup from '../models/Meetup'
import User from '../models/User'

class MeetupController {
  constructor() {}

  async organizingMeetups(req, res) {
    const where = {
      user_id: req.userId,
    }

    return await meetupList(req, res, where)
  }

  async index(req, res) {
    const where = {}

    return await meetupList(req, res, where)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      file_id: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    })

    try {
      await schema.validate(req.body)
    } catch (error) {
      return res.status(422).json({ errors: error.errors })
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'You cannot use a past date to create a new meetup' })
    }

    const user_id = req.userId
    const { title, description, location, date, file_id } = req.body

    const meetup = await Meetup.create({
      title,
      description,
      location,
      date,
      file_id,
      user_id,
    })

    return res.json(meetup)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      file_id: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
    })

    try {
      await schema.validate(req.body)
    } catch (error) {
      return res.status(422).json({ errors: error.errors })
    }

    const user_id = req.userId
    const meetup = await Meetup.findByPk(req.params.id)

    if (meetup.user_id !== user_id) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(422).json({ error: 'You cannot use a past date to create a new meetup' })
    }

    if (meetup.past) {
      return res.status(422).json({ error: 'You cannot update a past meetup' })
    }

    await meetup.update(req.body)

    return res.json(meetup)
  }

  async delete(req, res) {
    const user_id = req.userId
    const meetup = await Meetup.findByPk(req.params.id)

    if (!meetup) {
      return res.status(404).json({ error: 'Meetup not found' })
    }

    if (meetup.user_id !== user_id) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    if (meetup.past) {
      return res.status(400).json({ error: 'You cannot delete past meetups' })
    }

    await meetup.destroy()

    return res.status(204).send()
  }
}

async function meetupList(req, res, where) {
  const page = req.query.page || 1

  if (req.query.date) {
    const searchDate = parseISO(req.query.date)

    where.date = {
      [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
    }
  }

  const meetups = await Meetup.findAll({
    where,
    include: [User],
    limit: 10,
    offset: 10 * page - 10,
  })

  return res.json(meetups)
}

export default new MeetupController()