var _ = require('lodash');
var inquirer = require('inquirer');

/**
 * Define default questions
 */
var defaultScreens = {
  restart: {
    name: "restart",
    type: "confirm",
    message: "Restart this prompt? (yes)",
    default: false
  },
  quit: {
    name: "quit",
    type: "confirm",
    message: "Do you want to quit? (yes)",
    default: true
  },
  size: {
    name: "size",
    type: "list",
    message: "What size do you need",
    choices: ["Large", "Standard", "Medium", "Small"],
    filter: function (val) {
      return val.toLowerCase();
    }
  }
};

/**
 * Define default script to process user's choices
 */
var defaultProcessFn = function (answers) {
  console.log('\n -- npm-toolkit: Default script (just prints out the input) --');
  console.log(JSON.stringify(answers, null, "  "));
};

/**
 * Define default script to ask your questions
 */
var defaultAskFn = function (screens) {
  questions = (screens || NpmToolkit.screens.main);
  inquirer.prompt(questions, NpmToolkit.script);
};

/**
 * Define default values
 */
var defaults = {
  process: defaultProcessFn,
  screens: defaultScreens,
  ask: defaultAskFn
};

/**
 * Define the main NpmToolkit object
 */
var NpmToolkit = {
  config: {},
  screens: [],
  answers: [],
  queue: [],
  script: defaults.process,
  ask: defaults.ask
};

module.exports = function (screens, script) {
  var instance = NpmToolkit;
  instance.screens = (screens || instance.screens);
  instance.script = (script || instance.script);

  return instance;
};
