var app = require('app');
var BrowserWindow = require('browser-window');

// Report crashes to our server.
require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 420,
    resizable: false,
    'skip-taskbar': true,
    frame: true,
    transparent: false,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  });

  mainWindow.loadUrl('file://' + __dirname + '/dist/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
