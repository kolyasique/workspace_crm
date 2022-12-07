const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Companies', [{
      name: 'ООО Ромашка',
      login: 'Ромашка',
      password: await bcrypt.hash('123', 10),
      inn: 'inn',
      email: '123@123',
      phone: '89222222222',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Companies', null, {});
  },
};
