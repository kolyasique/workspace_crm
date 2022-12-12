/* eslint-disable camelcase */
const uploadRouter = require('express').Router();

const { Document } = require('../../db/models');
const fileMiddleware = require('../middlewares/file');

uploadRouter.get('/getdocs', async (req, res) => {
  const { id, company_id } = req.session.company;
  try {
    // { where: { worker_id: Number(id) } }
    const allDocs = await Document.findAll({ where: { company_id: Number(company_id) } });

    console.log('ff');
    console.log(allDocs);
    res.json(allDocs);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

uploadRouter.delete('/deletedoc', async (req, res) => {
  const { id } = req.body;

  // console.log('🚀🚀🚀🚀 =>>>>> file: adminPanel.router.js:46 =>>>>> adminPanelRouter.delete =>>>>> req.body', req.body);
  try {
    const deleteDoc = await Document.destroy({ where: { id } });
    res.json(id);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

uploadRouter.post('/upload', fileMiddleware.single('avatar'), async (req, res) => {
  try {
    console.log(req.body, "console.log(req.body, '🚀🚀')");
    const newForm = JSON.parse(req.body.form);
    const idC = JSON.parse(req.body.client_id);
    const { text } = newForm;
    const { id } = req.session.company;
    const { company_id } = req.session.company;
    console.log(req.file);
    // Добавил company_id
    const createFile = await Document.create({
      text, file: req.file?.path, worker_id: id, client_id: idC, company_id,
    });
    res.json(createFile);
  } catch (error) {
    console.log('=====', error);
    res.sendStatus(400);
  }
});

module.exports = uploadRouter;
