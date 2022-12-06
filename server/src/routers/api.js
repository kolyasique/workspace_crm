const BaseRouter = require('express').Router();
const AuthRouter = require('./auth.router');
// const CandidateRouter = require('./candidate.router');

const isAuth = require('../middlewares/isAuth');

BaseRouter.use('/auth', AuthRouter);
// BaseRouter.use('/candidate', isAuth, CandidateRouter);

BaseRouter.get('*', (req, res) => {
  res.json({ msg: 'no end point' });
});

module.exports = BaseRouter;
