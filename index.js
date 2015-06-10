var _ = require('lodash');
var inquirer = require('inquirer');

var NpmToolkit = {
  config: {},
  questions: [],
  answers: [],
  queue: [],
  script: function (answers) {
    // a poor default handler
    console.log(' -- default script --');
    console.log(JSON.stringify(answers, null, "  "));
  },
  ask: function (questions) {
    var self = this;
    if (!questions) {
      questions = self.questions.main;
    }
    inquirer.prompt(questions, self.script);
  }
};

module.exports = function (questions, script) {
  var instance = NpmToolkit;
  instance.questions = (questions || instance.questions);
  instance.script = (script || instance.script);

  return instance;
};
