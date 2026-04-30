'use strict';

const { Model, DataTypes } = require('sequelize');

/**
 * Modelo Sala
 * Sala de proyección dentro de un Cine.
 * FK: id_cine → cine, id_tipo_sala → tipo_sala
 */
module.exports = (sequelize) => {
  class Sala extends Model {
    static associate(models) {
      // Una sala pertenece a un cine
      Sala.belongsTo(models.Cine, {
        foreignKey: 'id_cine',
        as        : 'cine',
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      });
      // Una sala tiene un tipo de sala
      Sala.belongsTo(models.TipoSala, {
        foreignKey: 'id_tipo_sala',
        as        : 'tipoSala',
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      });
      // Una sala puede tener muchas funciones
      Sala.hasMany(models.Funcion, {
        foreignKey: 'id_sala',
        as        : 'funciones',
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      });
      // Una sala tiene muchos asientos
      Sala.hasMany(models.Asiento, {
        foreignKey: 'id_sala',
        as        : 'asientos',
        onDelete  : 'CASCADE',
        onUpdate  : 'CASCADE',
      });
    }
  }

  Sala.init(
    {
      id_sala: {
        type         : DataTypes.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      id_cine: {
        type      : DataTypes.INTEGER.UNSIGNED,
        allowNull : false,
        references: { model: 'cine', key: 'id_cine' },
      },
      id_tipo_sala: {
        type      : DataTypes.INTEGER.UNSIGNED,
        allowNull : false,
        references: { model: 'tipo_sala', key: 'id_tipo_sala' },
      },
      nombre: {
        type     : DataTypes.STRING(80),
        allowNull: false,
        validate : {
          notEmpty: { msg: 'El nombre de la sala no puede estar vacío.' },
        },
      },
      capacidad: {
        type     : DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        validate : {
          min: { args: [1], msg: 'La capacidad debe ser al menos 1.' },
        },
      },
    },
    {
      sequelize,
      modelName  : 'Sala',
      tableName  : 'sala',
      underscored: true,
      timestamps : true,
    }
  );

  return Sala;
};
