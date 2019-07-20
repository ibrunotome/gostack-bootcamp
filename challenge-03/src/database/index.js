import Sequelize from 'sequelize'
import User from '../app/models/User'
import File from '../app/models/File'
import databaseConfig from '../config/database'
import Meetup from '../app/models/Meetup'

const models = [User, File, Meetup]

class Database {
  constructor() {
    this.init()
    this.associate()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)

    models.map(model => model.init(this.connection))
  }

  associate() {
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models)
      }
    })
  }
}

export default new Database()
