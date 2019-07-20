import { isBefore } from 'date-fns'
import Sequelize from 'sequelize'
import Model from './Model'

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        date: Sequelize.DATE,
        file_id: Sequelize.UUID,
        user_id: Sequelize.UUID,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date())
          },
        },
      },
      {
        sequelize,
      },
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'file_id' })
    this.belongsTo(models.User, { foreignKey: 'user_id' })
  }
}

export default Meetup
