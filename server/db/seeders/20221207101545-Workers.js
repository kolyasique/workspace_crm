const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Workers', [{
      login: 'Миша',
      password: await bcrypt.hash('123', 10),
      name: 'Миша',
      second_name: 'Иванов',
      patronymic: 'Иванович',
      category_id: '3',
      company_id: '1',
      email: '123@123',
      phone: '89222222222',
      accepted: 'true',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'Admin',
      password: await bcrypt.hash('123', 10),
      name: 'Владимир',
      second_name: 'Пупкин',
      patronymic: 'Владимирович',
      category_id: '1',
      company_id: '1',
      email: '123@123',
      phone: '89222222222',
      accepted: 'true',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      login: 'AUP',
      password: await bcrypt.hash('123', 10),
      name: 'Вася',
      second_name: 'Васильев',
      patronymic: 'Васильевич',
      category_id: '2',
      company_id: '1',
      email: '123@123',
      phone: '89222222222',
      accepted: 'true',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Workers', null, {});
  }
};
