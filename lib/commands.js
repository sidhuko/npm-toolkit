module.exports = {
  // Prints information about current npm-toolkit setup
  status: require('./commands/status'),
  // Lists the available commands
  list: require('./commands/list'),
  // Prints help screen
  help: require('./commands/help'),
  // Start the Command Line Interface
  cli: require('./commands/cli'),
  // Start web interface
  web: require('./commands/web'),
  // Act on the task specified
  // do: require('./commands/do'),
  // Creates a file based on template
  make: require('./commands/make'),
  // Initialise npm-toolkit in current folder
  init: require('./commands/init')
};
