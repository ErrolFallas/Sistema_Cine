'use strict';

const { Model, DataTypes } = require('sequelize');

/**
 * Modelo Asiento
 * Asiento físico dentro de una sala.
 * FK: id_sala → sala
 */
module.exports = (sequelize) => {
  class Asiento extends Model {
    static associate(models) {
      Asiento.belongsTo(models.Sala, {
        foreignKey: 'id_sala',
        as        : 'sala',
        onDelete  : 'CASCADE',
        onUpdate  : 'CASCADE',
      });
      // Un asiento puede estar en muchas entradas (una por función)
      Asiento.hasMany(models.Entrada, {
        foreignKey: 'id_asiento',
        as        : 'entradas',
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      });
    }
  }

  Asiento.init(
    {
      id_asiento: {
        type         : DataTypes.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      id_sala: {
        type      : DataTypes.INTEGER.UNSIGNED,
        allowNull : false,
        references: { model: 'sala', key: 'id_sala' },
      },
      fila: {
        // Letra de fila, ej: "A", "B", ... "Z"
        type     : DataTypes.CHAR(2),
        allowNull: false,
        validate : {
          notEmpty: { msg: 'La fila no puede estar vacía.' },
        },
      },
      numero: {
        type     : DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        validate : {
          min: { args: [1], msg: 'El número de asiento debe ser mayor a 0.' },
        },
      },
      tipo: {
        // Ej: "estandar", "preferencial", "vip", "discapacidad"
        type        : DataTypes.STRING(40),
        allowNull   : false,
        defaultValue: 'estandar',
      },
    },
    {
      sequelize,
      modelName  : 'Asiento',
      tableName  : 'asiento',
      underscored: true,
      timestamps : true,
      indexes    : [
        {
          // Unicidad: no puede haber dos asientos con la misma fila+numero en la misma sala
          unique: true,
          fields: ['id_sala', 'fila', 'numero'],
          name  : 'ux_asiento_sala_fila_numero',
        },
      ],
    }
  );

  return Asiento;
};
