import request from 'supertest'
import bcrypt from 'bcryptjs'
import app from '../../src/app'

import User from '../../src/app/models/User'
import truncate from '../util/truncate'

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should encrypt user password when new user created', async () => {
    const password = '123456'

    const user = await User.create({
      name: 'Bruno Tomé',
      email: 'test@test.com',
      password: password,
    })

    const compareHash = await bcrypt.compare(password, user.password_hash)

    expect(compareHash).toBe(true)
  })

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Bruno Tomé',
        email: 'test@test.com',
        password: '123456',
      })

    expect(response.body).toHaveProperty('id')
  })

  it('should not be able to register with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Bruno Tomé',
        email: 'test@test.com',
        password: '123456',
      })

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Bruno Tomé',
        email: 'test@test.com',
        password: '123456',
      })

    expect(response.status).toBe(400)
  })
})
