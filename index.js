#!/usr/bin/env node

var parser = require('nomnom')();
var chalk = require('chalk');
var fs = require('fs');
var _ = require('lodash');
var Commands = require('./lib/commands');
var Helpers = require('./lib/helpers');
var config = require('./config');

var ntrcFound = config.initialise();
// Helpers.ulimit.set(2048);

// Define the Application function
var Application = function () {
  parser
    .option('quiet', {
      abbr: 'q',
      flag: true,
      default: _.get(config, 'settings.local.quiet', false),
      help: 'Quiet mode'
    })
    .option('debug', {
      abbr: 'd',
      default: _.get(config, 'settings.local.debug', false),
      flag: true,
      help: 'Enable debug mode'
    })
    .option('env', {
      abbr: 'e',
      help: 'Env variables file to load'
    })
    .option('config', {
      abbr: 'c',
      default: _.get(config, 'const.settingsDir', './ntrc'),
      help: 'Location of nt config (ntrc) directory'
    })
    .option('version', {
      flag: true,
      abbr: 'v',
      help: 'Prints version',
      callback: function() {
        return 'npm-toolkit ' + _.get(config, 'const.version', '');
      }
    });


  // register tasks
  parser.command('status').callback(Commands.status);
  parser.command('list').callback(Commands.list);
  parser.command('init').callback(Commands.init);
  parser.command('help').callback(Commands.help);

  // helpers.processFlags here to bind?

  // var debug = true;
  var debug = false;

  if (ntrcFound) {
    _.each(Helpers.scanTasks(config.resolved.ntrc), function (fn, name) {
      if (typeof fn === 'function') {
        if (debug) console.log('Registering the "' + name + '" command');
        parser.command(name).callback(fn);
      }
    });
    console.log('Finished registering tasks');
  }

  // Fallback to CLI if no arguments provided
  parser.nocommand().callback(Commands.cli);


  // Run parser and return user input
  return parser.parse();
};


// Execute the application
module.exports = Application();
