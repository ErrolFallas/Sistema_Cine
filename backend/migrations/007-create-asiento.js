'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('asiento', {
      id_asiento: {
        type         : Sequelize.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      id_sala: {
        type      : Sequelize.INTEGER.UNSIGNED,
        allowNull : false,
        references: { model: 'sala', key: 'id_sala' },
        onDelete  : 'CASCADE',
        onUpdate  : 'CASCADE',
      },
      fila: {
        type     : Sequelize.CHAR(2),
        allowNull: false,
      },
      numero: {
        type     : Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
      },
      tipo: {
        type        : Sequelize.STRING(40),
        allowNull   : false,
        defaultValue: 'estandar',
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

    // Índice único: misma sala no puede tener dos asientos con igual fila+número
    await queryInterface.addIndex('asiento', ['id_sala', 'fila', 'numero'], {
      unique: true,
      name  : 'ux_asiento_sala_fila_numero',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('asiento');
  },
};
