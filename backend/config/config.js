'use strict';
require('dotenv').config();

/**
 * Configuración de Sequelize compatible con sequelize-cli.
 * Lee las credenciales desde las variables de entorno definidas en .env
 */
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host    : process.env.DB_HOST,
    port    : parseInt(process.env.DB_PORT, 10) || 3306,
    dialect : 'mysql',
    logging : console.log,
    define  : {
      timestamps    : true,
      underscored   : true,   // snake_case en columnas de BD
      freezeTableName: true,  // sin pluralización automática
    },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`,
    host    : process.env.DB_HOST,
    port    : parseInt(process.env.DB_PORT, 10) || 3306,
    dialect : 'mysql',
    logging : false,
    define  : {
      timestamps    : true,
      underscored   : true,
      freezeTableName: true,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host    : process.env.DB_HOST,
    port    : parseInt(process.env.DB_PORT, 10) || 3306,
    dialect : 'mysql',
    logging : false,
    define  : {
      timestamps    : true,
      underscored   : true,
      freezeTableName: true,
    },
  },
};
