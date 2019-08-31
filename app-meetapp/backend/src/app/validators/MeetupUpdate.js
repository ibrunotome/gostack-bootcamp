import * as Yup from 'yup'

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      file_id: Yup.string(),
      title: Yup.string()
        .min(6, 'O título deve ter no mínimo 6 caracteres')
        .max(50, 'O título deve ter no máximo 50 caracteres'),
      description: Yup.string()
        .max(255, 'A descrição não pode ultrapassar 255 caracteres'),
      location: Yup.string()
        .max(50, 'A localização não pode ultrapassar 50 caracteres'),
      date: Yup.date()
    })

    await schema.validate(req.body, { abortEarly: false })

    return next()
  } catch (error) {
    return res
      .status(422)
      .json({ error: 'Validação dos campos falhou', messages: error.inner })
  }
}
