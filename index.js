#!/usr/bin/env node
var parseCliArgs = require('./lib/parseCliArgs');
var taskDispatcher = require('./lib/dispatcher');

if (require.main === module) {
  var args = parseCliArgs();
  return taskDispatcher(args);
} else {
  return module.exports = taskDispatcher;
}
