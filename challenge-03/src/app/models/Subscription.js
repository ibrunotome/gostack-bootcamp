import Model from './Model'
import Sequelize from 'sequelize'

class Subscription extends Model {
  static init (sequelize) {
    super.init(
      {
        user_id: Sequelize.UUID,
        meetup_id: Sequelize.UUID
      },
      {
        sequelize
      }
    )
  }

  static associate (models) {
    this.belongsTo(models.Meetup, { foreignKey: 'meetup_id' })
    this.belongsTo(models.User, { foreignKey: 'user_id' })
  }
}

export default Subscription
