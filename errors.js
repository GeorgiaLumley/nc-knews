exports.handle400 = (err, req, res, next) => {
  if (
    err.code === '23505'
    || err.code === '23502'
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
  if (err.msg === 'Page not found') {
    res.status(404).send({ msg: 'Page not found' });
  } else {
    next(err);
  }
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};
