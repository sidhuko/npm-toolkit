var _ = require('lodash');
var NpmToolkitFactory = require('../index');
var NpmToolkit = NpmToolkitFactory();

var MyScript = function (answers) {
  var queue = NpmToolkit.queue;
  var questions = NpmToolkit.questions;

  console.log(' // Answers: ' + JSON.stringify(answers));
  //prepare answers.main + answer.opts
  //queue.push(answers);


  if (!!answers.restart) {
    var myQueue = _.cloneDeep(questions.main);
    myQueue.push(questions._restart);
    return NpmToolkit.ask(myQueue);
  }

  //if (answers) {
    //var last = answers.length - 1;
    //return NpmToolkit.ask(answers);
    //return NpmToolkit.ask(questions.main);
  //}

  //console.log("Chosen tasks: ", queue.join(", "));

};

module.exports = MyScript;
