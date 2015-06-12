#!/usr/bin/env node

// Define dependencies
var parser = require('nomnom')();
var chalk = require('chalk');
var fs = require('fs');
var _ = require('lodash');
var Commands = require('./lib/commands');
var Helpers = require('./lib/helpers');
var Constants = require('./constants');

// Define the Application function
var Application = function () {
  parser.option('quiet', {
      abbr: 'q',
      flag: false,
      help: 'Quiet mode'
    })
    .option('settings', {
      abbr: 's',
      default: Constants.SETTINGS_DIR_NAME,
      help: 'Name of the settings directory'
    })
    .option('version', {
      flag: true,
      abbr: 'v',
      help: 'Prints version',
      callback: function() {
        return 'npm-toolkit ' + Constants.NPM_TOOLKIT_VERSION;
      }
    });

  parser.command('')
    .callback(Commands.cli);

  parser.command('web')
    .callback(Commands.web);

  parser.command('do')
    .callback(Commands.do);

  parser.command('info')
    .callback(Commands.info);

  parser.command('list')
    .callback(Commands.list);

  parser.command('help')
    .callback(Commands.help);

  // Run parser and return user input
  return parser.parse();
};

// Execute the application
var ApplicationArguments = Application();
