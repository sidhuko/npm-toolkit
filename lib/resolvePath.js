var path = require('path');

module.exports = function resolvePath (location) {
  if (!location) {
    location = './';
  }

  // if path begins with '~' replace it with home directory
  if (location.charAt(0) === '~') {
    location = location.replace('~', process.env.HOME);
  }

  return path.resolve(location);
};
