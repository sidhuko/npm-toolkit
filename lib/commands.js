var _ = require('lodash');
var chalk  = require('chalk');
var os = require('os');
var Helpers = require('./helpers');
var Constants = require('../constants');

module.exports = {
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

    print('Current location', Constants.ROOT_DIR, displayStyle);
    print('Settings directory location', Constants.SETTINGS_DIR, displayStyle);
    print('Hostname', os.hostname(), displayStyle);
    var osString = [os.type(), os.release(), os.arch()].join(' ');
    print('Operating system', osString, displayStyle);
    print('Node version', process.version, displayStyle);
    print('npm-toolkit version', Constants.NPM_TOOLKIT_VERSION, displayStyle);

    if (displayInfo) Helpers.printSummary();
  },

  // Lists the available commands
  list: function (opts) {
    var displayInfo = !opts.quiet;
    var display = (displayInfo) ? 'long' : 'short';
    var availableCommands = Object.keys(Helpers.scanCommands(Constants.SETTINGS_DIR));

    if (displayInfo) Helpers.printHeader();

    if (display === 'long') {
      console.log(chalk.bold(' Available commands:'));
      console.log();

      _.forEach(availableCommands, function (command) {
        console.log(' * ' + command.toString());
      });

      console.log();
      console.log('You can run them by typing npm-toolkit do [command]');

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
    var NTInterfaceCLIFactory = require('./NTInterfaceCLI');
    var NTInterfaceCLI = NTInterfaceCLIFactory(require(Constants.SETTINGS_DIR + '/inq-questions'), require(Constants.SETTINGS_DIR + '/inq-script'));
    NTInterfaceCLI.ask();
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
    var availableCommands = Helpers.scanCommands(Constants.SETTINGS_DIR);
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
    //if (displayInfo) Helpers.printSummary(ApplicationArguments);
    if (displayInfo) Helpers.printSummary();
  }
};
