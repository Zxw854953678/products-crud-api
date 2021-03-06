var express = require('express');
var bodyParser = require('body-parser');
var storeFs = require('./product-store-file-system');
var HttpCode = require('http-status-codes');

storeFs.initSync();

var app = express();
app.use(bodyParser.json());

app.use('/products', require('./product-router'));

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(HttpCode.INTERNAL_SERVER_ERROR).send('Some errors happened, please see the log on server');
});

var server = app.listen(3000, function () {
  console.log('Server listening at:' + server.address().port);
});
