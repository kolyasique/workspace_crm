/* eslint-disable camelcase */

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Worker extends Model {
    static associate({
      Work_category, Company, Tasks, Message,
    }) {
      Worker.belongsTo(Work_category, { foreignKey: 'category_id' });
      Worker.belongsTo(Company, { foreignKey: 'company_id' });
      Worker.hasMany(Tasks, { foreignKey: 'creator_id' });
      Worker.hasMany(Tasks, { foreignKey: 'worker_id' });
      Worker.hasMany(Message, { foreignKey: 'user_from', as: 'sender' });
      Worker.hasMany(Message, { foreignKey: 'user_to', as: 'receiver' });
    }
  }
  Worker.init({
    avatar: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    login: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.TEXT,
    },
    second_name: {
      type: DataTypes.TEXT,
    },
    patronymic: {
      type: DataTypes.TEXT,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Work_categories',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Companies',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    email: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.TEXT,
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Worker',
  });
  return Worker;
};
