'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tipo_sala', {
      id_tipo_sala: {
        type         : Sequelize.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      nombre: {
        type     : Sequelize.STRING(80),
        allowNull: false,
        unique   : true,
      },
      descripcion: {
        type     : Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type     : Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type     : Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tipo_sala');
  },
};
