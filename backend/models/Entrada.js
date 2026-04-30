'use strict';

const { Model, DataTypes } = require('sequelize');

/**
 * Modelo Entrada
 * Ticket/reserva de un asiento para una función específica.
 * FK: id_funcion → funcion, id_asiento → asiento
 */
module.exports = (sequelize) => {
  class Entrada extends Model {
    static associate(models) {
      Entrada.belongsTo(models.Funcion, {
        foreignKey: 'id_funcion',
        as        : 'funcion',
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      });
      Entrada.belongsTo(models.Asiento, {
        foreignKey: 'id_asiento',
        as        : 'asiento',
        onDelete  : 'RESTRICT',
        onUpdate  : 'CASCADE',
      });
    }
  }

  Entrada.init(
    {
      id_entrada: {
        type         : DataTypes.INTEGER.UNSIGNED,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      id_funcion: {
        type      : DataTypes.INTEGER.UNSIGNED,
        allowNull : false,
        references: { model: 'funcion', key: 'id_funcion' },
      },
      id_asiento: {
        type      : DataTypes.INTEGER.UNSIGNED,
        allowNull : false,
        references: { model: 'asiento', key: 'id_asiento' },
      },
      estado: {
        // "disponible" | "reservado" | "vendido" | "cancelado"
        type        : DataTypes.ENUM('disponible', 'reservado', 'vendido', 'cancelado'),
        allowNull   : false,
        defaultValue: 'disponible',
        validate    : {
          isIn: {
            args: [['disponible', 'reservado', 'vendido', 'cancelado']],
            msg : 'Estado inválido. Use: disponible, reservado, vendido o cancelado.',
          },
        },
      },
      precio_final: {
        type     : DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate : {
          min: { args: [0], msg: 'El precio final no puede ser negativo.' },
        },
      },
    },
    {
      sequelize,
      modelName  : 'Entrada',
      tableName  : 'entrada',
      underscored: true,
      timestamps : true,
      indexes    : [
        {
          // Un asiento no puede estar dos veces en la misma función
          unique: true,
          fields: ['id_funcion', 'id_asiento'],
          name  : 'ux_entrada_funcion_asiento',
        },
      ],
    }
  );

  return Entrada;
};
