# To do

* Improve debugging / verbose output


## Refactor app flow to reflect the new scenarios
* Bypass full config initialisation for "nt init" task
* Remove quiet mode, make it default and add verbose output
* Ensure fallback to global install of nt where local copy is not available
* Refactor task specifications to return an object rather than self-executing function by default
* Reorganise lib folder


## Import
* Utils for transition from Grunt, Gulp and package.json scripts [nt import grunt/gulp/npm]


## init
* Make "nt init" also install npm-toolkit locally if not found (with support for --save, --save-dev, --link)
* Create a separate "nt install" to allow local installs if node_modules/npm-toolkit not found when executing


## process spawning
* Allow starting a task as a daemon + jumping into stdout stream [tmux/screen style]


## documentation
* Improve documentation
* Create a proper site with quick start and examples (GitHub pages or standalone site)
