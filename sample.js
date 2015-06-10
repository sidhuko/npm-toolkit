var NpmToolkitFactory = require('./index');
var questions = require('./data/questions');
var script = require('./data/script');

var NpmToolkit = NpmToolkitFactory(questions, script);

NpmToolkit.ask();
