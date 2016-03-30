#!/usr/bin/env node

var parseCliArgs = require('./lib/parseCliArgs');
var taskDispatcher = require('./lib/dispatcher');

var runningDirectly = (require.main === module);
// Helpers.ulimit.set(2048);

// var chalk = require('chalk');
// var fs = require('fs');
// var _ = require('lodash');
// var Commands = require('./lib/commands');
// var Helpers = require('./lib/helpers');
// var cliInterface = require('./cli');
// var config = require('./config');


// don't do this for nt init or nt install
// var ntrcFound = config.initialise();




// console.log('runningDirectly', runningDirectly);

if (runningDirectly) {
  var args = parseCliArgs();
  return taskDispatcher(args);
} else {
  return module.exports = taskDispatcher;
}
