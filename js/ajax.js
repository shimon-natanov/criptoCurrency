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
            
            // function(e) {
            //     // event.loaded returns how many bytes are downloaded
            //     // event.total returns the total number of bytes
            //     // event.total is only available if server sends `Content-Length` header
                
            //         if (e.lengthComputable) {
            //             progressBar.max = e.total;
            //             progressBar.value = e.loaded;
            //         }
            //     console.log(`Downloaded ${event.loaded} of ${event.total} bytes`);
            // }

        xhr.send()

    }
}