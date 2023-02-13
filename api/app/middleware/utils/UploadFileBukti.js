const util = require("util");
const multer = require("multer");
require('dotenv-safe').config()
const maxSize = 1000 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + __upload_path + 'buktipembayaran/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).array('files');

let uploadOrderMiddleware = util.promisify(uploadFile);
module.exports = uploadOrderMiddleware;