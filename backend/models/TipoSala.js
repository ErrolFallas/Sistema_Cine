'use strict';

const { Model, DataTypes } = require('sequelize');

/**
 * Modelo TipoSala
 * Representa los tipos de sala disponibles (ej: 2D, 3D, IMAX, 4DX).
 * No tiene dependencias de FK → se migra primero.
 */
module.exports = (sequelize) => {
  class TipoSala extends Model {
    static associate(models) {
      // Un tipo de sala puede tener muchas salas
      TipoSala.hasMany(models.Sala, {
        foreignKey: 'id_tipo_sala',
        as        : 'salas',
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      });
    }
  }

  TipoSala.init(
    {
      id_tipo_sala: {
        type         : DataTypes.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      nombre: {
        type     : DataTypes.STRING(80),
        allowNull: false,
        unique   : true,
        validate : {
          notEmpty: { msg: 'El nombre del tipo de sala no puede estar vacío.' },
          len     : { args: [2, 80], msg: 'El nombre debe tener entre 2 y 80 caracteres.' },
        },
      },
      descripcion: {
        type     : DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName  : 'TipoSala',
      tableName  : 'tipo_sala',
      underscored: true,
      timestamps : true,
    }
  );

  return TipoSala;
};
