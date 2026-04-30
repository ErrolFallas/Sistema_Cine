'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cine', {
      id_cine: {
        type         : Sequelize.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      nombre: {
        type     : Sequelize.STRING(120),
        allowNull: false,
      },
      direccion: {
        type     : Sequelize.STRING(255),
        allowNull: false,
      },
      ciudad: {
        type     : Sequelize.STRING(100),
        allowNull: false,
      },
      pais: {
        type     : Sequelize.STRING(100),
        allowNull: false,
      },
      telefono: {
        type     : Sequelize.STRING(20),
        allowNull: true,
      },
      created_at: {
        type        : Sequelize.DATE,
        allowNull   : false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type        : Sequelize.DATE,
        allowNull   : false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('cine');
  },
};
