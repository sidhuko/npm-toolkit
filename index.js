#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var fs = require('fs');
var _ = require('lodash');
var Commands = require('./lib/commands');
var Helpers = require('./lib/helpers');
var config = require('./config');

// don't do this for nt init or nt install
var ntrcFound = config.initialise();

// Helpers.ulimit.set(2048);

var returnNtVersion = function () {
  return 'npm-toolkit ' + _.get(config, 'const.version', '');
};

// Define the Application function
var Application = function () {
  console.log(chalk.grey('[nt] Commander interface'));
  program
    .version(returnNtVersion())
    // .usage('nt [task] <options ...>')
    .option('-q, --quiet', 'Quiet mode')
    .option('-d, --debug', 'Enable debug mode')
    .option('-e, --env [set]', 'Load specifiet set of env variables')
    .option('-c, --config [dir]', 'Location of nt config (ntrc) directory');



  // default: _.get(config, 'settings.local.quiet', false)
  // default: _.get(config, 'settings.local.debug', false)
  // default: _.get(config, 'const.settingsDir', './ntrc')

  // register main commands
  program.command('status').action(Commands.status);
  program.command('list').action(Commands.list);
  program.command('init').action(Commands.init);
  program.command('help').action(Commands.help);

  // program.on('--help', function(){
  //   console.log('  Examples:');
  //   console.log('');
  //   console.log('    nt list -v');
  //   Commands.help();
  // });



  // .command('rmdir <dir> [otherDirs...]')
  // .action(function (dir, otherDirs) {
  //   console.log('rmdir %s', dir);
  // });


  var debug = false;

  if (ntrcFound) {
    _.each(Helpers.scanTasks(config.resolved.ntrc), function (fn, name) {
      if (typeof fn === 'function') {
        if (debug) console.log('[nt] Registering the "' + name + '" command');
        program.command(name).action(fn);
      }
    });
    console.log('[nt] Finished registering tasks');
  }

  // Fallback to CLI if no arguments provided
  // program.nocommand().callback(Commands.cli);
  // program.arguments('<cmd>').action(function (cmd) {
  //   console.log('cmd', cmd);
  //   if (!cmd) {
  //     return Commands.cli();
  //   }
  // });

  // Run program and return user input
  return program.parse(process.argv);
};


// Execute the application
module.exports = Application();
