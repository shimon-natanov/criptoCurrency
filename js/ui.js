import Ajax from './ajax.js'

export default class UI {

    static aboutUrl = '../misc/about.html'
    static getAllCoinsUrl = 'https://api.coingecko.com/api/v3/coins/list'
    static getMoreInfoURL = 'https://api.coingecko.com/api/v3/coins/'
    static liveReportHtmlUrl = '../misc/liveReport.html'
    static compareRateTimer
    static curencyJsonArray
    static choosedCurencies


    static search() {
        let searchText = document.getElementsByName('search')[0].value
        if ((searchText)) {
            if (UI.curencyJsonArray) {
                let filteredCoinsArray = UI.curencyJsonArray.filter(x => x.symbol === searchText)
                UI.showCriptoCoinInMianDiv(filteredCoinsArray)
            }
        } else UI.home()
    }

    static get currencyDiv() {
        return document.getElementById('currencyDiv')
    }

    static showCriptoCoinInMianDiv(curencyJsonArray) {
        let i = 0
        UI.currencyDiv.innerHTML = ''
        curencyJsonArray.forEach(curency => {


            if (i < 1000) {                       // firs div id is the curency.id since the site give info by id name and not symbol
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
                i++
            }
        });
    }

    static home() {
        if (UI.compareRateTimer) {
            clearInterval(UI.compareRateTimer)
        }

        if (!UI.curencyJsonArray) {
            const getAllCoins = function () {


                UI.curencyJsonArray = JSON.parse(this.responseText)

                UI.showCriptoCoinInMianDiv(UI.curencyJsonArray)


                for (const choosedcoin in UI.choosedCurencies) {  // when comming back to home screen showing the choosed cripto coins
                    document.getElementById(choosedcoin).checked = true
                }


            }
            Ajax.url = UI.getAllCoinsUrl
            Ajax.callBack = getAllCoins
            Ajax.get()
        }else UI.showCriptoCoinInMianDiv(UI.curencyJsonArray)
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
                progressBar.max = 20000 //e.total 
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
        coinCardDiv.querySelector('.addInfo').innerHTML =
            `
          <img src="${moreInfoJsonArray.image.small}"></img>
           &nbsp; ${moreInfoJsonArray.market_data.current_price.usd} $ &nbsp; 
           &nbsp; ${moreInfoJsonArray.market_data.current_price.eur}  &#8364; &nbsp; 
           &nbsp;${moreInfoJsonArray.market_data.current_price.ils}  &#8362;  
     `



    }



    static show5CoinList(chosenCriptoSymbolFromMainPage) {
        let modalBody = document.getElementsByClassName("modal-body")[0]
        modalBody.innerHTML = ''
        for (const criptoCoin in UI.choosedCurencies) {
            modalBody.innerHTML += `
            <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="C${criptoCoin}" checked>
                <label class="custom-control-label" for="C${criptoCoin}"></label>
            </div>
            <p> &nbsp;   symbol :&nbsp; ${criptoCoin}  &nbsp;  </p>
            `
        }




        // https://getbootstrap.com/docs/4.0/components/modal/

        $('#exampleModal').modal('show')
        let modalContent = document.getElementsByClassName("modal-content")[0]

        modalContent.onclick = function (e) {


            switch (e.target.nodeName) {
                case 'INPUT':
                    let chosenCoinSymbolonModal = e.target.id.slice(1) // the choosen coin from the modal 

                    if (!e.target.checked) {

                        delete UI.choosedCurencies[chosenCoinSymbolonModal]  ///////////
                        document.getElementById(chosenCoinSymbolonModal).checked = false // turn off on main page
                        UI.choosedCurencies[chosenCriptoSymbolFromMainPage] = chosenCriptoSymbolFromMainPage
                        $('#exampleModal').modal('hide')
                    }
                    break
                case 'SPAN':
                case 'BUTTON':
                    document.getElementById(chosenCriptoSymbolFromMainPage).checked = false
                    break
                default:
                    return
            }

            if ((e.target.nodeName != 'INPUT') || (e.target.nodeName != 'BUTTON')) {
                return
            }
            let chosenCoinSymbolonModal = e.target.id.slice(1) // the choosen coin from the modal 

            if (!e.target.checked) {

                delete UI.choosedCurencies[chosenCoinSymbolonModal]  ///////////
                document.getElementById(chosenCoinSymbolonModal).checked = false // turn off on main page
                UI.choosedCurencies[chosenCriptoSymbolFromMainPage] = chosenCriptoSymbolFromMainPage
                $('#exampleModal').modal('hide')
            }


        }



    }

