const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Company, Order, Tasks }) {
      Client.belongsTo(Company, { foreignKey: 'company_id' });
      Client.hasMany(Order, { foreignKey: 'order_id' });
      Client.hasMany(Tasks, { foreignKey: 'client_id' });
    }
  }
  Client.init({
    name: {
      type: DataTypes.STRING,
    },
    adress: {
      type: DataTypes.STRING,
    },
    inn: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
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
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};
