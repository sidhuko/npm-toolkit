var _ = require('lodash');
var inquirer = require('inquirer');
var defaultQuestions = require('../default.questions');

var defaults = {
  script: function (answers) {
    console.log('\n -- npm-toolkit: Default script --');
    console.log(JSON.stringify(answers, null, "  "));
  },
  questions: defaultQuestions
};

var NpmToolkit = {
  config: {},
  questions: [],
  answers: [],
  queue: [],
  script: defaults.script,
  ask: function (questions) {
    var self = this;
    questions = (questions || self.questions.main);
    inquirer.prompt(questions, self.script);
  }
};

module.exports = function (questions, script) {
  var instance = NpmToolkit;
  instance.questions = (questions || instance.questions);
  instance.script = (script || instance.script);

  return instance;
};
