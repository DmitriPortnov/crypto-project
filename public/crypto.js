$(document).ready(function() {
    if ($('.row > div').length === 0) {
        homePage();
    }

    function getCrypto(data) {
        return $.get(data);
    }

    function buildDomInfo(e, x) {
        $('.info').eq($('.infoBtn').index(e.target)).empty();
        $('.info').eq($('.infoBtn').index(e.target)).append(x);
    }

    function refreshCoin(e, coinId) {
        getCrypto('https://api.coingecko.com/api/v3/coins/' + coinId).then(coin => {
            let coinChart = new CoinInfo(coin);
            window.localStorage.setItem(`coin_${coinId}`, JSON.stringify(coinChart));
            buildDomInfo(e, buildInfo(coinChart));
            });
    }

    function getInfo(e) {
        let coinId = $('.info').eq($('.infoBtn').index(e.target)).parent()[0].id;
        let coin = JSON.parse(window.localStorage.getItem(`coin_${coinId}`));
        if (coin !== null) {
            if (new Date().getTime()-coin.ts < 120000) {
                buildDomInfo(e, buildInfo(coin));
            }
            else {
                refreshCoin(e, coinId);
            }
        } 
        else {
            refreshCoin(e, coinId);
        }
    }

    function infoBtn() {
        $('.infoBtn').click(e => {
            buildDomInfo(e, spinner());
            $('.info').eq($('.infoBtn').index(e.target)).toggle(1000);
            getInfo(e);
        });
    }

    function toggleBtn() {
        $('input:checkbox[name="coinId"]').click(() => {
            let checked = $.map($('input:checkbox[name="coinId"]:checked'), e => e);
            if (checked.length > 5) {
                buildModal(checked);
                $('.modal').modal('show');
            }
        });
        
    }

    function buildModal(checkedCoins) {
        $('.modal-body').empty();
        checkedCoins.map(coin => {
            $('.modal-body').append(modalToggle(coin));
        });
        $('input:checkbox[name="checkedCoinId"]').click((event) => {
            console.log(event);
            let modalBtn = $.map($('input:checkbox[name="checkedCoinId"]'), e => e);
            checkedCoins.map((input, idx) => input.checked = modalBtn[idx].checked);
            if ($('input:checkbox[name="checkedCoinId"]:checked').length < 6) {
                $('.modal').modal('hide');
            }
        });
        $('.closeBtn').click(() => {
            checkedCoins.map(coin => coin.checked = false);
        });
    }

    function homePage() {
        $('.row').append(spinner());
        getCrypto('https://api.coingecko.com/api/v3/coins/list').then(cryptos => {
            $('.row').empty();
            for (let i=0; i<100; i++) {
                buildCards(cryptos[i]);
            }
            console.log($('.row > div'))
            console.log($('.row > div').length)
            infoBtn();
            toggleBtn();
        });
        $('.searchBtn').click(() => {
            $('.card').filter(function() {
                return $(this).toggle($(this).eq(0).text().toUpperCase().indexOf($('.search').val().toUpperCase()) > -1)
            });
        });
    }
    
    
    
    class CoinInfo {
        constructor(CoinInfo) {
            this.usd = Math.floor(CoinInfo.market_data.current_price.usd * 10000) / 10000;
            this.eur = Math.floor(CoinInfo.market_data.current_price.eur * 10000) / 10000;
            this.ils = Math.floor(CoinInfo.market_data.current_price.ils * 10000) / 10000;
            this.ts = new Date().getTime();
            this.img = CoinInfo.image.large;
        }
    }

    $('#home-tab').click(() => {
        $('.row').empty();
        $('#home-tab').tab('show');
        homePage();
    });
    $('#live-tab').click(() => {
        let coins = $.map($('input:checkbox[name="coinId"]:checked'), e => e.value);
        $('#live-tab').tab('show');
        $('.row').empty();
        $('.row').html('<div id="chartContainer" style="height: 500px; width: 100%;"></div>');
        canvasChart(coins);
    });
    $('#about-tab').click(() => {
        $('.row').empty();
        $('#about-tab').tab('show');
        aboutPage();
    });
});

