#!/usr/bin/env node

// Define dependencies
var parser = require('nomnom')();
var chalk = require('chalk');
var fs = require('fs');
var _ = require('lodash');
var Commands = require('./lib/commands');
var Helpers = require('./lib/helpers');
var config = require('./config');

Helpers.ulimit.set(2048);

// Define the Application function
var Application = function () {
  parser
    .option('quiet', {
      abbr: 'q',
      flag: false,
      default: _.get(config, 'userdata.launcher.quietByDefault', false),
      help: 'Quiet mode'
    })
    .option('settings', {
      abbr: 's',
      default: _.get(config, 'constants.settingsDir', 'npm-toolkit-rc'),
      help: 'Name of the settings directory'
    })
    .option('version', {
      flag: true,
      abbr: 'v',
      help: 'Prints version',
      callback: function() {
        return 'npm-toolkit ' + _.get(config, 'constants.version', '')
      }
    });

  parser.command('web').callback(Commands.web);

  parser.command('do').callback(Commands.do);

  parser.command('make').callback(Commands.make);

  parser.command('status').callback(Commands.status);

  parser.command('info').callback(Commands.status);

  parser.command('list').callback(Commands.list);

  parser.command('init')
    .callback(Commands.init)
    .option('example', {
      position: 0,
      help: 'Use example data'
    });

  parser.command('help')
    .callback(Commands.help);

  parser.nocommand()
    .callback(function (options) {
      Commands.cli();
    })

  // Run parser and return user input
  return parser.parse();
};

// Execute the application
module.exports = Application();
