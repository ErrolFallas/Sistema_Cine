'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sala', {
      id_sala: {
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
      id_tipo_sala: {
        type      : Sequelize.INTEGER.UNSIGNED,
        allowNull : false,
        references: { model: 'tipo_sala', key: 'id_tipo_sala' },
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      },
      nombre: {
        type     : Sequelize.STRING(80),
        allowNull: false,
      },
      capacidad: {
        type     : Sequelize.SMALLINT.UNSIGNED,
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
    await queryInterface.dropTable('sala');
  },
};
