import * as Yup from 'yup'
import { isBefore, parseISO } from 'date-fns'
import Meetup from '../models/Meetup'

class MeetupController {
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
}

export default new MeetupController()
