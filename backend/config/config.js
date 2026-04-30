require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,       // createdAt / updatedAt automáticos
      underscored: true,      // snake_case en columnas
      freezeTableName: true,  // evita pluralización de nombres de tabla
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

/**
 * Valida la conexión a la base de datos.
 * Llama a esta función al iniciar el servidor.
 */
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅  Conexión a MySQL establecida correctamente.');
  } catch (error) {
    console.error('❌  No se pudo conectar a la base de datos:', error.message);
    process.exit(1); // detiene el servidor si no hay conexión
  }
};

module.exports = { sequelize, testConnection };
