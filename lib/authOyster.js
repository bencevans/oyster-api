
/**
 * Module Deps
 */

var basicAuth = require('basic-auth');
var Oyster    = require('oyster');

/**
 * Basic Auth -> Oyster Auth
 * Adds `req.oyster` with instance of `oyster.Oyster` if successful
 * Sends 401 JSON error if auth failed
 * Calls next(err) if unusual errors occur
 */

module.exports = function (req, res, next) {

  var auth = basicAuth(req);

  if(!auth) {
    return res.send(401, { error: 'Authentication Not Provided' });
  }

  req.oyster = Oyster();

  req.oyster.login(auth.name, auth.pass, function(err) {
    if(err) {
      if(err.message === 'Wrong Credentials') {
        return res.send(401, { error: 'Authentication Invalid' });
      } else {
        return next(err);
      }
    } else {
      next();
    }
  });

};