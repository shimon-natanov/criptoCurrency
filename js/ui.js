import Ajax from './ajax.js'

export default class UI {

    static aboutUrl = '../misc/about.html'
    static getAllCoinsUrl = 'https://api.coingecko.com/api/v3/coins/list'
    static getMoreInfoURL = 'https://api.coingecko.com/api/v3/coins/'
    static liveReportHtmlUrl = '../misc/liveReport.html'
    static compareRateTimer
    static curencyJsonArray



    static search (){
        let searchText = document.getElementsByName('search')[0].value
        if (searchText){
            let filteredCoinsArray = UI.curencyJsonArray.filter(x => x.symbol === searchText )
            UI.showCriptoCoinInMianDiv(filteredCoinsArray)
        }else UI.home()
    }

    static get currencyDiv() {
        return document.getElementById('currencyDiv')
    }

    static showCriptoCoinInMianDiv(curencyJsonArray){
        let i = 0
        UI.currencyDiv.innerHTML = '' 
        curencyJsonArray.forEach(curency => {
            if (i < 100) {                       // firs div id is the curency.id since the site give info by id name and not symbol
                UI.currencyDiv.innerHTML += `
                    <div id="${curency.id}">
                        <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id=${curency.symbol}>
                            <label class="custom-control-label" for=${curency.symbol}></label>
                        </div>
                            <p>id: ${curency.id} &nbsp;   symbol :&nbsp; ${curency.symbol}  &nbsp;  </p>
                            <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#A${curency.id}MoreInfo">More Info</button>
                        <div  id="A${curency.id}MoreInfo" class="addInfo">

                        </div>
                    </div>`
                //<button type="button" class="btn btn-lg btn-toggle" data-toggle="button" aria-pressed="false" autocomplete="off"></button>
                i++
            }
        });
    }

    static home() {
        if(UI.compareRateTimer){
            clearInterval(UI.compareRateTimer)
        }
        const getAllCoins = function () {
                               
           
            UI.curencyJsonArray = JSON.parse(this.responseText)
            UI.showCriptoCoinInMianDiv(UI.curencyJsonArray)
           

            for (const choosedcoin in choosedCurencies) {  // when comming back to home screen showing the choosed cripto coins
                document.getElementById(choosedcoin).checked = true
              }
            
            
        }
        Ajax.url = UI.getAllCoinsUrl
        Ajax.callBack = getAllCoins
        Ajax.get()
    }
    //check if it is in the cach if yes then if less than 2 min compare to the time stamp take from local storage else reload from API
    // if not in cach then reload form api
    // need to set a timer for 2 minutes while the more info id open
    static moreInfo(coinCardDiv, local) { // local= true then get more Info from localstorage
        if (!local) {
            const getMoreInfo = function () {
                let moreInfoJsonArray = JSON.parse(this.responseText) // this is related to xhr
                UI.showMoreInfo(moreInfoJsonArray, coinCardDiv)

                localStorage.setItem(`${coinCardDiv.id}`, JSON.stringify(moreInfoJsonArray))
                setTimeout(function () {
                    localStorage.removeItem(coinCardDiv.id)
                }, 120000)    //UI.deleteFromLocalStorage(coinCardDiv.id)         
            }

            const progressFunc = function (e) {
                coinCardDiv.querySelector('.addInfo').innerHTML = `<progress id="progress${coinCardDiv.id}" value="0"></progress>`
                var progressBar = document.getElementById(`progress${coinCardDiv.id}`)
                // if (e.lengthComputable) {
                progressBar.max = 20000 //e.total //e.total;
                progressBar.value = e.loaded;

                console.log(`Downloaded ${e.loaded} of ${e.total} bytes`);

            }

            Ajax.DownloadProgressFunc = progressFunc
            Ajax.url = UI.getMoreInfoURL + coinCardDiv.id.toLowerCase()
            Ajax.callBack = getMoreInfo
            Ajax.get()
        } else UI.showMoreInfo(JSON.parse(localStorage.getItem(coinCardDiv.id)), coinCardDiv)

    }




