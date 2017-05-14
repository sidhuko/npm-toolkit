// readNpmScript
// + merge opts
// + assigns env vars
// spawn child process

// also get .bin scripts and allow "nt /_mocha"

function executeScript(script, args) {
  args.print.data('ExecuteScript: ' + args.cmd[0]);
  args.print.data('> ' + script + '\n');
}

module.exports = executeScript;
