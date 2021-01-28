const errorHandle = async (err, req, res, next) => {
  // set status code

  const errorStatusCode = res.statusCode === 200 ? 700 : res.statusCode;
  res.status(errorStatusCode);
  res.json({
    message: err.message,
  });
  next();
};
module.exports = { errorHandle };
