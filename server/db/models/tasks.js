const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    static associate({
      Worker, Order, Client, Company,
    }) {
      Tasks.belongsTo(Worker, { foreignKey: 'worker_id', as: 'executor' });
      Tasks.belongsTo(Worker, { foreignKey: 'creator_id', as: 'creator' });
      Tasks.belongsTo(Order, { foreignKey: 'order_id' });
      Tasks.belongsTo(Client, { foreignKey: 'client_id' });
      Tasks.belongsTo(Company, { foreignKey: 'company_id' });
    }
  }
  Tasks.init({
    task_type: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT,
    },
    start: {
      type: DataTypes.TEXT,
    },
    end: {
      type: DataTypes.TEXT,
    },
    progress_status: {
      defaultValue: 'Новая',
      type: DataTypes.TEXT,
    },
    status: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Workers',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
      allowNull: true,
      references: {
        model: 'Orders',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Company',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    closed_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};
