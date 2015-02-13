/*jslint node: true */
'use strict';

require('colors');

var forever = require('forever-monitor'),
child = new (forever.Monitor)('server.js');

child.on('start', function(/*process, data*/) {
  console.info('Started process using forever'.bold.green);
});

child.on('watch:restart', function(info) {
  console.error('Restaring script because ' + info.file + ' changed');
});

child.on('restart', function() {
  console.error('Forever restarting script for ' + child.times + ' time');
});

child.on('exit:code', function(code) {
  console.error('Forever detected script exited with code ' + code);
});

child.start();
