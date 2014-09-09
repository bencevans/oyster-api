
var http         = require('http');
var express      = require('express');
var poweredBy    = require('poweredby');
var morgan       = require('morgan');
var errorHandler = require('./lib/errorHandler');
var authOyster   = require('./lib/authOyster');
var app          = express();

app.set('port', process.env.PORT || 3000);
app.use(poweredBy('Slow Crawly Things'));
app.use(morgan('dev'));

app.get('/', function(req, res, next) {
  res.redirect('https://github.com/bencevans/oyster-api');
});

app.get('/valid_auth', authOyster, function(req, res) {
  res.send({ valid_auth: true });
});

app.get('/balance', authOyster, function(req, res) {
  req.oyster.balance(function(err, balance) {
    if(err) {
      return next(err);
    }
    res.send({
      balance: parseFloat(balance)
    });
  });
});

app.use(errorHandler);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Oyster API listening on port ' + app.get('port'));
});
