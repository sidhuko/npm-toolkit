var exec = require('./exec');

function execNpmScript(script, args) {
  args.print.data('ExecNpmScript: ' + args.cmd[0]);
  return exec(script, args);
}

module.exports = execNpmScript;
