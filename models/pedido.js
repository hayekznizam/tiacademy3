'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // um pedido tem um cliente pertence a um cliente o pedido
      Pedido.belongsTo(models.Cliente, {
        foreignKey: 'ClienteId',
        as: 'clientes',
      });
      //servico pertence a classe item pedido
      Pedido.belongsToMany(models.Servico, {
        foreignKey: 'ServicoId',

        through: 'ItemPedido',
        as: 'servicos_ped',
      });
      Pedido.hasMany(models.ItemPedido, {
        foreignKey: 'PedidoId',
        as: 'item_pedido',
      });
    }
  }
  Pedido.init(
    {
      dataPedido: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'Pedido',
    },
  );
  return Pedido;
};
