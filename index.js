#!/usr/bin/env node

// Define dependencies
var parser = require('nomnom')();
var chalk = require('chalk');
var fs = require('fs');
var os = require('os');
var _ = require('lodash');

// Define constants
var ROOT_DIR = process.cwd(),
    SETTINGS_DIR_NAME = 'npm-toolkit-rc',
    SETTINGS_DIR = [ROOT_DIR, SETTINGS_DIR_NAME].join('/');

// Define globals
var ApplicationArguments;

// Define commands
var Commands = {
  // Prints information about current npm-toolkit setup
  info: function (opts) {
    var displayInfo = !opts.quiet;
    var displayStyle = (displayInfo) ? 'long' : 'short';

    var print = function (label, value, style) {
      if (!style) style = 'long';

      if (style === 'short') {
        console.log(chalk.bold(label + ': ') + value);
      }

      if (style === 'long') {
        console.log(chalk.bold(label + ':\n ') + value + '\n');
      }
    };

    if (displayInfo) Helpers.printHeader();

    print('Current location', ROOT_DIR, displayStyle);
    print('Settings directory location', SETTINGS_DIR, displayStyle);
    print('Hostname', os.hostname(), displayStyle);
    var osString = [os.type(), os.release(), os.arch()].join(' ');
    print('Operating system', osString, displayStyle);
    // node version
    // npm version
    // npm-toolkit version

    if (displayInfo) Helpers.printSummary();
  },

  // Lists the available commands
  list: function (opts) {
    var displayInfo = !opts.quiet;
    var display = (displayInfo) ? 'long' : 'short';
    var availableCommands = Object.keys(Helpers.scanCommands());

    if (displayInfo) Helpers.printHeader();

    if (display === 'long') {
      console.log(chalk.bold(' Available commands:'));
      console.log();

      _.forEach(availableCommands, function (command) {
        console.log(' * do ' + command.toString());
      });
    } else {
      console.log(chalk.bold('Available commands:  ') + availableCommands.join('  '));
    }

    if (displayInfo) Helpers.printSummary();
  },

  // Prints help screen
  help: function (opts) {
    Helpers.printHeader();

    console.log(chalk.bold.underline('TL;DR: npm-toolkit is essentially a fancy "npm run".'));
    console.log('It is written in a simple way to give you the flexibility');
    console.log('to create custom workflows available under multiple interfaces.');
    console.log();
    console.log(chalk.bold.underline('You can run npm-toolkit in three ways:'));
    console.log(' * with an interactive interface (' + chalk.bold('npm-toolkit') + ')');
    console.log(' * execute commands directly (' + chalk.bold('npm-toolkit do [command name]') + ')');
    console.log(' * start a web interface (' + chalk.bold('npm-toolkit web') + ')');
    console.log();
    console.log(chalk.bold.underline('You can also pass the arguments to customise the behaviour:'));
    console.log(' * --quiet=true or --q=true for a less noisy output');
    console.log(' * --settings=[dirname] for a custom settings directory');
    console.log();
    console.log(chalk.bold.underline('More information:'));
    console.log(' * npm-toolkit help: This screen');
    console.log(' * npm-toolkit info: Debug & environment information');
    console.log(' * npm-toolkit list: View available commands');

    Helpers.printSummary();
  },

  // Start the Command Line Interface
  cli: function (opts) {
    var InquirerFactory = require('./lib/inquirer');
    var Inquirer = InquirerFactory(require(SETTINGS_DIR + '/inq-questions'), require(SETTINGS_DIR + '/inq-script'));
    Inquirer.ask();
    // TODO: replace inq-questions: parse commands.json and output it
    // TODO: replace inq-script: write a generic exit script / command launcher
  },

  // Start web interface
  web: function (opts) {
    var displayInfo = !opts.quiet;
    if (displayInfo) Helpers.printHeader();
    if (displayInfo) Helpers.printSummary();

    var port = (opts.port || 9000);
    console.log(' Started a web interface on port ' + port);
    console.log(chalk.grey('  (not really, but I\'ll add it soon)'));

    // TODO: start as a daemon and add support for "npm-toolkit web start|stop|restart"
    //runBrowser('http://localhost:' + port);
  },

  // Act on the task specified
  do: function (opts) {
    var inputCommands = opts._;
    inputCommands.shift();
    var immediateCommand = inputCommands[0];
    var availableCommands = Helpers.scanCommands();
    var commandExists = _.has(availableCommands, immediateCommand);
    var fn, result, displayInfo = !opts.quiet;

    if (commandExists) {
      result = chalk.bold('Executing a task: ') + inputCommands.join(' ');
      fn = _.get(availableCommands, immediateCommand);

      if (immediateCommand === 'log') {
        displayInfo = false;
        result = null;
      }
    } else {
      result = chalk.bold('Task "' + immediateCommand + '" not found.');
    }

    if (displayInfo) Helpers.printHeader();
    if (result) console.log(result);
    if (fn && typeof fn === 'function') fn(opts);
    if (displayInfo) Helpers.printSummary(ApplicationArguments);
  }
};

/**
 * Define helpers
 */
var Helpers = {
  printHeader: function () {
    console.log();
    console.log(chalk.bold('------------- npm-toolkit -------------'));
    console.log();
  },

  printSummary: function (args) {
    console.log();
    console.log(chalk.bold('---------------------------------------'));

    if (args) {
      console.log(args);
      //console.log(chalk.bold('Debug:  ') + !!args.debug);
      //console.log(chalk.bold('Config: ') + args.config);
      console.log(chalk.bold('---------------------------------------'));
      //console.log('Commands: ' + JSON.stringify(args._));
      //console.log('\n\n' + chalk.grey(chalk.underline('npm-toolkit opts:\n') + JSON.stringify(args, null, ' ')) + '\n\n');
    }

    console.log();
  },

  scanCommands: function () {
    var commands = {};
    _.forEach(fs.readdirSync(SETTINGS_DIR + '/commands'), function (el) {
      var item = _.trimRight(el, '.js');
      commands[item] = require(SETTINGS_DIR + '/commands/' + item);
    });

    return commands;
  }
};




// Define the Application function
var Application = function () {
  parser.option('quiet', {
      abbr: 'q',
      flag: false,
      help: 'Quiet mode'
    })
    .option('settings', {
      abbr: 's',
      default: SETTINGS_DIR_NAME,
      help: 'Name of the settings directory'
    })
    .option('version', {
      flag: true,
      abbr: 'v',
      help: 'Prints version',
      callback: function() {
        return 'npm-toolkit 0.0.1';
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
ApplicationArguments = Application();
