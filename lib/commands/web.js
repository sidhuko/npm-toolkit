var chalk  = require('chalk');
var Helpers = require('../helpers');

module.exports = function (opts) {
  var displayInfo = !opts.quiet;

  var displayStyle = (displayInfo) ? 'detailed' : 'short';
  Helpers.printHeader(displayStyle);
  //
  var port = (opts.port || 9000);
  console.log(' Started a web interface on port ' + port);
  console.log(chalk.grey('  (not really, but I\'ll add it soon)'));

  // TODO: start as a daemon and add support for "npm-toolkit web start|stop|restart"
  // runBrowser('http://localhost:' + port);
  //
  Helpers.printSummary(displayStyle);
};
