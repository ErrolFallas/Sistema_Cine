'use strict';

const { Model, DataTypes } = require('sequelize');

/**
 * Modelo Cartelera
 * Período de programación de películas en un Cine.
 * FK: id_cine → cine
 */
module.exports = (sequelize) => {
  class Cartelera extends Model {
    static associate(models) {
      // Una cartelera pertenece a un cine
      Cartelera.belongsTo(models.Cine, {
        foreignKey: 'id_cine',
        as        : 'cine',
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      });
      // Una cartelera puede tener muchas funciones
      Cartelera.hasMany(models.Funcion, {
        foreignKey: 'id_cartelera',
        as        : 'funciones',
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      });
    }
  }

  Cartelera.init(
    {
      id_cartelera: {
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
      fecha_inicio: {
        type     : DataTypes.DATEONLY,
        allowNull: false,
        validate : {
          isDate: { msg: 'La fecha de inicio debe ser una fecha válida.' },
        },
      },
      fecha_fin: {
        type     : DataTypes.DATEONLY,
        allowNull: false,
        validate : {
          isDate        : { msg: 'La fecha fin debe ser una fecha válida.' },
          isAfterInicio(value) {
            if (new Date(value) <= new Date(this.fecha_inicio)) {
              throw new Error('La fecha fin debe ser posterior a la fecha de inicio.');
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName  : 'Cartelera',
      tableName  : 'cartelera',
      underscored: true,
      timestamps : true,
    }
  );

  return Cartelera;
};
