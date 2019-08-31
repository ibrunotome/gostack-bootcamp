import faker from 'faker'
import { factory } from 'factory-girl'
import User from '../src/app/models/User'
import Meetup from '../src/app/models/Meetup'

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

factory.define('Meetup', Meetup, {
  title: faker.lorem.words(),
  description: faker.lorem.sentence(),
  password: faker.internet.password(),
  location: faker.random.locale(),
  date: faker.date.future()
})

export default factory
