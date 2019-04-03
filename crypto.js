var portfolioAmount = '';
var hpbPrice = '';
var marketCap = '';
var circulationSupply = '';
var tokenQuantity = '';
const coinInfoParagraph = document.querySelector('#cryptoinfo');

async function getPriceAndMcap() {
  try {
    const result = await fetch 
    (`https://api.coingecko.com/api/v3/coins/high-performance-blockchain`);
    const data = await result.json();
    const price = data.market_data.current_price.usd;
    const marketCap = data.market_data.market_cap.usd;
    let coinInfo = `The current price of High Performance Blockchain is ${price}$ with a current market Cap of ${marketCap}$`;
    const newContent = `<p class='text-info text-center mt-5' id='cryptoinfo'>${coinInfo}</p>`;
    coinInfoParagraph.insertAdjacentHTML('afterbegin', newContent);
  } catch(error) {
    console.log(error);
  }
}

function simulateFuturePrice () {
  var input = document.querySelectorAll('input');

for (var i = 0; i < input.length; i++) {
  marketCap = input[0];
  circulationSupply = input[1];
  tokenQuantity = input[2]; 
};

var result = document.querySelector('#resultParagraph');
var button = document.querySelector('button');
button.addEventListener('click', function() {
  portfolioAmount =  (marketCap.value / circulationSupply.value)*tokenQuantity.value;
  hpbPrice = (marketCap.value / circulationSupply.value);
  result.textContent = 'Your hpb portfolio will worth' + ' ' + portfolioAmount + ' ' + 'USD.' + ' ' +
  'With the Marketcap and the Circulation Supply specified, HPB Token will worth' + ' ' + hpbPrice 
  + ' ' + 'USD';
})
}

getPriceAndMcap();
simulateFuturePrice();


