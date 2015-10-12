var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var exec = require('child_process').exec;
var sshHelper = require('ssh-cli-helper');
var jsonfile = require('jsonfile');
var path = require('path');

var dfltPath = path.join(require('os').homedir(), '.ssh-cli-helper');
var dfltFile = path.join(dfltPath, 'store.json');

var mainWindow = null;

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {

  mainWindow = new BrowserWindow({
    width: 815,
    height: 420,
    resizable: false,
    'skip-taskbar': true,
    frame: true,
    transparent: false,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  });

  mainWindow.loadUrl('file://' + __dirname + '/dist/index.html');

  // Get the storage data and send them to the view when the application is ready
  mainWindow.webContents.on('did-finish-load', (e) => {

    // Get the saved data from json store
    var savedData = jsonfile.readFileSync(dfltFile);
    
    e.sender.send('store-data', savedData);
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  ipc.on('open-command', (e, command) => {

    var finalCommand = sshHelper.SSHConnection
      .fromObject(command.connection)
      .getCommand('darwin')
      .replace(/\"/g, '\\"');

    var commandLine = `
      osascript -e 'tell application "Terminal"
        activate
        do script "${finalCommand}"
      end tell
    '`;

    exec(commandLine, () => {});
  });

  ipc.on('save-command', (e, connections) => {

    jsonfile.writeFileSync(dfltFile, connections, {
      spaces: 2
    });
  });
});
