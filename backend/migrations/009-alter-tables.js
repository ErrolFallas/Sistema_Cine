'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Cambiar clasificacion_edad a ENUM
    await queryInterface.changeColumn('pelicula', 'clasificacion_edad', {
      type     : Sequelize.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17'),
      allowNull: false,
    });

    // 2. Agregar defaultValue 0 a precio_final en entrada
    await queryInterface.changeColumn('entrada', 'precio_final', {
      type        : Sequelize.DECIMAL(10, 2),
      allowNull   : false,
      defaultValue: 0,
    });

    // 3. Agregar defaultValue 0 a precio en funcion
    await queryInterface.changeColumn('funcion', 'precio', {
      type        : Sequelize.DECIMAL(10, 2),
      allowNull   : false,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('funcion', 'precio', {
      type     : Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });

    await queryInterface.changeColumn('entrada', 'precio_final', {
      type     : Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });

    await queryInterface.changeColumn('pelicula', 'clasificacion_edad', {
      type     : Sequelize.STRING(10),
      allowNull: false,
    });
  },
};
