# To do

* Make nt pick up tasks defined in "scripts" section of package.json (setting-based?)
* Make "nt init" also install npm-toolkit locally if not found (with support for --save, --save-dev, --link)
* Create a separate "nt install" to allow local installs if node_modules/npm-toolkit not found when executing
* Switch from nomnom to commander

* Improve debugging / verbose output
* Improve documentation
* Consider Grunt and Gulp transition scripts
* Allow starting a task as a daemon + jumping in and out of daemon's stdout stream [tmux/screen?]
