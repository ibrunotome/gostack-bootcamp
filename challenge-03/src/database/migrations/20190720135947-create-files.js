'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('files', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      path: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('files')
  }
}
