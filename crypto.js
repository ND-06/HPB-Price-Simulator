let portfolioAmount, hpbFuturePrice, marketCap, circulationSupply, tokenQuantity, button, result, coinInfoParagraph;

marketCap = document.getElementById('marketcapInput');
circulationSupply = document.getElementById('circulationSupplyInput');
tokenQuantity = document.getElementById('tokenquantityInput');
result = document.querySelector('#resultParagraph');
button = document.querySelector('button');
coinInfoParagraph = document.querySelector('#cryptoinfo');

const formatNumber = num => {
  let numSplit, int, dec;

  num = Math.abs(num);
  num = num.toFixed(2);
  numSplit = num.split('.');

  int = numSplit[0];

  if (int.length > 3) {
    for (let i = 3; i < int.length; i += 4) {
      int = int.substr(0, int.length - i) + ',' + int.substr(int.length - i, i);
    }
  }  
  dec = numSplit[1];

  return `${int}.${dec}`;
};

async function getPriceAndMcap() {
  try {
    const result = await fetch 
    (`https://api.coingecko.com/api/v3/coins/high-performance-blockchain`);
    const data = await result.json();
    const price = data.market_data.current_price.usd;
    const marketCap = data.market_data.market_cap.usd;
    const coinInfo = `The current price of High Performance Blockchain is $${formatNumber(price)} with a current market Cap of $${formatNumber(marketCap)}`;
    return coinInfo;
  } catch(error) {
    console.log(error);
  }
}

getPriceAndMcap().then(result => {
  const newContent = `<p class='text-info text-center mt-5' id='cryptoinfo'>${result}</p>`;
  coinInfoParagraph.insertAdjacentHTML('afterbegin', newContent);
});

function simulateFuturePrice() {
  button.addEventListener('click', function() {
    portfolioAmount = (marketCap.value / circulationSupply.value)*tokenQuantity.value;
    hpbFuturePrice = (marketCap.value / circulationSupply.value);
    result.textContent = `
      Your hpb portfolio will worth $${formatNumber(portfolioAmount)} USD. With the Marketcap and the Circulation Supply specified, HPB Token will worth ${formatNumber(hpbFuturePrice)} USD
    `;
  });
}

simulateFuturePrice();