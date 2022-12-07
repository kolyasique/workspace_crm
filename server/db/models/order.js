'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
   
    static associate(Client, Tasks) {
      Order.belongsTo(Client, {foreignKey: 'order_id' });
      Order.belongsTo(Tasks, {foreignKey: 'task_id' });
    }
  }
  Order.init({
    content: {
      type: DataTypes.TEXT,
    },
    client__id: {
      type: DataTypes.INTEGER,
    },
    task_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};