    static get getCurrencyCompareUrl() {
        let currencyCompareUrl = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=`
        for (const criptoCoin in UI.choosedCurencies) {
            currencyCompareUrl += `${criptoCoin},`

        }
        currencyCompareUrl = currencyCompareUrl.slice(0, -1)
        return currencyCompareUrl += '&tsyms=USD'
    }


    static LiveReports() {
        Ajax.getfileContent(UI.liveReportHtmlUrl)
        window.allData = {}
        UI.seriesArry = []
        if (Object.keys(UI.choosedCurencies).length > 0) {
            for (const criptoCoin in UI.choosedCurencies) {


                UI.seriesArry.push({ name: criptoCoin, data: [] })
            }


            function getCriptoCompareRates() { // responseText = "{"{"ZOC":{"USD":0.00164},"ZCN":{"USD":0.1282},"ZRX":{"USD":0.3961}}"}"
                let compareRatesObj = JSON.parse(this.responseText) // compareRatesObj = {ZOC:{USD:0.00164},ZCN{USD:0.1282},ZRX:{USD:0.3961}}
                if (compareRatesObj.HasWarning !== true) {
                    UI.showcharts(compareRatesObj)
                } else {
                    alert('no data on this coins')
                    clearInterval(UI.compareRateTimer)
                }
            }
            Ajax.url = UI.getCurrencyCompareUrl  //'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH,BTC,PPC,LTC&tsyms=USD' //  


            Ajax.DownloadProgressFunc = null


            Ajax.callBack = getCriptoCompareRates
            UI.compareRateTimer = setInterval(Ajax.get, 2000)


        } else alert('No Cripto Coin was chosen')
    }

    static seriesArry = []

    static downloadChartInfo() {


    }

    static showcharts(compareRatesObj) {
        for (const criptoCoin in compareRatesObj) {
            // allData[criptoCoin.toLowerCase()].data.push(compareRatesObj[criptoCoin].USD)
            UI.seriesArry.find(({ name }) => name === criptoCoin.toLowerCase()).data.push(compareRatesObj[criptoCoin].USD)

        }
        for (let i = 0; i < Object.keys(UI.choosedCurencies).length; i++) {
            if (UI.seriesArry[i].data.length > 100) {

                UI.seriesArry[i].data.splice(0, 1)
            }

        }
        var aa = new Date()
        var tt = aa.getTime() + 3600000 * 3


        Highcharts.chart('container', {
            chart: {
                type: 'spline',
                scrollablePlotArea: {
                    minWidth: 600,
                    scrollPositionX: 1
                }
            },
            title: {
                text: 'Cripto Currency Conversion',
                align: 'left'
            },
            subtitle: {
                text: 'Show conversion of up to 5 cripto currency to USD ($)',
                align: 'left'
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    overflow: 'justify'
                }
            },
            yAxis: {
                title: {
                    text: 'USD($)'
                },
                minorGridLineWidth: 0,
                gridLineWidth: 0,
                alternateGridColor: null,

            },
            tooltip: {
                valueSuffix: '$'
            },
            plotOptions: {
                spline: {
                    lineWidth: 4,
                    states: {
                        hover: {
                            lineWidth: 5
                        }
                    },
                    marker: {
                        enabled: false
                    },
                    pointInterval: 2000, // every 2 seconds
                    pointStart: tt //Date() 
                }
            },
            series: UI.seriesArry,
            navigation: {
                menuItemStyle: {
                    fontSize: '10px'
                }
            }
        });
    }

    static about() {
        if (UI.compareRateTimer) {
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

}