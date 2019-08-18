import request from 'supertest'
import bcrypt from 'bcryptjs'
import app from '../../src/app'
import factory from '../factories'
import truncate from '../util/truncate'

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should encrypt user password when new user created', async () => {
    const password = '123456'

    const user = await factory.create('User', {
      password: password,
    })

    const compareHash = await bcrypt.compare(password, user.password_hash)

    expect(compareHash).toBe(true)
  })

  it('should be able to register', async () => {
    const user = await factory.attrs('User')

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.body).toHaveProperty('id')
  })

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User')

    await request(app)
      .post('/users')
      .send(user)

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.status).toBe(400)
  })
})
