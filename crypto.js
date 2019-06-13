/* eslint-disable no-undef */
/* eslint-disable no-console */
let portfolioAmount;
let hpbFuturePrice;
let button;

// const marketCap = document.getElementById('marketcapInput');
// const circulatingSupply = document.getElementById('circulatingSupplyInput');
// const tokenQuantity = document.getElementById('tokenquantityInput');

const marketCapInput = new AutoNumeric('#marketcapInput', { noEventListeners: false });
const circSupplyInput = new AutoNumeric('#circulatingSupplyInput', {
  noEventListeners: false,
});
const tokenQuantityInput = new AutoNumeric('#tokenquantityInput', { noEventListeners: false });
const result = document.querySelector('#resultParagraph');
const coinInfoParagraph = document.querySelector('#cryptoinfo');
/* eslint-disable no-const-assign */

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

      // get current price in USD
      const currentPrice = data.market_data.current_price.usd;
      // Hardcode current CircSupply due to false circSupply data from API
      const currentCirculatingSupply = 42046512;
      // calculate the real mcap with the real circulating supply ( not from API )
      const currentMarketCap = currentPrice * currentCirculatingSupply;
      // get current price in BTC
      const satoshiPrice = data.tickers[4].converted_last.btc;
      // get Ath In BTC
      const athInBtc = data.market_data.ath.btc;
      // get Ath in USD
      const athInUsd = data.market_data.ath.usd;
      // get 24H traded volume
      const volumeIn24H = data.market_data.total_volume.usd;
      // get valuechange in 24h ( USD )
      const usdValueChangeIn24H = data.market_data.price_change_percentage_24h_in_currency.usd;
      // get valuechange in 24h ( BTC )
      const btcValueChangeIn24H = data.market_data.price_change_percentage_24h_in_currency.btc;
      // get current mcap rank
      const marketCapRank = data.market_cap_rank;

      // Display all data
      const coinInfo = `The current price of High Performance Blockchain is $${formatNumber(
        currentPrice,
        4,
      )} ( Ƀ${satoshiPrice.toFixed(8)} ) with a current market cap of $${formatNumber(
        currentMarketCap,
        2,
      )} and a current circulating supply of ${formatNumber(
        currentCirculatingSupply,
        2,
      )} tokens.<br>
      USD Value change in 24 Hours : ${formatNumber(usdValueChangeIn24H, 2)} % <br>
      BTC Value change in 24 Hours : ${formatNumber(btcValueChangeIn24H, 2)} % <br>
      ATH in USD : $${athInUsd} <br>
      ATH in BTC : Ƀ${formatNumber(athInBtc, 8)} <br>
      Volume in 24 Hours : $${volumeIn24H} <br>
      HPB market cap rank #${marketCapRank}
      `;

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

// Function created to calculate the future value of HPB Price and Porfolio

function simulateFuturePrice() {
  const mc = marketCapInput.getNumber();
  const cs = circSupplyInput.getNumber();
  const tq = tokenQuantityInput.getNumber();
  portfolioAmount = (mc / cs) * tq;
  hpbFuturePrice = mc / cs;

  result.textContent = `
      Your HPB portfolio will worth $${formatNumber(
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
