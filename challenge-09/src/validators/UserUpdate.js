import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .min(8)
    .email('Insira um e-mail válido')
    .required('O email é obrigatório')
})
