var app = require('express')()
var Mailer = require('./mailer')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.post('/sendmail', (req, res) => {
  try {
    if (Mailer.dispatch(req.body)) {
      res.json({ sent: true }).status(200);
      return
    }
    res.json({ error: 'Something went wrong'}).status(500)
  }
  catch(err) {
    res.json({ error: err.message}).status(500)
  }
})


app.listen(3500, () => {
  console.log('Mailer service is listening at 3000')
})
