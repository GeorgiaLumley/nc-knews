exports.methodNotAllowed = (req, res, next) => {
  next({ status: 405, msg: 'Method Not Allowed' }).catch((err) => {
    next(err);
  });
};
