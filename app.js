const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const apiRouter = require('./routers/api');

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
});

module.exports = app;
