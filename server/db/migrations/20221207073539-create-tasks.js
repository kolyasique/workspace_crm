/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      task_type: {
        type: Sequelize.TEXT,
      },
      title: {
        type: Sequelize.TEXT,
      },
      content: {
        type: Sequelize.TEXT,
      },
      start: {
        type: Sequelize.TEXT,
      },
      end: {
        type: Sequelize.TEXT,
      },
      progress_status: {
        defaultValue: 'Новая',
        type: Sequelize.TEXT,
      },
      status: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      creator_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Workers',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      worker_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Workers',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Orders',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Clients',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Companies',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      closed_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  },
};
