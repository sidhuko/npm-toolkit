# To do

* Switch from nomnom to commander
* Remove quiet mode, make it default and add verbose output
* Improve debugging / verbose output


## Import
* Make nt pick up tasks defined in "scripts" section of package.json
* Consider Grunt and Gulp transition utils


## init
* Bypass config initialisation for "nt init" task
* Make "nt init" also install npm-toolkit locally if not found (with support for --save, --save-dev, --link)
* Create a separate "nt install" to allow local installs if node_modules/npm-toolkit not found when executing


## process spawning
* Allow starting a task as a daemon + jumping into stdout stream [tmux/screen]


## documentation
* Improve documentation
