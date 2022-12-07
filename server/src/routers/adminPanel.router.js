const adminPanelRouter = require('express').Router();
const bcrypt = require('bcrypt');

const { Worker } = require('../../db/models');

adminPanelRouter.get('/getworkers', async (req, res) => {
  try {
    const allWorkers = await Worker.findAll({ where: { company_id: req.session.company.id } });
    res.json(allWorkers);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

module.exports = adminPanelRouter;
