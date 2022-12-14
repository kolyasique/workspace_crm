/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Clients', [{
      name: 'ООО_СтройАрсенал',
      adress: 'ГОРОД САНКТ-ПЕТЕРБУРГ, ПР-КТ ЛИГОВСКИЙ, Д.152, К.А, КВ.3Н',
      inn: '765398537',
      company_id: '1',
      email: 'arsenal@mail.ru',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'ООО_Грузовозов',
      adress: 'ГОРОД САНКТ-ПЕТЕРБУРГ, УЛ. ТРЕФОЛЕВА, Д.1, К.П, КВ.101',
      inn: '738752906',
      company_id: '1',
      email: 'gruz@mail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'ООО_ТЕХНОПРИБОР',
      adress: 'ГОРОД САНКТ-ПЕТЕРБУРГ, ПР-КТ НЕВСКИЙ, Д.100, КВ.42',
      inn: '765748587',
      company_id: '1',
      email: 'texnick@mail.ru',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'ЗАО_АЗИМУТ',
      adress: 'ГОРОД САНКТ-ПЕТЕРБУРГ, ПР-КТ ЛИТЕЙНЫЙ, Д. 22, ЛИТ А, ОФИС 55А',
      inn: '0216003935',
      company_id: '1',
      email: 'azimut@mail.ru',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'ООО_ЭНЕРГОДИАГНОСТИКА',
      adress: 'ГОРОД САНКТ-ПЕТЕРБУРГ, Ш. ПУЛКОВСКОЕ, Д. 30, К. 4 ЛИТЕР А, ОФИС 206',
      inn: '0276068542',
      company_id: '1',
      email: 'enegi@mail.ru',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'ООО_AРАН-2000',
      adress: 'ГОРОД САНКТ-ПЕТЕРБУРГ, УЛ. КОМСОМОЛЬСКАЯ 2-Я, Д.6, К.2А, КВ.7',
      inn: '0326002099',
      company_id: '1',
      email: 'aran@mail.ru',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'ООО_КАТУНЬ',
      adress: 'ГОРОД САНКТ-ПЕТЕРБУРГ, ЛН. 12-Я, Д.13, ЛИТЕР А, КВ.18Н',
      inn: '0410003816',
      company_id: '1',
      email: 'katun@mail.ru',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'ООО_ИГРА',
      adress: 'ГОРОД САНКТ-ПЕТЕРБУРГ, ЛН. 12-Я, Д.13, ЛИТЕР А, КВ.18Н',
      inn: '0410003140',
      company_id: '1',
      email: 'igra@mail.ru',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'ООО_БИНГО',
      adress: 'ГОРОД САНКТ-ПЕТЕРБУРГ, ЛН. 12-Я В.О., Д.13, ЛИТЕР А, КВ.18Н',
      inn: '0410003132',
      company_id: '1',
      email: 'bingo@mail.ru',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'ООО_НОРДЕН ДОМ',
      adress: 'УЛ. ЛОМАНАЯ, Д. 11, ЛИТ. А ПОМ. 42Н, 43Н, 44Н, КОМН. 2',
      inn: '0411060574',
      company_id: '1',
      email: 'nord@mail.ru',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
