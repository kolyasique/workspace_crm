const BaseRouter = require('express').Router();
const AuthRouter = require('./auth.router');
const AdminPanelRouter = require('./adminPanel.router');
const calendarRouter = require('./calendar.router');
const chatRouter = require('./chat.router');
const userPanelRouter = require('./userPanel.router');
const fileRouter = require('./upload.router');
const avatarRouter = require('./avatar.router');
const statRouter = require('./stat.router');

BaseRouter.use('/auth', AuthRouter);
BaseRouter.use('/adminpanel', AdminPanelRouter);
BaseRouter.use('/calendar', calendarRouter);
BaseRouter.use('/chat', chatRouter);
BaseRouter.use('/userpanel', userPanelRouter);
BaseRouter.use('/', fileRouter);
BaseRouter.use('/', avatarRouter);
BaseRouter.use('/stat', statRouter);

BaseRouter.get('*', (req, res) => {
  res.json({ msg: 'no end point' });
});

module.exports = BaseRouter;
