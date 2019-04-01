exports.handle400 = (err, req, res, next) => {
  if (
    err.code === '23502'
    || err.code === '23503'
    || err.code === '22P02'
    || err.status === 400
  ) {
    res.status(400).send({ msg: 'Bad Request' });
  } else {
    next(err);
  }
};

exports.handle404 = (err, req, res, next) => {
  if (err.msg === 'Not Found') {
    res.status(404).send({ msg: 'Not Found' });
  } else {
    next(err);
  }
};
exports.handle405 = (err, req, res, next) => {
  if (err.msg === 'Method Not Allowed') {
    res.status(405).send({ msg: 'Method Not Allowed' });
  } else {
    next(err);
  }
};

exports.handle422 = (err, req, res, next) => {
  if (
    err.msg === 'Unprocessable Entity'
    || err.status === 422
    || err.code === '23505'
  ) {
    res.status(422).send({ msg: 'Unprocessable Entity' });
  } else {
    next(err);
  }
};
exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Internal Server Error' });
};
