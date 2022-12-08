const calendarRouter = require('express').Router();

const { Tasks } = require('../../db/models');
const { Order } = require('../../db/models');

calendarRouter.get('/', async (req, res) => {
  try {
    const workerId = req.session.company.id;
    console.log('🚀🚀🚀🚀 =>>>>> file: calendar.router.js:8 =>>>>> calendarRouter.get =>>>>> workerId', workerId);
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
    console.log('🚀🚀🚀🚀 =>>>>> file: calendar.router.js:19 =>>>>> calendarRouter.post =>>>>> workerId', workerId);
    const { title, start, end } = req.body;
    await Tasks.create({
      title, start, end, worker_id: workerId,
    });
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

module.exports = calendarRouter;
