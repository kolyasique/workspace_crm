const BaseRouter = require('express').Router();
const AuthRouter = require('./auth.router');
const AdminPanelRouter = require('./adminPanel.router');

// const isAuth = require('../middlewares/isAuth');

BaseRouter.use('/auth', AuthRouter);
BaseRouter.use('/adminpanel', AdminPanelRouter);

BaseRouter.get('*', (req, res) => {
  res.json({ msg: 'no end point' });
});

module.exports = BaseRouter;
