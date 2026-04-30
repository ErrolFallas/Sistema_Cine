'use strict';

const { Model, DataTypes } = require('sequelize');

/**
 * Modelo Cine
 * Representa una sala de cine (empresa/complejo).
 * No tiene FK → se migra en orden temprano.
 */
module.exports = (sequelize) => {
  class Cine extends Model {
    static associate(models) {
      // Un cine tiene muchas salas
      Cine.hasMany(models.Sala, {
        foreignKey: 'id_cine',
        as        : 'salas',
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      });
      // Un cine tiene muchas carteleras
      Cine.hasMany(models.Cartelera, {
        foreignKey: 'id_cine',
        as        : 'carteleras',
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      });
    }
  }

  Cine.init(
    {
      id_cine: {
        type         : DataTypes.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      nombre: {
        type     : DataTypes.STRING(120),
        allowNull: false,
        validate : {
          notEmpty: { msg: 'El nombre del cine no puede estar vacío.' },
        },
      },
      direccion: {
        type     : DataTypes.STRING(255),
        allowNull: false,
      },
      ciudad: {
        type     : DataTypes.STRING(100),
        allowNull: false,
      },
      pais: {
        type     : DataTypes.STRING(100),
        allowNull: false,
      },
      telefono: {
        type     : DataTypes.STRING(20),
        allowNull: true,
        validate : {
          // Validación básica de formato telefónico
          is: { args: /^[+\d\s\-().]+$/, msg: 'Formato de teléfono inválido.' },
        },
      },
    },
    {
      sequelize,
      modelName  : 'Cine',
      tableName  : 'cine',
      underscored: true,
      timestamps : true,
    }
  );

  return Cine;
};
