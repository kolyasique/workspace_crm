const avatarRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { Worker } = require('../../db/models');
const avatarMiddleware = require('../middlewares/avatar');

avatarRouter.get('/profile', async (req, res) => {
  try {
    const workerId = req.session.company.id;
    const infoWorker = await Worker.findOne({ where: { id: workerId } });
    res.json(infoWorker);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

avatarRouter.post('/avatar', avatarMiddleware.single('avatar'), async (req, res) => {
  console.log('gfg+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
  try {
    // const newForm = JSON.parse(req.body.form);
    const { id } = req.session.company;
    // const {
    //   login, password, phone, email,
    // } = newForm;
    // const hashedPassword = await bcrypt.hash(password, 10);

    const createFile = await Worker.update({ avatar: req.file?.path }, { where: { id } });
    const findThisUser = await Worker.findOne({ where: { id } });
    res.json({ findThisUser });
    res.status(200);
  } catch (error) {
    console.log('=====', error);
    res.sendStatus(404);
  }
});

module.exports = avatarRouter;
