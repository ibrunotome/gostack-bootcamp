import * as Yup from 'yup'

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório'),
      email: Yup.string()
        .min(8)
        .email('Insira um e-mail válido')
        .required('O email é obrigatório'),
      password: Yup.string()
        .required('A senha é obrigatória')
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
    })

    await schema.validate(req.body, { abortEarly: false })

    return next()
  } catch (error) {
    return res
      .status(422)
      .json({ error: 'Validação dos campos falhou', messages: error.inner })
  }
}
