var inquirer = require('inquirer');
var questions = {};

/**
 */
questions._restart = {
  type: "confirm",
  name: "restart",
  message: "Restart this prompt? (yes)",
  default: true
};

/**
 */
questions._main = {
  type: "list",
  name: "main",
  message: "What do you want to do?",
  choices: [
    //new inquirer.Separator(),
    "Start app",
    "Start watchers",
    "Watch logs",
    "Start Node Inspector",
    new inquirer.Separator(),
    "Run linter",
    "Run unit tests",
    new inquirer.Separator(),
    "SVN status",
    "SVN commit",
    "Publish modules",
    new inquirer.Separator(),
    "X1 Application setup",
    "X2 System status",
    new inquirer.Separator(),
    "Exit"
  ]
};

/**
 */
questions.size = [{
  type: "list",
  name: "size",
  message: "What size do you need",
  choices: ["Large", "Standard", "Medium", "Small"],
  filter: function (val) { return val.toLowerCase(); }
}];

/**
 */
questions.main = [questions._main, questions._restart];

module.exports = questions;
