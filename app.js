const express = require('express');
const bodyParser = require('body-parser');
const { handle400, handle404, handle500 } = require('./errors');

const app = express();
const apiRouter = require('./routers/api');

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use('/*', (req, res) => {
  res.status(404).send({ msg: 'no route found' });
});

app.use(handle400);

app.use(handle404);

app.use(handle500);

module.exports = app;
