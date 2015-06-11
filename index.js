#!/usr/bin/env node

var ROOT_DIR = process.cwd(),
    SETTINGS_DIR_NAME = 'npm-toolkit-rc',
    SETTINGS_DIR = [ROOT_DIR, SETTINGS_DIR_NAME].join('/');

var parser = require('nomnom')();
var chalk = require('chalk');
var fs = require('fs');
var _ = require('lodash');




console.log(chalk.bold('\n\n----------- npm-toolkit -----------'));

var Commands = {
  cli: function (opts) {
    console.log('Starting CLI');
    console.log('Lorem ipsum dolor sit ...');

    var InquirerFactory = require('./lib/inquirer');
    var Inquirer = InquirerFactory(require(SETTINGS_DIR + '/inq-questions'), require(SETTINGS_DIR + '/inq-script'));
    Inquirer.ask();
  },
  do: function (opts) {
    var availableCommands = Helpers.scanCommands();
    var inputCommands = opts._;
    inputCommands.shift();
    var immediateCommand = inputCommands[0];
    var commandExists = _.has(availableCommands, immediateCommand);

    if (commandExists) {
      console.log(chalk.bold('Executing a task: ') + inputCommands.join(' '));
      var fn = _.get(availableCommands, immediateCommand);
      fn(opts);
    } else {
      console.log(chalk.bold('Task "' + immediateCommand + '" not found.'));
      console.log('Lorem ipsum dolor sit ...');
    }


  },
  web: function (opts) {
    var port = (opts.port || 9000);
    //runBrowser('http://localhost:' + port);
    console.log('Starting a web interface on port ' + port);
    console.log('Lorem ipsum dolor sit ...');
  }
};

var Helpers = {
  scanCommands: function () {
    var commands = {};
    _.forEach(fs.readdirSync(SETTINGS_DIR + '/commands'), function (el) {
      var item = _.trimRight(el, '.js');
      commands[item] = require(SETTINGS_DIR + '/commands/' + item);
    });

    return commands;
    //require(SETTINGS_DIR + '/commands/log')();
  },
  parseOptions: function () {
    parser.option('debug', {
        abbr: 'd',
        flag: true,
        help: 'Print debugging info'
      })
      .option('config', {
        abbr: 'c',
        default: 'config.json',
        help: 'JSON file with tests to run'
      })
      .option('version', {
        flag: true,
        help: 'print version and exit',
        callback: function() {
          return "version 0.0.1";
        }
      });

    parser.command('')
      .callback(Commands.cli)
      .help('launches interactive CLI');

    parser.command('web')
      .callback(Commands.web)
      .help('Starts a web interface for npm-toolkit');

    parser.command('do')
      .callback(Commands.do)
      .help('executes a command');

    return parser.parse();
  }
};

var Application = function () {
  var opts = Helpers.parseOptions();

  console.log(chalk.bold('\n-----------------------------------'));
  console.log(chalk.bold('Debug:  ') + !!opts.debug);
  console.log(chalk.bold('Config: ') + opts.config);
  console.log(chalk.bold('-----------------------------------\n\n'));


  //console.log('Commands: ' + JSON.stringify(opts._));
  //console.log('\n\n' + chalk.grey(chalk.underline('npm-toolkit opts:\n') + JSON.stringify(opts, null, ' ')) + '\n\n');
};





Application();


//module.exports = require('./lib/inquirer');
