// merge env vars
// also get .bin scripts and allow "nt /_mocha"

var spawn = require('child_process').spawn;
var _mapPrintFn = require('./_mapPrintFn');
var getProjectRootDir = require('./getProjectRootDir');

function executeScript(cmd, args) {
  // clear pipes
  cmd = cmd.split('|')[0];
  var cwd = getProjectRootDir();
  args.print.data('Setting working directory at ' + cwd);
  args.print.data('Exec: ' + cmd + '\n');

  if (typeof cmd === 'string') {
    cmd = cmd.split(' ');
  }
  var print = _mapPrintFn(args);
  var main = cmd.shift()
  var processOpts = {};


  if (cwd) {
    processOpts.cwd = cwd;
  }

  const process = spawn(main, cmd, processOpts);

  process.stdout.on('data', (data) => {
    print.data(data.toString());
  });

  process.stderr.on('data', (data) => {
    print.err(data.toString());
  });

  process.on('close', (code) => {
    print.data('Process exited with code ' + code);
  });

}

module.exports = executeScript;
