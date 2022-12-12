const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Document.init({
    text: DataTypes.STRING,
    file: DataTypes.STRING,
    worker_id: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Document',
  });
  return Document;
};
