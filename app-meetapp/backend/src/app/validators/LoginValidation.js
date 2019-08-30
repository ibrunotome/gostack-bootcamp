import * as Yup from 'yup'

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatório'),
      password: Yup.string().required('A senha é obrigatória')
    })

    await schema.validate(req.body, { abortEarly: false })

    return next()
  } catch (error) {
    return res
      .status(422)
      .json({ error: 'Validação dos campos falhou', messages: error.inner })
  }
}
