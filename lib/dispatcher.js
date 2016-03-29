var _ = require('lodash');
var SystemTasks = require('../tasks');
// var Helpers = require('./helpers');
// var fs = require('fs');
// var config = require('./config');

// config.initialisePaths();



/* A nearly matching adapter
 * of the old nomnom implementation
 */
// TODO: fluffy match
var dispatcher = function (args) {
  // console.log(args);
  if (args.task === 'version') {
    console.log(SystemTasks.version());
  }
  if (args.task === 'help') {
    console.log(SystemTasks.help());
  }
  if (args.task === 'status') {
    console.log(SystemTasks.status());
  }




  // register main commands
  // program.command('status').action(SystemTasks.status);
  // program.command('list').action(SystemTasks.list);
  // program.command('init').action(SystemTasks.init);



  // if (ntrcFound) {
  //   _.each(Helpers.scanTasks(config.resolved.ntrc), function (fn, name) {
  //     if (typeof fn === 'function') {
  //       if (debug) console.log('[nt] Registering the "' + name + '" command');
  //       program.command(name).action(fn);
  //     }
  //   });
  //   console.log('[nt] Finished registering tasks');
  // }

  // Fallback to CLI if no arguments provided
  // program.nocommand().callback(Commands.cli);
  // program.arguments('<cmd>').action(function (cmd) {
  //   console.log('cmd', cmd);
  //   if (!cmd) {
  //     return Commands.cli();
  //   }
  // });

};

module.exports = dispatcher;
