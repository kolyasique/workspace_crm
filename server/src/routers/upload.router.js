const uploadRouter = require('express').Router();
const { Document } = require('../../db/models');
const fileMiddleware = require('../middlewares/file');

uploadRouter.post('/upload', fileMiddleware.single('avatar'), async (req, res) => {
  try {
    const newForm = JSON.parse(req.body.form);
    const { text } = newForm;
    const createFile = await Document.create({ text, file: req.file.path });
    res.json(createFile);
  } catch (error) {
    console.log('=====', error);
  }
});

module.exports = uploadRouter;
