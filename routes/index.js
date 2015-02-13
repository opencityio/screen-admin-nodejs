/*jslint node: true*/
'use strict';

var app = global.app,
    heartbeat       = function(req, res) { res.status(200).end(); },
    fileNotFound    = function(req, res) {
      res.status(404).send('404');
    };

// Heartbeat
app.get('/heartbeat', heartbeat);

// 404 if no file or route is found
app.use(fileNotFound)
