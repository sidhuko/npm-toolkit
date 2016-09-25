# Node.js & npm
nodejs.org

### Manual installation (development version)

In case you want to use development version and contribute node-toolkit
checkout the project from GitHub and create links manually:
```
  git clone https://github.com/git/npm-toolkit.git

  ln -s $(pwd) /usr/local/lib/node_modules/npm-toolkit

  ln -s /usr/local/lib/node_modules/npm-toolkit/index.js /usr/local/bin/nt
```

Then in your app folder:

```
ln -s /usr/local/lib/node_modules/npm-toolkit ./node_modules/npm-toolkit
```
