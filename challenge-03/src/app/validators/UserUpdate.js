import * as Yup from 'yup'

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required('O nome é obrigatório'),
      email: Yup.string()
        .min(8)
        .email('Insira um e-mail válido')
        .required('O email é obrigatório'),
      oldPassword: Yup.string().min(8),
      password: Yup.string()
        .min(8)
        .when('oldPassword', (oldPassword, field) => (oldPassword ? field.required() : field)),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    })

    await schema.validate(req.body, { abortEarly: false })

    return next()
  } catch (error) {
    return res
      .status(422)
      .json({ error: 'Validação dos campos falhou', messages: error.inner })
  }
}
