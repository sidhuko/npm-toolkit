var _ = require('lodash');
var inquirer = require('inquirer');

var NpmToolkit = {
  config: {},
  questions: [],
  answers: [],
  queue: [],
  script: function (answers) {
    console.log(JSON.stringify(answers, null, "  "));
  },
  ask: function (questions) {
    var self = this;
    if (!questions) {
      questions = _.cloneDeep(self.questions.main);
      questions.push(self.questions._restart);
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
