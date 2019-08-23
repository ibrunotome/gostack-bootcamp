import Sequelize from 'sequelize'
import Model from './Model'

class File extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING
      },
      {
        sequelize
      }
    )

    return this
  }
}

export default File
