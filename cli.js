// this is temporarily commented out - will return later

// var parseCliArgs = require('./lib/parseCliArgs');
//
// var cliInterface = function () {
//   console.log('[nt] Custom interface');
//   var args = parseCliArgs();
//   return args;
// }
//
// // var cliSay = function () {}
//
// module.exports = cliInterface;


























// var program = require('commander');
// var _ = require('lodash');
// // var Commands = require('./lib/commands');
// // var Helpers = require('./lib/helpers');
// // var fs = require('fs');
// var config = require('./config');
//
// // config.initialisePaths();
// var cliFunctions = {
//   version: function () {
//     return 'npm-toolkit ' + _.get(config, 'const.version', '');
//   }
// }
//
//
// /* A nearly matching adapter
//  * of the old nomnom implementation
//  */
// var parseCliV1 = function () {
//     program
//       .version(cliFunctions.version())
//       // .usage('nt [task] <options ...>')
//       .option('-q, --quiet', 'Quiet mode')
//       .option('-d, --debug', 'Enable debug mode')
//       .option('-e, --env [set]', 'Load specifiet set of env variables')
//       .option('-c, --config [dir]', 'Location of nt config (ntrc) directory');
//
//
//     // default: _.get(config, 'settings.local.quiet', false)
//     // default: _.get(config, 'settings.local.debug', false)
//     // default: _.get(config, 'const.settingsDir', './ntrc')
//
//     // register main commands
//     program.command('status').action(Commands.status);
//     program.command('list').action(Commands.list);
//     program.command('init').action(Commands.init);
//     program.command('help').action(Commands.help);
//
//     // program.on('--help', function(){
//     //   console.log('  Examples:');
//     //   console.log('');
//     //   console.log('    nt list -v');
//     //   Commands.help();
//     // });
//
//
//
//     // .command('rmdir <dir> [otherDirs...]')
//     // .action(function (dir, otherDirs) {
//     //   console.log('rmdir %s', dir);
//     // });
//
//
//     var debug = false;
//
//     if (ntrcFound) {
//       _.each(Helpers.scanTasks(config.resolved.ntrc), function (fn, name) {
//         if (typeof fn === 'function') {
//           if (debug) console.log('[nt] Registering the "' + name + '" command');
//           program.command(name).action(fn);
//         }
//       });
//       console.log('[nt] Finished registering tasks');
//     }
//
//     // Fallback to CLI if no arguments provided
//     // program.nocommand().callback(Commands.cli);
//     // program.arguments('<cmd>').action(function (cmd) {
//     //   console.log('cmd', cmd);
//     //   if (!cmd) {
//     //     return Commands.cli();
//     //   }
//     // });
//
//     // Run program and return user input
//     return program.parse(process.argv);
// };
//
//
//
// /* Specify multiple options
//  * Last example from https://www.npmjs.com/package/commander
//  */
// var parseCliV2Example = function () {
//   // if (!process.argv.slice(2).length) {
//   //   program.outputHelp(make_red);
//   // }
//
//   program
//     .command('setup [env]')
//     .description('run setup commands for all envs')
//     .option("-s, --setup_mode [mode]", "Which setup mode to use")
//     .action(function(env, options){
//       var mode = options.setup_mode || "normal";
//       env = env || 'all';
//       console.log('setup for %s env(s) with %s mode', env, mode);
//     });
//
//   program
//     .command('exec <cmd>')
//     .alias('ex')
//     .description('execute the given remote cmd')
//     .option("-e, --exec_mode <mode>", "Which exec mode to use")
//     .action(function(cmd, options){
//       console.log('exec "%s" using %s mode', cmd, options.exec_mode);
//     }).on('--help', function() {
//       console.log('  Examples:');
//       console.log();
//       console.log('    $ deploy exec sequential');
//       console.log('    $ deploy exec async');
//       console.log();
//     });
//
//   program
//     .command('*')
//     .action(function(env){
//       console.log('deploying "%s"', env);
//     });
//
//   return program.parse(process.argv);
// }
//
// /* Variadic arguments
//  * Example from https://www.npmjs.com/package/commander
//  */
// var parseCliV3Example = function () {
//   program
//   .command('rmdir <dir> [otherDirs...]')
//   .action(function (dir, otherDirs) {
//     console.log('rmdir %s', dir);
//     if (otherDirs) {
//       otherDirs.forEach(function (oDir) {
//         console.log('rmdir %s', oDir);
//       });
//     }
//   });
//
//   return program.parse(process.argv);
// }
//
//
// /**
//  * New universal task aggregator
//  *
//  * Parses the input args and returns an object
//  * The object contains keys: task, args, options
//  *
//  * @param {string} title - The title of the book.
//  * @param {string} author - The author of the book.
//  * @return {object}
//  */
// var universalParser = function () {
//   var rtn = {
//     task: null,
//     args: [],
//     opts: []
//   };
//
//   // program
//   //   .command('setup [env]')
//   //   .description('run setup commands for all envs')
//   //   .option("-s, --setup_mode [mode]", "Which setup mode to use")
//   //   .action(function(env, options){
//   //     var mode = options.setup_mode || "normal";
//   //     env = env || 'all';
//   //     console.log('setup for %s env(s) with %s mode', env, mode);
//   //   });
//
//   program
//     .option('-pep', 'Pep Flag mode');
//
//   program
//     .command('*')
//     .action(function(task, arg1, arg2, opt1, opt2) {
//       // console.log('Executing task "%s"', task, arg1, arg2, opt1, opt2);
//
//       rtn.task = task;
//       rtn.args.push(arg1);
//       rtn.args.push(arg2);
//       rtn.opts.push(opt1);
//       rtn.opts.push({key: opt2});
//     });
//
//   program.parse(process.argv);
//
//   if (program.pep) console.log('  - peppers');
//
//   console.log(program.parseOptions());
//
//
//
//   console.log('parsed', rtn)
//   return;
// }
