module.exports = {
  // Prints information about current npm-toolkit setup
  status: require('./commands/status'),
  // Lists the available commands
  list: require('./commands/list'),
  // Prints help screen
  help: require('./commands/help'),
  // Start the Command Line Interface
  cli: require('./commands/cli'),
  // Initialise npm-toolkit in current folder
  init: require('./commands/init')
};
