#!/usr/bin/env node

// Define dependencies
var parser = require('nomnom')();
var chalk = require('chalk');
var fs = require('fs');
var _ = require('lodash');
var Commands = require('./lib/commands');
var Helpers = require('./lib/helpers');
var config = require('./config');

// Define the Application function
var Application = function () {
  parser.option('quiet', {
      abbr: 'q',
      flag: false,
      default: !!config.userdata.launcher.quietByDefault,
      help: 'Quiet mode'
    })
    .option('settings', {
      abbr: 's',
      default: config.constants.settingsDir,
      help: 'Name of the settings directory'
    })
    .option('version', {
      flag: true,
      abbr: 'v',
      help: 'Prints version',
      callback: function() {
        return 'npm-toolkit ' + config.constants.version;
      }
    });

  //TODO: add ulimit -n 2048 for 'cli' and 'do' commands
  parser.command('')
    .callback(Commands.cli);

  parser.command('web')
    .callback(Commands.web);

  parser.command('do')
    .callback(Commands.do);

  parser.command('make')
    .callback(Commands.make);

  parser.command('info')
    .callback(Commands.info);

  parser.command('list')
    .callback(Commands.list);

  parser.command('init')
    .callback(Commands.init)
    .option('example', {
      abbr: 'e',
      flag: false,
      help: 'Use example data'
    });

  parser.command('help')
    .callback(Commands.help);

  // Run parser and return user input
  return parser.parse();
};

// Execute the application
var ApplicationArguments = Application();

module.exports = {
  config: config,
  commands: Commands,
  helpers: Helpers
};
