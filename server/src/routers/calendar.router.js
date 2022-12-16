const calendarRouter = require('express').Router();

const { Tasks } = require('../../db/models');

calendarRouter.get('/', async (req, res) => {
  try {
    const workerId = req.session.company.id;
    const events = await Tasks.findAll({ where: { worker_id: workerId }, raw: true });
    const filteredEvents = events.filter((el) => el.closed_by === null);
    res.json(filteredEvents);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

calendarRouter.post('/', async (req, res) => {
  try {
    const workerId = req.session.company.id;
    const { company_id } = req.session.company;
    const {
      title, start, end, content,
    } = req.body;
    if (!title || !content || !start || !end) {
      res.send({ msg: 'не все поля заполнены' });
    } else {
      await Tasks.create({
        title, content, start, end, worker_id: workerId, creator_id: workerId, task_type: 'personal', company_id,
      });
      res.status(200);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

module.exports = calendarRouter;
