import faker from 'faker'
import { factory } from 'factory-girl'
import User from '../src/app/models/User'
import File from '../src/app/models/File'
import Meetup from '../src/app/models/Meetup'
import Subscription from '../src/app/models/Subscription'

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

factory.define('File', File, {
  name: faker.lorem.word(),
  path: faker.lorem.word()
})

factory.define('Subscription', Subscription, {})

export default factory
