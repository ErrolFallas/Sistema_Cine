'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('entrada', {
      id_entrada: {
        type         : Sequelize.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      id_funcion: {
        type      : Sequelize.INTEGER.UNSIGNED,
        allowNull : false,
        references: { model: 'funcion', key: 'id_funcion' },
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      },
      id_asiento: {
        type      : Sequelize.INTEGER.UNSIGNED,
        allowNull : false,
        references: { model: 'asiento', key: 'id_asiento' },
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      },
      estado: {
        type        : Sequelize.ENUM('disponible', 'reservado', 'vendido', 'cancelado'),
        allowNull   : false,
        defaultValue: 'disponible',
      },
      precio_final: {
        type        : Sequelize.DECIMAL(10, 2),
        allowNull   : false,
        defaultValue: 0,
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

    // Índice único: un asiento no puede aparecer dos veces en la misma función
    await queryInterface.addIndex('entrada', ['id_funcion', 'id_asiento'], {
      unique: true,
      name  : 'ux_entrada_funcion_asiento',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('entrada');
  },
};
