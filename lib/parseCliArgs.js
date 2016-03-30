// TODO: break combined short flags to individual (-dv into -d and -c)
// TODO: add mapping if single hyphen (-d => --debug, -v => --verbose, -c => config)
// TODO: add custom map support (--help and --version => redirect to global task)

// default: _.get(config, 'settings.local.quiet', false)
// default: _.get(config, 'settings.local.debug', false)
// default: _.get(config, 'const.settingsDir', './ntrc')


/**
 * A custom NT parser
 *
 * Returns an organised object with parsed CLI input options
 * - task: {string},
 * - args: {array of strings},
 * - opts: {array of objects},
 * - raw:  {unparsed input args}
 *
 * @return {object}
 */

var customParser = function () {
  var rawArgs = process.argv.slice(2);
  var reachedOpts = false;

  // return optname.replace(/-/g,'');
  var _removeHyphens = function (str) {
    if (str[0] === '-' && str[1] === '-') {
      return str.substr(2);
    } else if (str[0] === '-') {
      return str.substr(1);
    } else {
      return str;
    }
  }

  var rtn = {
    task: null,
    args: [],
    opts: [],
    raw: rawArgs
  }

  for (i = 0; i < rawArgs.length; i++) {
    var isOption = false;
    var current = rawArgs[i];

    // detect opts
    if (current[0] === '-') {
      reachedOpts = true;
      isOption = true;
    }

    // args
    if (!reachedOpts) {
      rtn.args.push(current);
    } else {
      if (isOption) {
        var curName = _removeHyphens(current);
        rtn.opts[curName] = true;
      } else {
        var prevName = _removeHyphens(rawArgs[i-1]);
        rtn.opts[prevName] = current;
      }
    }
  }
  // rtn.task = rtn.args[0];
  rtn.task = rtn.args.shift();

  return rtn;
};

module.exports = customParser;
