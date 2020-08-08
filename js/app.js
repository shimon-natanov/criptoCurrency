import UI from './ui.js'


window.onload = function () {
    localStorage.clear();
    UI.choosedCurencies = {}
    // UI.home()

}

UI.navMenu.onclick = (e) => {

    switch (e.target.nodeName){
        case 'A':
           let tar = e.target.textContent.toLowerCase()
           UI.route[tar]()
           break
        case 'I':
        case 'BUTTON':
            UI.search()
    
        default :
        return
    }
    

}

UI.currencyDiv.onclick = (e)=>{  // more info button

    switch (e.target.nodeName){
        case 'BUTTON':  // more info button
                
                let coinCardDiv = e.target.parentNode
                let local = false
                if (e.target.getAttribute('aria-expanded')){ // if  not null

                    if(e.target.getAttribute('aria-expanded')=== "false" ) { // if it was closed aria-expanded= false we need to get the info

                        if(localStorage.getItem(coinCardDiv.id)){ // if local storage not null
                            local = true
                            UI.moreInfo(coinCardDiv,local)// from localStorage

                        }else UI.moreInfo(coinCardDiv,local) // from API
                    }
                }else UI.moreInfo(coinCardDiv,local) // from API
                break

        case 'INPUT':  // toggel checkbox input
            if (e.target.checked){ // toggle is on
                if (Object.keys(UI.choosedCurencies).length < 5){
                    UI.choosedCurencies[e.target.id]= e.target.id  // e.target.id id accutaly the cripto symbol like BTC
                }else UI.show5CoinList(e.target.id)
            }else delete UI.choosedCurencies[e.target.id]
            break
        default : return
    }
   
   
    
}