const adminPanelRouter = require('express').Router();
const bcrypt = require('bcrypt');

const { Worker } = require('../../db/models');

adminPanelRouter.get('/getworkers', async (req, res) => {
  const { id } = req.session.company;
  try {
    if (id) {
      const allWorkers = await Worker.findAll({ where: { company_id: id } });
      res.json(allWorkers);
    } else console.log('ОШИБКА');
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

adminPanelRouter.post('/createuser', async (req, res) => {
  try {
    const {
      login, password, name, second_name, patronymic, email, phone, select,
    } = req.body;
    console.log('🚀🚀🚀🚀 =>>>>> file: adminPanel.router.js:24 =>>>>> adminPanelRouter.post =>>>>> req.body', req.body);
    const companyId = req.session.company.id;

    console.log(companyId);
    const hashedPassword = await bcrypt.hash(password, 10);
    const createWorker = await Worker.create({
      login,
      password: hashedPassword,
      name,
      second_name,
      patronymic,
      category_id: Number(select),
      company_id: companyId,
      email,
      phone,

    });
    res.json(createWorker);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

module.exports = adminPanelRouter;
