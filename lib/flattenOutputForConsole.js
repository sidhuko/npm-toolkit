var _ = require('lodash');

function flattenOutputForConsole(args) {
  return _.map(args, function (v, k) {
    if (Array.isArray(v)) {
      return v.join(' ');
    }
    if (typeof v === 'object') {
      return '\n' + JSON.stringify(v, null, 2);
    }
    return v;
  }).join(' ');
}

module.exports = flattenOutputForConsole;
