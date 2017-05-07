const multer = require('multer'),
      path = require('path'),
      shortid = require('shortid');

// const storage = multer.memoryStorage(),
//       upload = multer({ storage: storage });

var upload = multer({
    storage: multer.diskStorage({
        destination: './uploads/',
        filename: function (req, file, cb){
            // user shortid.generate() alone if no extension is needed
            cb(null, '0' + path.parse(file.originalname).ext);
        }
    })
});

exports.upload = upload;
