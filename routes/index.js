const express = require('express'),
      router = express.Router(),
      multer = require('../modules/multer'),
      fs = require('fs'),
      VisualRecognitionV3 = require('../node_modules/watson-developer-cloud/visual-recognition/v3');

const visual_recognition = new VisualRecognitionV3({
  api_key: '43a5d6dce3b4be1e7b4f1b1e161253c2c6c2e58a',
  version_date: VisualRecognitionV3.VERSION_DATE_2016_05_20
});

router.get('/', (req, res) => {
  res.render('./pages/index.ejs');
});

router.post('/upload', multer.upload.single('file'), (req, res) => {
  if (req.file) {

const params = {
  images_file: fs.createReadStream(req.file)
};

visual_recognition.classify(params, function(err, res) {
  if (err) {
    console.log(err);
  } else {

    //pipe into wikipedia/keyword searcher
    console.log(JSON.stringify(res, null, 2));
  }
});

} else {
    res.status(500).json({
      error: 'No file uploaded.'
    });
  }
})

module.exports = router;
