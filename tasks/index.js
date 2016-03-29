module.exports = {
  // Prints information about current npm-toolkit setup
  status: require('./status'),
  // Lists the available commands
  list: require('./list'),
  // Prints help screen
  help: require('./help'),
  // Start the Command Line Interface
  cli: require('./cli'),
  // Initialise npm-toolkit in current folder
  init: require('./init'),
  // Initialise npm-toolkit in current folder
  version: require('./version')
};
