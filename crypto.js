var portfolioAmount = '';
var hpbPrice = '';
var marketCap = '';
var circulationSupply = '';
var tokenQuantity = '';

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
});






