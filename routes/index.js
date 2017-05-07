const express = require('express'),
      router = express.Router(),
      multer = require('../modules/multer'),
      fs = require('fs'),
      VisualRecognitionV3 = require('../node_modules/watson-developer-cloud/visual-recognition/v3'),
      request = require('request');

const visual_recognition = new VisualRecognitionV3({
  api_key: '43a5d6dce3b4be1e7b4f1b1e161253c2c6c2e58a',
  version_date: VisualRecognitionV3.VERSION_DATE_2016_05_20
});

router.get('/', (req, res) => {
  res.render('./pages/index.ejs', {
    req: req
  });
});

router.post('/upload', multer.upload.single('file'), (req, res) => {
  if (req.file) {

    const params = {
      images_file: fs.createReadStream('./uploads/0.jpg')
    };

    visual_recognition.classify(params, function(err, resp) {
        if (err) {console.log(err);}
        else {

          var term = resp.images[0].classifiers[0].classes[0].class;

          request("https://en.wikipedia.org/w/api.php?action=opensearch&search="
          + term + "&limit=1&format=json&callback=?", function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            body = body.slice(5, -1);
            res.render('./pages/index.ejs', {
              json: JSON.parse(body)
            });
            // res.redirect('/?data='+encodeURIComponent(body)); // Print the HTML for the Google homepage.
          });


          // console.log(JSON.stringify(res, null, 2));
        }
    });

  } else {
    res.status(500).json({
      error: 'No file uploaded.'
    });
  }
})

module.exports = router;
