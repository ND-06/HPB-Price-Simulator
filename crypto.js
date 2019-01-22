var portfolioAmount = '';
var hpbPrice = '';

var input = document.querySelectorAll('input');

for (var i = 0; i < input.length; i++) {
  input[i].addEventListener('click', function() { 

  })
};

var result = document.querySelector('#resultParagraph');
var button = document.querySelector('button');
button.addEventListener('click', function() {
  portfolioAmount =  (input[0].value / input[1].value)*input[2].value;
  hpbPrice = (input[0].value / input[1].value);
  result.textContent = 'Your hpb portfolio will worth' + ' ' + portfolioAmount + ' ' + 'USD.' + ' ' +
  'With the Marketcap and the Circulation Supply specified, HPB Token will worth' + ' ' + hpbPrice 
  + ' ' + 'USD';
});






