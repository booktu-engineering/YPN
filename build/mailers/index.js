'use strict';

var app = require('express')();
var Mailer = require('./mailer');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/sendmail', function (req, res) {
  try {
    console.log(req.body);
    if (Mailer.dispatch(req.body, parseInt(req.query.key))) {
      res.json({ sent: true }).status(200);
      return;
    }
    res.json({ error: 'Something went wrong' }).status(500);
  } catch (err) {
    res.json({ error: err.message }).status(500);
  }
});

app.listen(3500, function () {
  console.log('Mailer service is listening at 3500');
});