/* eslint-disable camelcase */

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Worker, Client, Tasks }) {
      Company.hasMany(Worker, { foreignKey: 'company_id' });
      Company.hasMany(Client, { foreignKey: 'company_id' });
      Company.hasMany(Tasks, { foreignKey: 'company_id' });
    }
  }
  Company.init({
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    inn: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};
