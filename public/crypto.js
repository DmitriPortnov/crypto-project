$(document).ready(function() {
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
            infoBtn();
            toggleBtn();
            searchBtn();
        });
    }
    
    function searchBtn() {
        $('button').click(() => {
            $('.card').filter(function() {
                return $(this).toggle($(this).eq(0).text().toUpperCase().indexOf($('.search').val().toUpperCase()) > -1);
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

    homePage();
});