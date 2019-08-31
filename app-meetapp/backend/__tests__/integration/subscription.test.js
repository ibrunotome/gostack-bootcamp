import request from 'supertest'
import app from '../../src/app'
import factory from '../factories'

describe('Subscription', () => {
  it('should be able to subscribe', async () => {
    const user = await factory.create('User', {
      name: 'Test user',
      email: 'test10@test.com',
      password: 'secretxxx'
    })

    const file = await factory.create('File')

    const meetup = await factory.create('Meetup', {
      file_id: file.id,
      user_id: user.id
    })

    const fakeUser = await factory.create('User', {
      name: 'Test user',
      email: 'fakeuser@test.com',
      password: 'secretxxx'
    })

    const login = await request(app)
      .post('/login')
      .send({
        email: fakeUser.email,
        password: 'secretxxx'
      })

    await request(app)
      .post(`/meetups/${meetup.id}/subscribe`)
      .set('Authorization', `Bearer ${login.body.token}`)

    expect.stringContaining(meetup.title)
  })

  it('should be able to unsubscribe', async () => {
    const user = await factory.create('User', {
      name: 'Test user',
      email: 'test11@test.com',
      password: 'secretxxx'
    })

    const file = await factory.create('File')

    const meetup = await factory.create('Meetup', {
      file_id: file.id,
      user_id: user.id
    })

    await factory.create('Subscription', {
      user_id: user.id,
      meetup_id: meetup.id
    })

    const login = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: 'secretxxx'
      })

    await request(app)
      .delete(`/meetups/${meetup.id}/unsubscribe`)
      .set('Authorization', `Bearer ${login.body.token}`)

    expect(204)
  })

  it('should be able to list subscribed meetups', async () => {
    const user = await factory.create('User', {
      name: 'Test user',
      email: 'test12@test.com',
      password: 'secretxxx'
    })

    const file = await factory.create('File')

    const meetup = await factory.create('Meetup', {
      file_id: file.id,
      user_id: user.id
    })

    await factory.create('Subscription', {
      user_id: user.id,
      meetup_id: meetup.id
    })

    const login = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: 'secretxxx'
      })

    await request(app)
      .get(`/subscriptions`)
      .set('Authorization', `Bearer ${login.body.token}`)

    expect.stringContaining(meetup.title)
  })
})