    static showMoreInfo(moreInfoJsonArray, coinCardDiv) {
        // let backUpcard=coinCard.innerHTML
        coinCardDiv.querySelector('.addInfo').innerHTML =
            `
          <img src="${moreInfoJsonArray.image.small}"></img>
           &nbsp; ${moreInfoJsonArray.market_data.current_price.usd} $ &nbsp; 
           &nbsp; ${moreInfoJsonArray.market_data.current_price.eur}  &#8364; &nbsp; 
           &nbsp;${moreInfoJsonArray.market_data.current_price.ils}  &#8362;  
     `

        // localStorage.setItem(`${coinCard.timeStamp}`, new Date())
        // <button id=${coinCard.id+'-back'}>back</button>

    }

    // static deleteFromLocalStorage (value){
    //     localStorage.removeItem(value)

    // }

    // static showProgressBar(coinCardDiv){

    // }

    static show5CoinList(chosenCriptoSymbolFromMainPage) {
        let modalBody=document.getElementsByClassName("modal-body")[0]
        modalBody.innerHTML=''
        for (const criptoCoin in choosedCurencies) {
            modalBody.innerHTML += `
            <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="C${criptoCoin}" checked>
                <label class="custom-control-label" for="C${criptoCoin}"></label>
            </div>
            <p> &nbsp;   symbol :&nbsp; ${criptoCoin}  &nbsp;  </p>
            `
          }
        
        // choosedCurencies


        // https://getbootstrap.com/docs/4.0/components/modal/

        $('#exampleModal').modal('show')
        let modalContent = document.getElementsByClassName("modal-content")[0]

        modalContent.onclick = function (e){


            switch (e.target.nodeName){
                case 'INPUT' :
                    let chosenCoinSymbolonModal = e.target.id.slice(1) // the choosen coin from the modal 

                    if (!e.target.checked){
                        
                        delete choosedCurencies[chosenCoinSymbolonModal]  ///////////
                        document.getElementById(chosenCoinSymbolonModal).checked = false // turn off on main page
                        choosedCurencies[chosenCriptoSymbolFromMainPage]=chosenCriptoSymbolFromMainPage
                        $('#exampleModal').modal('hide')
                    }
                    break
                case 'SPAN':
                case 'BUTTON' :
                    document.getElementById(chosenCriptoSymbolFromMainPage).checked = false
                    break
                default :
                    return
            }

            if ((e.target.nodeName != 'INPUT')||(e.target.nodeName != 'BUTTON')){
                return
            }
            let chosenCoinSymbolonModal = e.target.id.slice(1) // the choosen coin from the modal 

            if (!e.target.checked){
                
                delete choosedCurencies[chosenCoinSymbolonModal]  ///////////
                document.getElementById(chosenCoinSymbolonModal).checked = false // turn off on main page
                choosedCurencies[chosenCriptoSymbolFromMainPage]=chosenCriptoSymbolFromMainPage
                $('#exampleModal').modal('hide')
            }
            // else choosedCurencies[chosenCoinSymbol]=chosenCoinSymbol
            
        }

        //    let saveButton = document.getElementById('save')
        //    saveButton.onclick = function(e){

        //         if (Object.keys(choosedCurencies).length < 5){           
        //             choosedCurencies[CriptoSymbol]=CriptoSymbol
        //         }
        //    }
         
    }

