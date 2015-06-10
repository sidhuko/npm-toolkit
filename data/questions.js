var inquirer = require('inquirer');
var questions = {};


questions.main = [{
  type: "list",
  name: "main",
  message: "What do you want to do?",
  choices: [
    "1 Start app",
    "2 Start watchers",
    "3 Watch logs",
    "4 Start Node Inspector",
    "",
    "5 Run linter",
    "6 Run unit tests",
    "",
    "7 SVN status",
    "8 SVN commit",
    "9 Publish modules",
    new inquirer.Separator(),
    "X1 Application setup",
    "X2 System status",
    ""
  ]
}];

questions.size = [{
  type: "list",
  name: "size",
  message: "What size do you need",
  choices: ["Large", "Standard", "Medium", "Small"],
  filter: function (val) { return val.toLowerCase(); }
}];

questions._restart = {
  type: "confirm",
  name: "restart",
  message: "Restart this prompt? (yes)",
  default: true
};

module.exports = questions;
