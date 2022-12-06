const session = require('express-session');
const FileStore = require('session-file-store')(session);

module.exports = session({
  name: 'phaseThree',
  store: new FileStore(),
  secret: process.env.SECRET || 'asdf234ragfbxcx2',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 1000,
  },
});
