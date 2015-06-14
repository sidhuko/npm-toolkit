var _ = require('lodash');
var chalk  = require('chalk');
var fs = require('fs');;
var Helpers = require('../helpers');
var Constants = require('../../constants');


module.exports = function (opts) {
  var inputCommands = opts._;
  inputCommands.shift();
  var template = inputCommands[0];
  var filename = inputCommands[1];
  var availableTemplates = Helpers.scanTemplates(Constants.SETTINGS_DIR);
  var templateExists = _.has(availableTemplates, template);
  var displayInfo = !opts.quiet;
  var displayStyle = (displayInfo) ? 'detailed' : 'short';

  if (templateExists) {
    result = chalk.bold('Creating a file from template: ') + template;
  } else {
    result = chalk.bold('Template "' + template + '" not found.');
  }

  Helpers.printHeader(displayStyle);
  if (result) console.log(result);
  if (templateExists) {
    if (!filename) {
      filename = 'new_' + template + '.js';
    }
    if (filename.split('.').length !== 0 && _.last(filename.split('.')) !== 'js') {
      filename += '.js';
    }

    fs.writeFileSync(filename, fs.readFileSync(availableTemplates[template]));
    console.log('Created ' + filename);
  }

  Helpers.printSummary(displayStyle);
};
