function canvasChart(coins) { 
    console.log(coins); 
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