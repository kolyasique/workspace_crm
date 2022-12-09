/* eslint-disable max-len */
const userPanelRouter = require('express').Router();
const bcrypt = require('bcrypt');

const { Worker, Tasks, Client } = require('../../db/models');

userPanelRouter.get('/gettasks', async (req, res) => {
  const { id } = req.session.company;
  console.log(req.session);
  try {
    const allTasks = await Tasks.findAll({ where: { worker_id: Number(id) } });
    console.log(id, allTasks);
    res.json(allTasks);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

userPanelRouter.get('/getclients', async (req, res) => {
  const { company_id } = req.session.company;
  console.log(req.session);
  try {
    const allClients = await Client.findAll({ where: { company_id: Number(company_id) } });
    console.log(company_id, allClients);
    res.json(allClients);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

userPanelRouter.post('/settaskdone', async (req, res) => {
  const { taskId } = req.body;
  try {
    console.log(taskId);
    const updateTaskStatus = await Tasks.update({ status: true }, { where: { id: taskId } });
    console.log(updateTaskStatus);
    res.json(taskId);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
userPanelRouter.post('/changetaskprogress', async (req, res) => {
  try {
    const taskId = Number(Object.keys(req.body)[0]);
    const taskProgress = Object.values(req.body)[0];
    const updateTaskProcess = await Tasks.update({ progress_status: taskProgress }, { where: { id: taskId } });
    res.json(taskId);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
module.exports = userPanelRouter;
