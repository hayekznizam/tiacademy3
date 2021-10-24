'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // associação entre cliente e pedido
      Cliente.hasMany(models.Pedido,{foreignKey:'ClienteId',as:'pedidos'});
    }
  }
  Cliente.init(
    {
      nome: DataTypes.STRING,
      endereco: DataTypes.STRING,
      cidade: DataTypes.STRING,
      uf: DataTypes.STRING,
      cidade: DataTypes.STRING,
      nascimento: DataTypes.STRING,
      clienteDesde: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'Cliente',
    },
  );
  return Cliente;
};
