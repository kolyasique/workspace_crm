const router = require('express').Router();

const { Tasks } = require('../../db/models');

router.get('/tasks', async (req, res) => {
  const userId = req.session.company.id;
  try {
    const tasks = await Tasks.findAll({ where: { worker_id: userId } });
    res.json(tasks);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
