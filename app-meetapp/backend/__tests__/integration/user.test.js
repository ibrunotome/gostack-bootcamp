import request from 'supertest'
import app from '../../src/app'
import factory from '../factories'

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Bruno Tomé',
        email: 'testing@gmail.com',
        password: 'secretxxx'
      })

    expect(response.body).toHaveProperty('id')
  })

  it('should fail when register because invalid input', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Tomé',
        email: 'testing',
        password: 'secretxxx'
      })

    expect.stringContaining('Insira um e-mail válido')

    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Tomé',
        password: 'secretxxx'
      })

    expect.stringContaining('O email é obrigatório')

    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Tomé',
        password: 'secret'
      })

    expect.stringContaining('A senha deve ter no mínimo 8 caracteres')
  })

  it('should be able to login successfully', async () => {
    const user = await factory.create('User', {
      password: 'secretxxx'
    })

    const response = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: 'secretxxx'
      })

    expect(response.body).toHaveProperty('token')
  })
})
