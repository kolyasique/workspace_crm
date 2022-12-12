const avatarRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { Worker } = require('../../db/models');
const avatarMiddleware = require('../middlewares/avatar');

avatarRouter.post('/avatar', avatarMiddleware.single('avatar'), async (req, res) => {
  try {
    const newForm = JSON.parse(req.body.form);
    const { id } = req.session.company;
    const {
      login, password, phone, email,
    } = newForm;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createFile = await Worker.update({
      login, phone, password: hashedPassword, email, avatar: req.file?.path,
    }, { where: { id } });
    res.json(createFile);
    res.status(200);
  } catch (error) {
    console.log('=====', error);
    res.sendStatus(404);
  }
});

module.exports = avatarRouter;
