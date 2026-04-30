'use strict';

const { Model, DataTypes } = require('sequelize');

/**
 * Modelo Funcion
 * Proyección de una película en una sala dentro de una cartelera.
 * FK: id_pelicula, id_sala, id_cartelera
 */
module.exports = (sequelize) => {
  class Funcion extends Model {
    static associate(models) {
      Funcion.belongsTo(models.Pelicula, {
        foreignKey: 'id_pelicula',
        as        : 'pelicula',
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      });
      Funcion.belongsTo(models.Sala, {
        foreignKey: 'id_sala',
        as        : 'sala',
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      });
      Funcion.belongsTo(models.Cartelera, {
        foreignKey: 'id_cartelera',
        as        : 'cartelera',
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      });
      // Una función tiene muchas entradas
      Funcion.hasMany(models.Entrada, {
        foreignKey: 'id_funcion',
        as        : 'entradas',
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      });
    }
  }

  Funcion.init(
    {
      id_funcion: {
        type         : DataTypes.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      id_pelicula: {
        type      : DataTypes.INTEGER.UNSIGNED,
        allowNull : false,
        references: { model: 'pelicula', key: 'id_pelicula' },
      },
      id_sala: {
        type      : DataTypes.INTEGER.UNSIGNED,
        allowNull : false,
        references: { model: 'sala', key: 'id_sala' },
      },
      id_cartelera: {
        type      : DataTypes.INTEGER.UNSIGNED,
        allowNull : false,
        references: { model: 'cartelera', key: 'id_cartelera' },
      },
      fecha: {
        type     : DataTypes.DATEONLY,
        allowNull: false,
        validate : {
          isDate: { msg: 'La fecha de la función debe ser válida.' },
        },
      },
      hora_inicio: {
        type     : DataTypes.TIME,
        allowNull: false,
      },
      hora_fin: {
        type     : DataTypes.TIME,
        allowNull: false,
      },
      precio: {
        type     : DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate : {
          min: { args: [0], msg: 'El precio no puede ser negativo.' },
        },
      },
    },
    {
      sequelize,
      modelName  : 'Funcion',
      tableName  : 'funcion',
      underscored: true,
      timestamps : true,
    }
  );

  return Funcion;
};
