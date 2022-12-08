/* eslint-disable camelcase */

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Work_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Worker }) {
      Work_category.hasMany(Worker, { foreignKey: 'category_id' });
    }
  }
  Work_category.init({
    name: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Work_category',
  });
  return Work_category;
};
