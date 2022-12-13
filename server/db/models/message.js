const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Worker }) {
      this.belongsTo(Worker, { foreignKey: 'user_from', as: 'sender' });
      this.belongsTo(Worker, { foreignKey: 'user_to', as: 'receiver' });
    }
  }
  Message.init({
    text: DataTypes.STRING,
    user_from: DataTypes.INTEGER,
    user_to: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
