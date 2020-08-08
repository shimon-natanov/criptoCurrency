import UI from './ui.js'
export default class Ajax {
    
    static url 
    static callBack
    static DownloadProgressFunc
    static errorAlert() {

        alert ('error')
    }

    static getfileContent(url){
        const xhr = new XMLHttpRequest
        xhr.open('GET',url)
        xhr.onload = ()=> {
            UI.currencyDiv.innerHTML = xhr.responseText
        }
        xhr.send()
    }
    static get(){
        const xhr = new XMLHttpRequest
        xhr.open('GET',Ajax.url)
        xhr.onload = Ajax.callBack     //()=> {
        xhr.onerror = Ajax.errorAlert
        xhr.onprogress = Ajax.DownloadProgressFunc
        xhr.send()

    }
}