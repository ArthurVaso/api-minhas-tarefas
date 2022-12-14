'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('tarefa', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      usuario_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      titulo: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      descricao: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false
      },
      data_limite: {
          type: Sequelize.DataTypes.DATEONLY
      },
      concluida: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('tarefa');
  }
};