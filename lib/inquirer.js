var _ = require('lodash');
var inquirer = require('inquirer');

/**
 * Define default questions
 */
var defaultQuestions = {
  restart: {
    name: "restart",
    type: "confirm",
    message: "Restart this prompt? (yes)",
    default: false
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
  console.log('\n -- npm-toolkit: Default script --');
  console.log(JSON.stringify(answers, null, "  "));
};

/**
 * Define default script to ask your questions
 */
var defaultAskFn = function (questions) {
  var self = NpmToolkit;
  questions = (questions || self.questions.main);
  inquirer.prompt(questions, self.script);
};

/**
 * Define default values
 */
var defaults = {
  process: defaultProcessFn,
  questions: defaultQuestions,
  ask: defaultAskFn
};

/**
 * Define the main NpmToolkit object
 */
var NpmToolkit = {
  config: {},
  questions: [],
  answers: [],
  queue: [],
  script: defaults.process,
  ask: defaults.ask
};

module.exports = function (questions, script) {
  var instance = NpmToolkit;
  instance.questions = (questions || instance.questions);
  instance.script = (script || instance.script);

  return instance;
};
