import * as Yup from 'yup'

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      provider_id: Yup.string().required(),
      date: Yup.date().required()
    })

    await schema.validate(req.body, { abortEarly: false })

    return next()
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner })
  }
}
