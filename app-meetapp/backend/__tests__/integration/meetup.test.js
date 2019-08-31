import request from 'supertest'
import app from '../../src/app'
import factory from '../factories'

describe('Meetup', () => {
  it('should be able to list meetups', async () => {
    const user = await factory.create('User', {
      name: 'Test user',
      email: 'test@test.com',
      password: 'secretxxx'
    })

    const file = await factory.create('File')

    const meetup = await factory.create('Meetup', {
      file_id: file.id,
      user_id: user.id
    })

    const login = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: 'secretxxx'
      })

    await request(app)
      .get('/meetups')
      .set('Authorization', `Bearer ${login.body.token}`)

    expect.stringContaining(meetup.title)
  })

  it('should be able to list meetups paginated', async () => {
    const user = await factory.create('User', {
      name: 'Test user',
      email: 'test2@test.com',
      password: 'secretxxx'
    })

    const file = await factory.create('File')

    const meetup = await factory.create('Meetup', {
      file_id: file.id,
      user_id: user.id
    })

    const login = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: 'secretxxx'
      })

    await request(app)
      .get('/meetups?page=2')
      .set('Authorization', `Bearer ${login.body.token}`)

    expect.not.stringContaining(meetup.title)
  })

  it('should be able to update meetup', async () => {
    const user = await factory.create('User', {
      name: 'Test user',
      email: 'test3@test.com',
      password: 'secretxxx'
    })

    const file = await factory.create('File')

    const meetup = await factory.create('Meetup', {
      file_id: file.id,
      user_id: user.id
    })

    const login = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: 'secretxxx'
      })

    await request(app)
      .put(`/meetups/${meetup.id}`, {
        title: 'updated!'
      })
      .set('Authorization', `Bearer ${login.body.token}`)

    expect.stringContaining('updated!')
  })

  it('should not be able to update meetup because validation fail', async () => {
    const user = await factory.create('User', {
      name: 'Test user',
      email: 'test4@test.com',
      password: 'secretxxx'
    })

    const file = await factory.create('File')

    const meetup = await factory.create('Meetup', {
      file_id: file.id,
      user_id: user.id
    })

    const login = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: 'secretxxx'
      })

    await request(app)
      .put(`/meetups/${meetup.id}`, {
        title: 'fail'
      })
      .set('Authorization', `Bearer ${login.body.token}`)

    expect.stringContaining('O título deve ter no mínimo 6 caracteres')
  })

  it('should be able to create a meetup', async () => {
    const user = await factory.create('User', {
      name: 'Test user',
      email: 'test5@test.com',
      password: 'secretxxx'
    })

    const file = await factory.create('File')

    const login = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: 'secretxxx'
      })

    const response = await request(app)
      .post(`/meetups`)
      .send({
        title: 'meetup fake',
        description: 'descrição fake',
        location: 'location fake',
        date: '2229-10-10T03:00:00',
        file_id: file.id
      })
      .set('Authorization', `Bearer ${login.body.token}`)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('title')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('location')
    expect(response.body).toHaveProperty('date')
    expect.stringContaining('meetup fake')
  })

  it('should be able to show a single meetup', async () => {
    const user = await factory.create('User', {
      name: 'Test user',
      email: 'test6@test.com',
      password: 'secretxxx'
    })

    const file = await factory.create('File')

    const meetup = await factory.create('Meetup', {
      file_id: file.id,
      user_id: user.id
    })

    const login = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: 'secretxxx'
      })

    const response = await request(app)
      .get(`/meetups/${meetup.id}`)
      .set('Authorization', `Bearer ${login.body.token}`)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('title')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('location')
    expect(response.body).toHaveProperty('date')
    expect.stringContaining('meetup fake')
  })

  it('should be able to delete meetup', async () => {
    const user = await factory.create('User', {
      name: 'Test user',
      email: 'test7@test.com',
      password: 'secretxxx'
    })

    const file = await factory.create('File')

    const meetup = await factory.create('Meetup', {
      file_id: file.id,
      user_id: user.id
    })

    const login = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: 'secretxxx'
      })

    await request(app)
      .delete(`/meetups/${meetup.id}`)
      .set('Authorization', `Bearer ${login.body.token}`)

    expect(204)
  })

  it('should be able to list organizing meetups', async () => {
    const user = await factory.create('User', {
      name: 'Test user',
      email: 'test8@test.com',
      password: 'secretxxx'
    })

    const file = await factory.create('File')

    const meetup = await factory.create('Meetup', {
      file_id: file.id,
      user_id: user.id
    })

    const login = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: 'secretxxx'
      })

    await request(app)
      .get('/meetups/organizing')
      .set('Authorization', `Bearer ${login.body.token}`)

    expect.stringContaining(meetup.title)

    await request(app)
      .get('/meetups/organizing?date=2000-10-10')
      .set('Authorization', `Bearer ${login.body.token}`)

    expect.not.stringContaining(meetup.title)
  })
})
