const {ipcRenderer} = require('electron')

function open_file(path){
    ipcRenderer.send('open_new-page', path)

}

function minimize(){
    ipcRenderer.send('minimize')
}

function close_app(){
    ipcRenderer.send('close')

}