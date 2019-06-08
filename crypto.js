/* eslint-disable no-console */
let portfolioAmount;
let hpbFuturePrice;
let button;

const marketCap = document.getElementById('marketcapInput');
const circulatingSupply = document.getElementById('circulatingSupplyInput');
const tokenQuantity = document.getElementById('tokenquantityInput');
const result = document.querySelector('#resultParagraph');
const coinInfoParagraph = document.querySelector('#cryptoinfo');

const formatNumber = (num, rounder) => {
  // eslint-disable-next-line no-param-reassign
  num = Math.abs(num);
  // eslint-disable-next-line no-param-reassign
  num = num.toFixed(rounder);
  const numSplit = num.split('.');

  // eslint-disable-next-line prefer-destructuring
  let int = numSplit[0];
  if (int.length > 3) {
    for (let i = 3; i < int.length; i += 4) {
      int = `${int.substr(0, int.length - i)},${int.substr(int.length - i, i)}`;
    }
  }
  const dec = numSplit[1];
  return `${int}.${dec}`;
};

function refresh() {
  async function getPriceAndMcap() {
    try {
      const dataResult = await fetch(
        'https://api.coingecko.com/api/v3/coins/high-performance-blockchain',
      );
      const data = await dataResult.json();
      // get current price in BTC
      const satoshiPrice = data.tickers[4].converted_last.btc;
      // get current circulating supply
      const currentCirculatingSupply = data.market_data.circulating_supply;
      // get current price
      const athInBtc = data.market_data.ath.btc;
      const athInUsd = data.market_data.ath.usd;
      const price = data.market_data.current_price.usd;
      const valueChangeIn24H = data.market_data.price_change_percentage_24h_in_currency.usd;
      const roundedValueChangeIn24H = valueChangeIn24H.toFixed(2);
      // get current mcap
      const marketCapInfo = data.market_data.market_cap.usd;
      // get current mcap rank
      const marketCapRank = data.market_cap_rank;

      // Display all data
      const coinInfo = `The current price of High Performance Blockchain is $${formatNumber(
        price,
        6,
      )} ( Ƀ${satoshiPrice} ) with a current market cap of $${formatNumber(
        marketCapInfo,
        2,
      )} and a current circulating supply of ${formatNumber(
        currentCirculatingSupply,
        2,
      )} tokens.<br>
      All Time High in USD : $${athInUsd} <br>
      All Time High in BTC : Ƀ${athInBtc} <br>
      Value change in 24 Hours : ${roundedValueChangeIn24H} % <br>
      HPB market cap rank #${marketCapRank}`;
      return coinInfo;
    } catch (error) {
      return error;
    }
  }
  // eslint-disable-next-line no-shadow
  getPriceAndMcap().then((result) => {
    // Cleaning our DOM before refreshing
    coinInfoParagraph.innerHTML = '';

    const newContent = `<p class='text-center mt-5' id='cryptoinfo'>${result}</p>`;
    coinInfoParagraph.insertAdjacentHTML('afterbegin', newContent);
  });
}

function simulateFuturePrice() {
  portfolioAmount = (marketCap.value / circulatingSupply.value) * tokenQuantity.value;
  hpbFuturePrice = marketCap.value / circulatingSupply.value;
  result.textContent = `
      Your hpb portfolio will worth $${formatNumber(
    portfolioAmount,
    2,
  )}. With the market cap and the circulating supply specified, HPB token will worth $${formatNumber(
  hpbFuturePrice,
  2,
)}
    `;
}

const setupEventListeners = () => {
  document.addEventListener('keypress', (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      simulateFuturePrice();
      event.preventDefault();
    }
  });
  button = document.querySelector('button');
  button.addEventListener('click', simulateFuturePrice);
};

setupEventListeners();

window.setInterval(() => {
  refresh();
}, 650);
