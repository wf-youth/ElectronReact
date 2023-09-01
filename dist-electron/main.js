"use strict";
const electron = require("electron");
const path = require("path");
let win;
const createWindow = () => {
  win = new electron.BrowserWindow({
    autoHideMenuBar: true,
    show: false,
    width: 1920,
    minWidth: 1240,
    height: 1080,
    minHeight: 600,
    webPreferences: {
      devTools: true,
      contextIsolation: false,
      nodeIntegration: true
      // 允许html页面上的javascipt代码访问nodejs 环境api代码的能力（与node集成的意思）
    }
  });
  if (electron.app.isPackaged) {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    win.loadURL(`http://localhost:3000/`);
  }
  win.webContents.openDevTools();
  win.once("ready-to-show", () => {
    win.show();
  });
};
electron.app.whenReady().then(createWindow);
