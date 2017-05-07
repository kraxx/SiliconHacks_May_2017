const express = require('express'),
      app = express(),
      port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(__dirname + '/public'));
app.use('/', require('./routes/index')); //router index

app.listen(port, function() {
  console.log(`File metadata microservice listening on port: ${port}`);
});
