var _ = require('lodash');
var chalk  = require('chalk');
//var fs = require('fs');
var Helpers = require('../helpers');
var Constants = require('../../constants');
var gitClone = require('nodegit').Clone.clone;


module.exports = function (opts) {
  var displayStyle = (opts.quiet) ? 'short' : 'detailed';

  Helpers.printHeader(displayStyle);

  console.log('Initialising ntk-toolkit...');

  console.log('For this to work constants.js will have to output a function with callback');
  console.log('so this function can be triggered after root directories are resolved.');

  if (opts.example) {
  // Clone a given repository into a specific folder.
  // gitClone("https://github.com/nodegit/nodegit", "tmp", null)
  //   // Look up this known commit.
  //   .then(function(repo) {
  //     // Use a known commit sha from this repository.
  //     return repo.getCommit("59b20b8d5c6ff8d09518454d4dd8b7b30f095ab5");
  //   })
  //   // Look up a specific file within that commit.
  //   .then(function(commit) {
  //     return commit.getEntry("README.md");
  //   })
  //   // Get the blob contents from the file.
  //   .then(function(entry) {
  //     // Patch the blob to contain a reference to the entry.
  //     return entry.getBlob().then(function(blob) {
  //       blob.entry = entry;
  //       return blob;
  //     });
  //   })
  //   // Display information about the blob.
  //   .then(function(blob) {
  //     // Show the name, sha, and filesize in bytes.
  //     console.log(blob.entry.name() + blob.entry.sha() + blob.size() + "b");
  //
  //     // Show a spacer.
  //     console.log(Array(72).join("=") + "\n\n");
  //
  //     // Show the entire file.
  //     console.log(String(blob));
  //   })
  //   .catch(function(err) { console.log(err); });
} else {
  // fs.writeFileSync(Constants, fs.readFileSync(availableTemplates[template]));
}

  //console.log('Created npm-toolkit-rc');

  Helpers.printSummary(displayStyle);
};
