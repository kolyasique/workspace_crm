const adminPanelRouter = require('express').Router();
const bcrypt = require('bcrypt');

const { Worker, Client } = require('../../db/models');

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
    const companyId = req.session.company.id;
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

adminPanelRouter.delete('/deleteuser', async (req, res) => {
  const { id } = req.body;
  try {
    const deleteWorkers = await Worker.destroy({ where: { id } });
    res.json(id);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

adminPanelRouter.get('/getclients', async (req, res) => {
  const { id } = req.session.company;
  try {
    if (id) {
      const allClients = await Client.findAll({ where: { company_id: id } });
      res.json(allClients);
    } else console.log('ОШИБКА');
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

adminPanelRouter.post('/createclient', async (req, res) => {
  try {
    const {
      name, adress, inn, email,
    } = req.body;
    const companyId = req.session.company.id;
    const createClient = await Client.create({
      name,
      adress,
      inn,
      email,
      company_id: companyId,

    });
    res.json(createClient);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

adminPanelRouter.delete('/deleteclient', async (req, res) => {
  const { id } = req.body;
  try {
    const deleteClients = await Client.destroy({ where: { id } });
    res.json(id);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

module.exports = adminPanelRouter;
