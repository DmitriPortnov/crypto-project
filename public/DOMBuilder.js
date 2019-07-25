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