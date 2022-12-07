const calendarRouter = require('express').Router();

const { Task } = require('../../db/models');

calendarRouter.get('/', async (req, res) => {
  try {
    const events = await Task.findAll();
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

calendarRouter.post('/', async (req, res) => {
  try {
    const { title, start, end } = req.body;
    console.log('🚀🚀🚀🚀 =>>>>> file: calendar.router.js:18 =>>>>> calendarRouter.post =>>>>> req.body', req.body);
    await Task.create({ title, start, end });
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

module.exports = calendarRouter;