function buildCards(crypto) {
    let card = `<div id="${crypto.id}" class="card col-12 col-md-4">
        <p><strong>${crypto.symbol.toUpperCase()}</strong></p>
        <p>${crypto.name}</p>
        <label class="switch">
            <input type="checkbox" name="coinId" value="${crypto.symbol.toUpperCase()}">
            <span class="slider round"></span>
        </label>
        <div class="info" style="display:none">
            
        </div>
        <button type="button" class="infoBtn btn btn-primary">More info</button>
    </div>`
    $('.row').append(card);
}

function spinner() {
    let spinner = `<div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
    </div>`
    return spinner;
}

function buildInfo(data) {
    let coin = `<p>USD: ${data.usd + ' $'}</p>
        <p>EUR: ${data.ils + ' \u20AC'}</p>
        <p>ILS: ${data.eur + ' \u20AA'}</p>
        <img class="coins" src="${data.img}" alt="CryptoCoin">`
    
    return coin
}


function modalToggle(coin) {
    let lineBtn = `<div class="lineBtn">
    <span>${coin.value}:</span>  
    <label class="switchModal">
        <input type="checkbox" name="checkedCoinId" checked value="${coin.value}">
        <span class="slider round"></span>
    </label>
</div>`
    return lineBtn;
}

function aboutPage() {
    let aboutDom = `<div class="aboutCard">
        <div class="front"><img src="Dmitri.png"></div>
        <div class="back">
            <div class="details">
                <h2>Dmitri Portnov<br /><span>Very junior web developer</span></h2>
                <div class="socialIcons">
                    <a href="https://www.facebook.com/profile.php?id=100004484828284" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                    <a href="https://www.instagram.com/dmitriportnov/" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                    <a href="https://plus.google.com/u/0/111805836846872977150" target="_blank"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
    </div>`;
    $('.row').append(aboutDom);
}

function canvasChart(coins) { 
    if (coins.length === 0) {
        $('.row').empty();
        let massage = $('.row').html('<p>please return to home page and choose coins for the chart</p>');
        return 
    }
    let coinArr = [];
    for (let i=0; i<coins.length; i++) {
        coinArr.push({
            type: "spline",
            showInLegend: true,
            yValueFormatString: "$##0.0000",
            name: coins[i],
            markerSize: 0,
            dataPoints: []
        });
    }
    var chart = new CanvasJS.Chart("chartContainer", {
        exportEnabled: true,
        title :{
            text: "Coins values"
        },
        axisX:{
            valueFormatString: "hh:mm:ss",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY:{
            includeZero: false,
            title: "coin value",
            suffix: "$"
        },
        legend:{
            cursor:"pointer",
            itemclick : toggleDataSeries
        },
        toolTip: {
            shared: "true"
        },
        data: coinArr
    });

    function getCharts(coins) {
        if (coins.length == 1) {
            return `https://min-api.cryptocompare.com/data/price?fsym=${coins}&tsyms=USD`;
        }
        let charts = coins.join();
        return `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${charts}&tsyms=USD`;
    }

    function chartsValue(coinArr, charts, name) {
        if (coinArr.length > 1) {
            return charts[name].USD;
        }
        return charts.USD;
    }
    var updateChart = function (count) {
        count = count || 1;
        $.get(getCharts(coins)).then(charts => {
            for (var j = 0; j < count; j++) {
                for (let i=0; i<coinArr.length; i++) {
                    let name = coinArr[i].name;
                coinArr[i].dataPoints.push({
                    x: new Date(),
                    y: chartsValue(coinArr, charts, name)
                });
                if (coinArr[i].dataPoints.length > 25) {
                    coinArr[i].dataPoints.shift();
                }
                }
            }
            chart.render();
        });
    };
 
    setInterval(() => { updateChart() }, 2000); 

    function toggleDataSeries(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        
    }
}