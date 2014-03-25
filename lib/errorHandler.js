
module.exports = function(err, req, res, next) {
  res.send(500, { error: 'Internal Server Error' });
  console.error(err.stack);
};