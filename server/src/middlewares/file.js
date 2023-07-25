const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

const types = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.documen', 'application/vnd.openxmlformats-officedocument',
  'application/msword', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage, fileFilter });
