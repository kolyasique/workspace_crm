/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Work_categories', [{
      name: 'AUP',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Worker',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Work_categories', null, {});
  },
};
