var input = document.querySelectorAll('input');
console.log(input);

for (var i = 0; i < input.length; i++) {
  console.log(input[i]);
  input[i].addEventListener('click', function() {
    alert('connected');
  })
};


function calculatePrice(price, quantity) {
  return price * quantity;
};

console.log(calculatePrice(100,1000));





