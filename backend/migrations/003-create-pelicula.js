'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pelicula', {
      id_pelicula: {
        type         : Sequelize.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      titulo: {
        type     : Sequelize.STRING(200),
        allowNull: false,
      },
      duracion: {
        // minutos
        type     : Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
      },
      genero: {
        type     : Sequelize.STRING(80),
        allowNull: false,
      },
      clasificacion_edad: {
        type     : Sequelize.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17'),
        allowNull: false,
      },
      descripcion: {
        type     : Sequelize.TEXT,
        allowNull: true,
      },
      fecha_estreno: {
        type     : Sequelize.DATEONLY,
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
    await queryInterface.dropTable('pelicula');
  },
};
