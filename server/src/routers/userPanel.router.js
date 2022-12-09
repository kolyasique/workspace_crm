const userPanelRouter = require('express').Router();
const bcrypt = require('bcrypt');

const { Worker, Tasks, Client } = require('../../db/models');

userPanelRouter.get('/gettasks', async (req, res) => {
  const { id } = req.session.company;
  try {
    const allTasks = await Tasks.findAll({ where: { worker_id: Number(id) } });
    res.json(allTasks);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

userPanelRouter.get('/getclients', async (req, res) => {
  const { company_id } = req.session.company;
  try {
    const allClients = await Client.findAll({ where: { company_id: Number(company_id) } });
    res.json(allClients);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});
module.exports = userPanelRouter;
