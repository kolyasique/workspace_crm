const {
  Model,
} = require('sequelize');
const order = require('./order');

module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    static associate({ Worker, Order }) {
      Tasks.belongsTo(Worker, { foreignKey: 'worker_id' });
      Tasks.belongsTo(Order, { foreignKey: 'order_id' });
    }
  }
  Tasks.init({
    title: {
      type: DataTypes.TEXT,
    },
    start: {
      type: DataTypes.TEXT,
    },
    end: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    worker_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Workers',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};
