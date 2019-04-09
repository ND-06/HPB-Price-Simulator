let portfolioAmount;
let hpbFuturePrice;
let button;

const marketCap = document.getElementById('marketcapInput');
const circulatingSupply = document.getElementById('circulatingSupplyInput');
const tokenQuantity = document.getElementById('tokenquantityInput');
const result = document.querySelector('#resultParagraph');
const coinInfoParagraph = document.querySelector('#cryptoinfo');

const formatNumber = (num) => {
  // eslint-disable-next-line no-param-reassign
  num = Math.abs(num);
  // eslint-disable-next-line no-param-reassign
  num = num.toFixed(2);
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
      const currentCirculatingSupply = data.market_data.circulating_supply;
      const price = data.market_data.current_price.usd;
      const marketCapInfo = data.market_data.market_cap.usd;
      const coinInfo = `The current price of High Performance Blockchain is $${formatNumber(
        price,
      )} with a current market Cap of $${formatNumber(
        marketCapInfo,
      )} and a current circulating supply of ${formatNumber(currentCirculatingSupply)} tokens.`;
      return coinInfo;
    } catch (error) {
      return error;
    }
  }
  // eslint-disable-next-line no-shadow
  getPriceAndMcap().then((result) => {
    // Cleaning our DOM before refreshing
    coinInfoParagraph.innerHTML = '';

    const newContent = `<p class='text-info text-center mt-5' id='cryptoinfo'>${result}</p>`;
    coinInfoParagraph.insertAdjacentHTML('afterbegin', newContent);
  });
}

function simulateFuturePrice() {
  portfolioAmount = (marketCap.value / circulatingSupply.value) * tokenQuantity.value;
  hpbFuturePrice = marketCap.value / circulatingSupply.value;
  result.textContent = `
      Your hpb portfolio will worth $${formatNumber(
    portfolioAmount,
  )} USD. With the Marketcap and the Circulating Supply specified, HPB Token will worth ${formatNumber(
  hpbFuturePrice,
)} USD
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
