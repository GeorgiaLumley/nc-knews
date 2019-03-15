const fs = require('fs');

exports.json = (cb) => {
  fs.readFile('./api.json', 'utf8', (error, data) => {
    if (error) {
      cb(error, null);
    } else {
      cb(null, data);
    }
  });
};
