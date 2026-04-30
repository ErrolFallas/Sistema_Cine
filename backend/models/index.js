'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const process   = require('process');

const basename  = path.basename(__filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config')[env];
const db        = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/* Carga dinámica de todos los modelos de esta carpeta */
fs
  .readdirSync(__dirname)
  .filter(file =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

/* Configura asociaciones si el modelo las define */
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/**
 * Valida la conexión a la base de datos al arrancar el servidor.
 */
db.testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅  Conexión a MySQL establecida correctamente.');
  } catch (error) {
    console.error('❌  No se pudo conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = db;
