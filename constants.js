var constants = {
  NPM_TOOLKIT_VERSION: '0.0.1',
  ROOT_DIR: process.cwd(),
  SETTINGS_DIR_NAME: 'npm-toolkit-rc',
};

constants.SETTINGS_DIR = [constants.ROOT_DIR, constants.SETTINGS_DIR_NAME].join('/');

module.exports = constants;
