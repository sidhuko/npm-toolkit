var getNtVersion = require('../../lib/getNtVersion');

module.exports = function (args) {
  args.print.data('npm-toolkit ' + (getNtVersion() || '- unknown version'));
};
