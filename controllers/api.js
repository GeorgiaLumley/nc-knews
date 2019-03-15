const { json } = require('../models/api');

exports.apiInfo = (req, res, next) => {
  json((err, data) => {
    if (err) {
      next({ msg: 'Page not found' });
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
};
