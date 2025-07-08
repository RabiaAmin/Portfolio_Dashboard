import { app, BrowserWindow } from 'electron'
import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, "public", "assets", "logo.ico"),
    webPreferences: {
      contextIsolation: true,
    },
    autoHideMenuBar: true,
  });
  win.webContents.openDevTools(); 
  win.loadFile('dist/index.html'); 
}

app.whenReady().then(createWindow);