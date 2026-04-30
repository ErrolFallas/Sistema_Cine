'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('funcion', {
      id_funcion: {
        type         : Sequelize.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      id_pelicula: {
        type      : Sequelize.INTEGER.UNSIGNED,
        allowNull : false,
        references: { model: 'pelicula', key: 'id_pelicula' },
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      },
      id_sala: {
        type      : Sequelize.INTEGER.UNSIGNED,
        allowNull : false,
        references: { model: 'sala', key: 'id_sala' },
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      },
      id_cartelera: {
        type      : Sequelize.INTEGER.UNSIGNED,
        allowNull : false,
        references: { model: 'cartelera', key: 'id_cartelera' },
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      },
      fecha: {
        type     : Sequelize.DATEONLY,
        allowNull: false,
      },
      hora_inicio: {
        type     : Sequelize.TIME,
        allowNull: false,
      },
      hora_fin: {
        type     : Sequelize.TIME,
        allowNull: false,
      },
      precio: {
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable('funcion');
  },
};
