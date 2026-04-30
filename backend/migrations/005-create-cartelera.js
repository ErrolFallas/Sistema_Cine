'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cartelera', {
      id_cartelera: {
        type         : Sequelize.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      id_cine: {
        type      : Sequelize.INTEGER.UNSIGNED,
        allowNull : false,
        references: { model: 'cine', key: 'id_cine' },
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      },
      fecha_inicio: {
        type     : Sequelize.DATEONLY,
        allowNull: false,
      },
      fecha_fin: {
        type     : Sequelize.DATEONLY,
        allowNull: false,
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
    await queryInterface.dropTable('cartelera');
  },
};
