#!/usr/bin/env node

// var cliInterface = require('./cli');
var taskDispatcher = require('./lib/dispatcher');

var runningDirectly = !module.parent;
var parseCliArgs = require('./lib/parseCliArgs');
// Helpers.ulimit.set(2048);

// var chalk = require('chalk');
// var fs = require('fs');
// var _ = require('lodash');
// var Commands = require('./lib/commands');
// var Helpers = require('./lib/helpers');
// var config = require('./config');


// don't do this for nt init or nt install
// var ntrcFound = config.initialise();




// console.log('runningDirectly', runningDirectly);

if (runningDirectly) {
  var args = parseCliArgs();
  return taskDispatcher(args);
} else {
  module.exports = taskDispatcher;
}
