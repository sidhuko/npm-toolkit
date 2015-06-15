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
 * Define the main NTInterfaceCLI object
 */
var NTInterfaceCLI = {
  screens: defaultScreens,
  answers: [],
  script: function (answers) {
    console.log('\n -- npm-toolkit: Default script (just prints out the input) --');
    console.log(JSON.stringify(answers, null, "  "));
  },
  ask: function (screen) {
    screen = screen || 'main';
    questions = (NTInterfaceCLI.screens[screen] || NTInterfaceCLI.screens.main);
    inquirer.prompt(questions, NTInterfaceCLI.script);
  }
};

module.exports = function (screens, script) {
  var instance = NTInterfaceCLI;
  // instance.screens = (_.merge({}, defaultScreens, screens) || instance.screens);
  // instance.script = (script || instance.script);
  instance.screens = _.merge({}, defaultScreens, screens);
  instance.script = script;

  return instance;
};

module.exports.helpers = {
  separator: new inquirer.Separator('---')
};
