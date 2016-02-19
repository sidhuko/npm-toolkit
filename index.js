#!/usr/bin/env node

// Define dependencies
var parser = require('nomnom')();
var chalk = require('chalk');
var fs = require('fs');
var _ = require('lodash');
var Commands = require('./lib/commands');
var Helpers = require('./lib/helpers');
var config = require('./config');

config.initialise();
// Helpers.ulimit.set(2048);

// Define the Application function
var Application = function () {
  parser
    .option('quiet', {
      abbr: 'q',
      flag: false,
      default: _.get(config, 'userdata.launcher.quietByDefault', false),
      help: 'Quiet mode'
    })
    .option('env', {
      help: 'Variant of the env vars file to load'
    })
    .option('settings', {
      default: _.get(config, 'constants.settingsDir', 'npm-toolkit-rc'),
      help: 'Name of the settings directory'
    // })
    // .option('debug', {
    //   default: false,
    //   help: 'Enable debug mode'
    // })
    // .option('version', {
    //   flag: true,
    //   abbr: 'v',
    //   help: 'Prints version',
    //   callback: function() {
    //     return 'npm-toolkit ' + _.get(config, 'constants.version', '');
    //   }
    });


  // register tasks
  parser.command('status').callback(Commands.status);
  parser.command('list').callback(Commands.list);

  // keeping the "do" command for backwards compatibility.
  // To be phased out in the next minor versions.
  parser.command('do').callback(Commands.do);

  // parser.command('make').callback(Commands.make);

  // parser.command('init')
  //   .callback(Commands.init)
  //   .option('example', {
  //     position: 0,
  //     help: 'Use example data'
  //   });

  parser.command('help').callback(Commands.help);

  // var debug = true;
  var debug = false;
  _.each(Helpers.scanTasks(config.paths.settings), function (fn, name) {
    if (typeof fn === 'function') {
      if (debug) console.log('Registering the "' + name + '" command');
      parser.command(name).callback(fn);
    }
  });


  // Fallback to CLI if no arguments provided
  parser.nocommand().callback(Commands.cli);


  // Run parser and return user input
  return parser.parse();
};


// Execute the application
module.exports = Application();
