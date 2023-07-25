/* eslint-disable camelcase */
const avatarRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { Worker } = require('../../db/models');
const avatarMiddleware = require('../middlewares/avatar');

avatarRouter.get('/profile', async (req, res) => {
  try {
    const workerId = req.session.company.id;
    const infoWorker = await Worker.findOne({ where: { id: workerId } });
    delete infoWorker.dataValues.password;
    delete infoWorker.dataValues.createdAt;
    delete infoWorker.dataValues.updatedAt;
    res.json(infoWorker);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

avatarRouter.post('/avatar', avatarMiddleware.single('avatar'), async (req, res) => {
  try {
    const { id } = req.session.company;

    const createFile = await Worker.update({ avatar: req.file?.path }, { where: { id } });
    const findThisUser = await Worker.findOne({ where: { id } });
    res.json({ findThisUser });
    res.status(200);
  } catch (error) {
    res.sendStatus(404);
  }
});

avatarRouter.post('/updworkerinfo', async (req, res) => {
  const { id } = req.session.company;
  const {
    login, name, second_name, patronymic, email, phone,
  } = req.body;
  const updateUser = await Worker.update({
    login, name, second_name, patronymic, email, phone,
  }, { where: { id } });
  const findUpdatedUser = await Worker.findOne({ where: { id } });
  delete findUpdatedUser.dataValues.password;
  delete findUpdatedUser.dataValues.createdAt;
  delete findUpdatedUser.dataValues.updatedAt;
  res.json(findUpdatedUser);
});

avatarRouter.post('/updworkerpassword', async (req, res) => {
  const { id } = req.session.company;
  const { oldpassword, password, repassword } = req.body;

  try {
    const userForPswUpdate = await Worker.findOne({ where: { id } });
    const comparePassword = await bcrypt.compare(oldpassword, userForPswUpdate.password);
    if (comparePassword) {
      const newHashedPassword = await bcrypt.hash(password, 10);
      const updateUserPsw = await Worker.update({ password: newHashedPassword }, { where: { id } });
      return res.json({ changed: true });
    }
    if (!comparePassword) {
      return res.json({ changed: false });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
  res.json({ id: 'ddg' });
});

module.exports = avatarRouter;
