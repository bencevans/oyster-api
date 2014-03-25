
var assert  = require('assert');
var request = require('request').defaults({ json: true });

require('./app');

var validAuth = {
  username: process.env.OYSTER_USER,
  password: process.env.OYSTER_PASS
};

function url(path) {
  return require('url').resolve('http://localhost:3000', path);
}

describe('/valid_auth', function() {

  describe('Invalid', function() {
    it('should return 401 & message', function(done) {
      request({
        uri: url('/valid_auth'),
        auth: {
          user: 'email@rawr.com',
          pass: 'turbothis',
          sendImmediately: true
        }
      }, function(err, res, body) {
        assert.ifError(err);
        assert.equal(res.statusCode, 401);
        assert.equal(body.error, 'Authentication Invalid');
        done();
      });
    });
  });

  describe('Missing', function() {
    it('should return 401 & message', function(done) {
      request(url('/valid_auth'), function(err, res, body) {
        assert.ifError(err);
        assert.equal(res.statusCode, 401);
        assert.equal(body.error, 'Authentication Not Provided');
        done();
      });
    });
  });

  describe('Correct', function() {
    it('should return 200 & valid_auth=true', function(done) {
      request({
        uri: url('/valid_auth'),
        auth: validAuth
      }, function(err, res, body) {
        assert.ifError(err);
        assert.equal(res.statusCode, 200);
        assert.equal(body.valid_auth, true);
        done();
      });
    });
  });

});

describe('/balance', function() {

  describe('Correct', function() {
    it('should return 200 & balance', function(done) {
      request({
        uri: url('/balance'),
        auth: validAuth
      }, function(err, res, body) {
        assert.ifError(err);
        assert.equal(res.statusCode, 200);
        assert.equal(typeof body.balance, 'number');
        done();
      });
    });
  });

});