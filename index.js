#!/usr/bin/env node

var parser = require('nomnom')();
var chalk = require('chalk');

var ROOT_DIR = process.cwd();

console.log(chalk.bold('\n\n----------- npm-toolkit -----------'));

var Commands = {
  cli: function (opts) {
    console.log('Starting CLI');
    console.log('Lorem ipsum dolor sit ...');

    var InquirerFactory = require('./lib/inquirer');
    var questions = require(ROOT_DIR + '/data/questions');
    var script = require(ROOT_DIR + '/data/script');

    var Inquirer = InquirerFactory(questions, script);
    Inquirer.ask();

  },
  do: function (opts) {
    var commands = opts._;
    commands.shift();
    console.log(chalk.bold('Executing a task: ') + commands.join(' '));
    console.log('Lorem ipsum dolor sit ...');
  },
  web: function (opts) {
    var port = (opts.port || 9000);
    //runBrowser('http://localhost:' + port);
    console.log('Starting a web interface on port ' + port);
    console.log('Lorem ipsum dolor sit ...');
  }
};

var Helpers = {
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
