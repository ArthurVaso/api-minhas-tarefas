'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('usuario', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      nome: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      sobrenome: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      senha: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false
      },
      ativo: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('usuario');
  }
};
