const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ Client, Tasks }) {
      Order.belongsTo(Client, { foreignKey: 'order_id' });
      Order.hasMany(Tasks, { foreignKey: 'order_id' });
    }
  }
  Order.init({
    content: {
      type: DataTypes.TEXT,
    },
    client__id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
