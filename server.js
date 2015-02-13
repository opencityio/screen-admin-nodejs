/*jslint node: true*/
'use strict';

/* istanbul ignore else */
if (process.env.NEWRELIC_LICENSE) {
  global.newrelic = require('newrelic');
}

var nconf        = require('nconf'),
    environment  = process.env.NODE_ENV || 'development',
    express      = require('express'),
    app          = express(),
    gaikan       = require('gaikan');

require('colors');

// Load configuration data
nconf
  .argv()
  .env()
  .file('local', 'config/local.json')
  .file('user', 'config/' + environment + '.json')
  .file('global', 'config/global.json')
  .file('package', 'package.json')
  .set('ENVIRONMENT', environment);

global.app = app;
global.nconf = nconf;
global.express = express;

// Set templating engine
gaikan.options.enableCache = false;
gaikan.options.enableCompression = false;
gaikan.options.directories = ['frontend/views'];
app.set('views', [process.cwd() + '/frontend/views']);
app.set('view engine', '.html');
app.engine('html', gaikan);

// Determine IP Address through proxy
app.enable('trust proxy');

// Setup routes
require('./routes');

// Start server
var server = app.listen(nconf.get('PORT'), function() {
  console.log('Server running on port %d'.bold.green, server.address().port);
});

module.exports.server = server;
