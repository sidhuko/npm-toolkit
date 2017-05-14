var spawn = require('child_process').spawn;
var _mapPrintFn = require('./_mapPrintFn');
var getProjectRootDir = require('./getProjectRootDir');
var fs = require('fs-extra');
var _ = require('lodash');

function executeScript(cmd, args) {
  // clear pipes
  cmd = cmd.split('|')[0];
  if (typeof cmd === 'string') {
    cmd = cmd.split(' ');
  }
  var print = _mapPrintFn(args);
  var cwd = getProjectRootDir();

  var main = cmd.shift();
  var processOpts = {stdio: 'inherit'};
  var nodeModulesPath = cwd + '/node_modules/.bin/' + main;

  cmd = cmd.concat(args.args);

  if (args.opts && args.opts.inherit) {
    var topOpts = _.merge({}, args.opts);
    delete topOpts.verbose;
    delete topOpts.env;
    delete topOpts.cwd;
    delete topOpts.inherit;

    _.forEach(topOpts, function (val, key) {
      cmd.push('--' + key + '=' + val);
    });
  }

  print.data('Exec: ' + main + ' ' + cmd.join(' '));

  if (cwd) {
    print.data('Setting working directory at ' + cwd);
    processOpts.cwd = cwd;
  }

  var nodeModulesPathExists = fs.existsSync(nodeModulesPath);
  if (nodeModulesPathExists) {
    print.data('Using "' + main + '" executable found in node_modules');
    main = nodeModulesPath;
  }

  print.data('\n');

  var processThread = spawn(main, cmd, processOpts);

  // processThread.stdout.on('data', (data) => {
  //   print.data(data.toString());
  // });
  //
  // processThread.stderr.on('data', (data) => {
  //   print.err(data.toString());
  // });

  processThread.on('close', (code) => {
    print.data('(Process "' + main + '" exited with code ' + code + ')');
    if (code !== 0) {
      process.exit(code);
    }
  });

}

module.exports = executeScript;
