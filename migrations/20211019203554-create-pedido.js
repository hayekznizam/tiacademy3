'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      data: {
        type: Sequelize.DATEONLY,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      //chave primária configuracao
      ClienteId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        //se refere ao model, ao cientes
        references: {
          model: 'clientes',
          key: 'id',
        },
        //exclusão em cascata de tudo que é do cliente
        onDelete: 'CASCADE',
        onUptdate: 'CASCADE',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pedidos');
  },
};
