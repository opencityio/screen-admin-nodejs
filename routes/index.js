/*jslint node: true*/
'use strict';

var app = global.app,
    heartbeat       = function(req, res) { res.status(200).end(); },
    fileNotFound    = function(req, res) {
      res.status(404).send('404');
    };


// Heartbeat
app.get('/heartbeat', heartbeat);

// Authentication
var auth = require('http-auth');
var basic = auth.basic({
  realm: 'Open City'
}, function (username, password, callback) { // Custom authentication method.
  callback(username === 'OpenCity' && password === 'test');
});

app.use(auth.connect(basic));

app.get('/', function(req, res){
  res.send('Index');
});

// 404 if no file or route is found
app.use(fileNotFound)