    static get getCurrencyCompareUrl (){
        let currencyCompareUrl = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=`
        for (const criptoCoin in  choosedCurencies){
            currencyCompareUrl += `${criptoCoin},`

        }
        currencyCompareUrl = currencyCompareUrl.slice(0, -1)
        return currencyCompareUrl += '&tsyms=USD'
    }
    

    static LiveReports() {
        Ajax.getfileContent(UI.liveReportHtmlUrl)
        window.allData ={}
        if (Object.keys(choosedCurencies).length > 0){
            for (const criptoCoin in  choosedCurencies){           
            allData[criptoCoin]={}
            allData[criptoCoin].name = criptoCoin
            allData[criptoCoin].data = []
            }
            // Ajax.getScript(UI.liveReportJsUrl)
            function getCriptoCompareRates(){ // responseText = "{"{"ZOC":{"USD":0.00164},"ZCN":{"USD":0.1282},"ZRX":{"USD":0.3961}}"}"
                let compareRatesObj = JSON.parse(this.responseText) // compareRatesObj = {ZOC:{USD:0.00164},ZCN{USD:0.1282},ZRX:{USD:0.3961}}
                if ( compareRatesObj.HasWarning !== true){
                    UI.showcharts(compareRatesObj)
                }else {
                    alert ('no data on this coins')
                    clearInterval(UI.compareRateTimer)
                 } 
            }
            Ajax.url =  UI.getCurrencyCompareUrl  //'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH,BTC,PPC,LTC&tsyms=USD' //  


            // const progressLiveReportsFunc = function (e) {
            //     document.querySelector('#currencyDiv').innerHTML = `<progress id="progressLiveReport" value="0"></progress>`
            //     var progressBar = document.getElementById(`progressLiveReport`)
            //     // if (e.lengthComputable) {
            //     progressBar.max = 20000 //e.total //e.total;
            //     progressBar.value = e.loaded;

            //     console.log(`Downloaded ${e.loaded} of ${e.total} bytes`);

            // }

            Ajax.DownloadProgressFunc = null


            Ajax.callBack = getCriptoCompareRates
            UI.compareRateTimer = setInterval(Ajax.get,2000)
        }else alert ('No Cripto Coin was chosen')
    }

    static showcharts (compareRatesObj){         
        for (const criptoCoin in compareRatesObj){          
            allData[criptoCoin.toLowerCase()].data.push(compareRatesObj[criptoCoin].USD)
        }
        var seriesArry = Object.keys(allData).map (key => allData[key])
       
       
        // for  (const obj in allData){
        //     var seriesArry = []
        //     seriesArry.push(obj) // +chartData.push(compareRatesObj[criptoCoin]['USD'])
        // }

        Highcharts.chart('container', {

            title: {
                text: 'Solar Employment Growth by Sector, 2010-2016'
            },
        
            subtitle: {
                text: 'Source: thesolarfoundation.com'
            },
        
            yAxis: {
                title: {
                    text: 'USD'
                }
            },
        
            // xAxis: {
            //     type: 'datetime',
            //     dateTimeLabelFormats: {
            //         day: '%H:%M:%S'
            //     }
            // },
            // xAxis: {
            //     accessibility: {
            //         // rangeDescription: 'Range: 2010 to 2017'
            //         rangeDescription: 'datetime'
            //     }
            // },
            xAxis: {
                accessibility: {
                    rangeDescription: 'Range: 0 to 3600'
                }
            },
        
        
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            // plotOptions: {
            //     series: {
            //         label: {
            //             connectorAllowed: false
            //         },
            //         pointStart: new Date(),
            //         // pointStart: Date() //.UTC(2010, 0, 1),
            //         pointInterval: 3600 * 1000 // one hour
            //     }
            // },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 0
                }
            },
        
            series: seriesArry,
            // [{
            //     name: 'Installation',
            //     data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 0]
            // }, {
            //     name: 'Manufacturing',
            //     data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            // }, {
            //     name: 'Sales & Distribution',
            //     data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
            // }, {
            //     name: 'Project Development',
            //     data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
            // }, {
            //     name: 'Other',
            //     data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
            // }],
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        
        });
    }

    static about() {
        if(UI.compareRateTimer){
            clearInterval(UI.compareRateTimer)
        }
        Ajax.getfileContent(UI.aboutUrl)
    }

    static get navMenu() {
        return document.querySelector('nav')
    }

    static get currencyDiv() {
        return document.getElementById('currencyDiv')
    }

    static get route() {
        return {
            "home": UI.home,
            "livereports": UI.LiveReports,
            "about": UI.about
        }
    }



    // static loadContent(url, outlet) {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('GET' , url)
    //     xhr.onload = function() {
    //         outlet.innerHTML = xhr.responseText;
    //     }
    //     xhr.send()
    
    // }
    
    // static loadScript(url) {
    //     var scriptTag = document.createElement('script');
    //     scriptTag.src = url;
    //     document.body.insertAdjacentElement('beforeend',scriptTag)   
    // }
}