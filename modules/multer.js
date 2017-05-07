const multer = require('multer');

const storage = multer.memoryStorage(),
      upload = multer({ storage: storage });

exports.upload = upload;
