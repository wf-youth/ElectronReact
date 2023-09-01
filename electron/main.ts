// index.js
// const path = require('path')
import { app, BrowserWindow } from "electron";
import path from "path";

// app 控制应用程序的事件生命周期。
// BrowserWindow 创建并控制浏览器窗口。

let win;
// 定义全局变量获取 窗口实例

const createWindow = () => {
  win = new BrowserWindow({
    autoHideMenuBar: true,
    show: false,
    width: 1920,
    minWidth: 1240,
    height: 1080,
    minHeight: 600,
    webPreferences: {
      devTools: true,
      contextIsolation: false,
      nodeIntegration: true,
      // 允许html页面上的javascipt代码访问nodejs 环境api代码的能力（与node集成的意思）
    },
  });

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    // VITE_DEV_SERVER_HOST 如果是undefined 换成  VITE_DEV_SERVER_HOSTNAME
    win.loadURL(`http://localhost:3000/`);
  }
  win.webContents.openDevTools();
  win.once("ready-to-show", () => {
    win.show();
  });
};

// 在Electron完成初始化时被触发
app.whenReady().then(createWindow);
