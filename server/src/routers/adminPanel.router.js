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

module.exports = adminPanelRouter;
