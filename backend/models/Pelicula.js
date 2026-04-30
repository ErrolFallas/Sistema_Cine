'use strict';

const { Model, DataTypes } = require('sequelize');

/**
 * Modelo Pelicula
 * Información de una película del catálogo.
 * No tiene FK → se migra de forma independiente.
 */
module.exports = (sequelize) => {
  class Pelicula extends Model {
    static associate(models) {
      // Una película puede aparecer en muchas funciones
      Pelicula.hasMany(models.Funcion, {
        foreignKey: 'id_pelicula',
        as        : 'funciones',
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      });
    }
  }

  Pelicula.init(
    {
      id_pelicula: {
        type         : DataTypes.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      titulo: {
        type     : DataTypes.STRING(200),
        allowNull: false,
        validate : {
          notEmpty: { msg: 'El título no puede estar vacío.' },
        },
      },
      duracion: {
        // duración en minutos
        type     : DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        validate : {
          min: { args: [1], msg: 'La duración debe ser mayor a 0 minutos.' },
        },
      },
      genero: {
        type     : DataTypes.STRING(80),
        allowNull: false,
      },
      clasificacion_edad: {
        type        : DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17'),
        allowNull   : false,
        validate    : {
          isIn: {
            args: [['G', 'PG', 'PG-13', 'R', 'NC-17']],
            msg : 'Clasificación inválida. Use: G, PG, PG-13, R o NC-17.',
          },
        },
      },
      descripcion: {
        type     : DataTypes.TEXT,
        allowNull: true,
      },
      fecha_estreno: {
        type     : DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName  : 'Pelicula',
      tableName  : 'pelicula',
      underscored: true,
      timestamps : true,
    }
  );

  return Pelicula;
};
