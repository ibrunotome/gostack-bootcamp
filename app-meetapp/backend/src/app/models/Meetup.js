import { isBefore } from 'date-fns'
import Model from './Model'
import Sequelize from 'sequelize'

class Meetup extends Model {
  static init (sequelize) {
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
          get () {
            return isBefore(this.date, new Date())
          }
        }
      },
      {
        sequelize
      }
    )

    return this
  }

  static associate (models) {
    this.belongsTo(models.File, { foreignKey: 'file_id', as: 'cover' })
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    this.hasMany(models.Subscription, { foreignKey: 'meetup_id' })
  }
}

export default Meetup
