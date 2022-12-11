const calendarRouter = require('express').Router();

const { Tasks } = require('../../db/models');

calendarRouter.get('/', async (req, res) => {
  try {
    const workerId = req.session.company.id;
    const events = await Tasks.findAll({ where: { worker_id: workerId } });
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

calendarRouter.post('/', async (req, res) => {
  try {
    const workerId = req.session.company.id;
    const { title, start, end } = req.body;
    await Tasks.create({
      title: req.body.title, start: req.body.start, end: req.body.end, worker_id: workerId, creator_id: workerId, task_type: 'personal',
    });
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

module.exports = calendarRouter;
