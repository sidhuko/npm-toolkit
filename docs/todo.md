# To do

* Make nt pick up tasks defined in "scripts" section of package.json (setting-based?)
* Consider Grunt and Gulp transition scripts
* Make "nt init" also install npm-toolkit locally if not found (with support for --save, --save-dev, --link-only)


* Handle the cases where env files and/or userdata is not present  [done?]
* Allow nt --version & nt status to be executed without ntrc present [done?]
* Improve debugging / verbose output
* Resolve full paths to allow for the npm-toolkit-rc to be symlinked (allow multi-app setups)

* Improve documentation
* Allow starting a task as a daemon + jumping in and out of daemon's stdout stream [tmux/screen?]
* Create a REST API to communicate between instances of npm-toolkit (with permissions system)
