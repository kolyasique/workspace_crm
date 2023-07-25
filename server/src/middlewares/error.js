const errorLogger = require('../utils/errorLogger');

module.exports = function (err, req, res, next) {
  return res.status(400).json({
    error: err.message,
  });
};