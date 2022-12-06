'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Work_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Work_category.init({
    name: DataTypes.TEXT,
    company_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Work_category',
  });
  return Work_category;
};