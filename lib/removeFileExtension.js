module.exports = function (str) {
  if (!str) {
    return null;
  }

  // return str.substring(0, str.length - 3);
  str = str.split('.');
  str.pop();
  return str.join('.');
};
