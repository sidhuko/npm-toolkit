// module.exports = {
//   // Prints information about current npm-toolkit setup
//   status: {
//     fn: require('./status'),
//     triggerCmdSyntax: 'status',
//     triggerCmdAliases: ['s'],
//     description: 'Displays diagnostic status information',
//     // usage: require('./status.def.js')
//   },
//   // Print out version
//   version: {
//     fn: require('./version'),
//     triggerCmdSyntax: ['v', 'version'],
//     triggerCmdAliases: ['v', 'version'],
//     description: 'Displays diagnostic status information',
//     usage: ''
//   },
//   // Prints help screen
//   help: {
//     fn: require('./help'),
//     triggerCmdSyntax: 'help [task]',
//     triggerCmdAliases: ['h'],
//     description: 'Displays diagnostic status information'
//   },
//
//   // Lists the available commands
//   list: {
//     fn: require('./list'),
//     triggerCmdSyntax: 'list',
//     triggerCmdAliases: ['ls'],
//     description: 'Lists detected commands'
//   },
//
//   // Initialise npm-toolkit in current folder
//   init: {
//     // fn: require('./init')
//     fn: require('./init'),
//     triggerCmdSyntax: 'init --link --save',
//     triggerCmdAliases: [],
//     description: 'Initialises ntrc folder in current folder and installs nt locally.',
//     usage: [
//       '--link will create a link to local instance instead (useful for development)',
//       '-v for verbose, etc...'
//     ],
//     // help: require('./init').help()
//   },
//   // Install npm-toolkit in current folder (without touching ntrc folder)
//   // install: {
//   //   fn: require('./install')
//   //   triggerCmdSyntax: 'install --link --save',
//   //   triggerCmdAliases: [],
//   //   description: 'Installs npm-toolkit locally',
//   //   usage: '-d for debug, -v for verbose, etc...'
//   // },
//   // imports tasks (from Grunt, Gulp and npm scripts)
//   // import: {
//   //   fn: require('./import')
//   //   triggerCmdSyntax: ['import [sourceFile]'],
//   //   triggerCmdAliases: [],
//   //   description: 'Imports external tasks',
//   //   usage: '-d for debug, -v for verbose, etc...'
//   // }
//
//
//   // Start the Command Line Interface
//   // cli: require('./cli'),
// };
