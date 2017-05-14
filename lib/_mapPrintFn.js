var _ = require('lodash');

module.exports = function _mapPrintFn(args) {
  var print = {
    data: _.get(args, 'print.data', console.log),
    err: _.get(args, 'print.err', console.error),
  };
  return print;
};
