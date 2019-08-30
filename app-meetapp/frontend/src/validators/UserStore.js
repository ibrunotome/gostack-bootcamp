import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .min(8)
    .email('Insira um e-mail válido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .required('A senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
})
