/* eslint-disable camelcase */

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Worker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Work_category, Company }) {
      Worker.belongsTo(Work_category, { foreignKey: 'category_id' });
      Worker.belongsTo(Company, { foreignKey: 'company_id' });
    }
  }
  Worker.init({
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
