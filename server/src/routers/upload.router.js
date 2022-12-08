const uploadRouter = require('express').Router();
const fileMiddleware = require('../middlewares/file');

uploadRouter.post('/upload', fileMiddleware.single('avatar'), (req, res) => {
  try {
    console.log('avatar');
    if (req.file) {
      res.json(req.file);
    }
  } catch (error) {
    console.log('=====', error);
  }
});

module.exports = uploadRouter;
