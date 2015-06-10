var _ = require('lodash');
var NpmToolkitFactory = require('../index');
var NpmToolkit = NpmToolkitFactory();

var MyScript = function (answers) {
  console.log(' -- loaded custom script: MyScript --');
  var queue = NpmToolkit.queue;
  //var questions = NpmToolkit.questions;


  //prepare answers.main + answer.opts
  _.forEach(answers, function (answer) {
      queue.push(answer);
  });



  if (!!answers.restart) {
    console.log('restarting');
    return NpmToolkit.ask();
  }

  //if (answers) {
    //var last = answers.length - 1;
    //return NpmToolkit.ask(answers);
    //return NpmToolkit.ask(questions.main);
  //}


if (!answers.restart) {
  console.log('\n\nnot restarting - final output');
  //console.log("Chosen tasks: ", queue.join(", "));
  console.log(' // Answers: ' + JSON.stringify(answers));
  console.log(' // Queued:  ' + JSON.stringify(queue));
}


};

module.exports = MyScript;
