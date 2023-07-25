const multer = require('multer');
const path = require('path');

const storageAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/avatar');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

const types = ['image/png', 'image/jpeg', 'image/jpg'];

const avatarFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage: storageAvatar, avatarFilter });
