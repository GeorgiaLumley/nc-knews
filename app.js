const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const apiRouter = require('./routers/api');

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use('/*', (req, res) => {
  res.status(404).send({ msg: 'no route found' });
});

app.use((err, req, res, next) => {
  if (
    err.code === '23505'
    || err.code === '23502'
    || err.code === '23503'
    || err.status === 400
  ) {
    res.status(400).send({ msg: 'Bad Request' });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.msg === 'Page not found') {
    res.status(404).send({ msg: 'Page not found' });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Internal Server Error' });
});

module.exports = app;
