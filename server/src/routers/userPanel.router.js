/* eslint-disable camelcase */
/* eslint-disable max-len */
const userPanelRouter = require('express').Router();
const bcrypt = require('bcrypt');

const { Worker, Tasks, Client } = require('../../db/models');

userPanelRouter.get('/getuserinfo', async (req, res) => {
  const { id } = req.session.company;
  try {
    const findUser = await Worker.findOne({ where: { id } });
    res.json(findUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

userPanelRouter.get('/gettasks', async (req, res) => {
  const { id, company_id } = req.session.company;
  try {
    // { where: { worker_id: Number(id) } }
    const allTasks = await Tasks.findAll({ where: { company_id: Number(company_id), closed_by: null } });
    const workers = await Worker.findAll({ where: { company_id: req.session.company.company_id } });
    console.log('ff');
    console.log(allTasks);
    res.json({ allTasks, workers, id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});
userPanelRouter.get('/getworkers', async (req, res) => {
  const { company_id } = req.session.company;
  try {
    if (company_id) {
      const allWorkers = await Worker.findAll({ where: { company_id } });
      res.json(allWorkers);
    } else console.log('ОШИБКА');
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
// userPanelRouter.get('/getclientstasks', async (req, res) => {
//   const { id } = req.session.company;
//   try {
//     const allTasks = await Tasks.findAll({ where: { worker_id: Number(id) } });
//     const workers = await Worker.findAll({ where: { company_id: req.session.company.company_id } });
//     console.log('ff');
//     console.log(allTasks);
//     res.json({ allTasks, workers });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ msg: error.message });
//   }
// });
userPanelRouter.post('/createtask', async (req, res) => {
  const {
    title, content, startDate, endDate, taskForUserId,
  } = req.body;
  const sessionId = req.session.company.id;
  const sessionCompanyId = req.session.company.company_id;

  const taskType = (sessionId == taskForUserId ? 'personal' : 'ordered');
  console.log(taskType);
  try {
    console.log('taskId');
    const createTask = await Tasks.create({
      task_type: taskType, title, content, start: startDate, end: endDate, progress_status: 'Начало', status: null, creator_id: +sessionId, worker_id: +taskForUserId, order_id: null, company_id: +sessionCompanyId,
    });
    // const success = { success: 'Задача создана!' };
    res.json({ createTask, sessionId });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
userPanelRouter.post('/createtaskforclient', async (req, res) => {
  const {
    title, content, startDate, endDate, taskForUserId, client_id,
  } = req.body;
  console.log(req.body, '😉😉😉');
  const sessionId = req.session.company.id;
  const sessionCompanyId = req.session.company.company_id;
  const taskType = (sessionId == taskForUserId ? 'personal' : 'ordered');
  console.log(taskType);
  try {
    console.log('taskId');
    const createTask = await Tasks.create({
      task_type: taskType, title, content, start: startDate, end: endDate, progress_status: 'Начало', status: null, creator_id: +sessionId, worker_id: +taskForUserId, order_id: null, client_id, company_id: +sessionCompanyId,
    });
    // const success = { success: 'Задача создана!' };
    res.json({ createTask, sessionId });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
userPanelRouter.get('/getinfoforstat', async (req, res) => {
  const { company_id } = req.session.company;
  try {
    const allInfoForTasks = await Worker.findAll({ where: { company_id: Number(company_id) }, include: Tasks });
    console.log(allInfoForTasks);
    res.json(allInfoForTasks);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});
// userPanelRouter.post('/addclient', async (req, res) => {
//   const {
//     title, content, startDate, endDate, taskForUserId,
//   } = req.body;
//   const sessionId = req.session.company.id;
//   const taskType = (sessionId == taskForUserId ? 'personal' : 'ordered');
//   console.log(taskType);
//   try {
//     console.log('taskId');
//     const createTask = await Tasks.create({
//       task_type: taskType, title, content, start: startDate, end: endDate, progress_status: 'Начало', status: null, creator_id: +sessionId, worker_id: +taskForUserId, order_id: null,
//     });
//     // const success = { success: 'Задача создана!' };
//     res.json({ createTask, sessionId });
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// });

userPanelRouter.post('/settaskdone', async (req, res) => {
  const { taskId } = req.body;
  const checkRestTime = (dateOfEnd) => {
    const date1 = new Date(dateOfEnd);
    const date2 = new Date();
    const timeDiff = date1.getTime() - date2.getTime();
    const diffDays = (timeDiff / (1000 * 3600 * 24));
    return diffDays;
  };
  let updateTaskStatus;
  try {
    const findTask = await Tasks.findOne({ where: { id: taskId } });
    const thisTaskDateOfEnd = findTask.end;
    if (checkRestTime(thisTaskDateOfEnd) < 0) {
      updateTaskStatus = await Tasks.update({ status: false }, { where: { id: taskId } });
    } else updateTaskStatus = await Tasks.update({ status: true }, { where: { id: taskId } });
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

userPanelRouter.post('/settaskclosed', async (req, res) => {
  try {
    const { taskId } = req.body;
    const { id } = req.session.company;
    console.log(req.body.taskId);
    const setTaskClosedBy = await Tasks.update({ closed_by: id }, { where: { id: taskId } });
    res.json({ taskId, id });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
userPanelRouter.get('/gethistory', async (req, res) => {
  try {
    console.log('😉 😉 😉 v v 😉 😉 😉 😉 v v 😉 😉 v v 😉 ');
    const { company_id } = req.session.company;
    const findAllTasksInCompany = await Tasks.findAll({ where: { company_id } });
    res.json(findAllTasksInCompany);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
module.exports = userPanelRouter;
