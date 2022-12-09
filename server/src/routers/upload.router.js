const uploadRouter = require('express').Router();
const { Document } = require('../../db/models');
const fileMiddleware = require('../middlewares/file');

uploadRouter.post('/upload', fileMiddleware.single('avatar'), async (req, res) => {
  try {
    const newForm = JSON.parse(req.body.form);
    const idC = JSON.parse(req.body.client_id);
    const { text } = newForm;
    const { id } = req.session.company;
    const createFile = await Document.create({
      text, file: req.file.path, worker_id: id, client_id: idC,
    });
    res.json(createFile);
  } catch (error) {
    console.log('=====', error);
  }
});

module.exports = uploadRouter;
