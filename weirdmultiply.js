function weirdMultipy(number) {
  if (number < 10) { 
    return number;
  }

  let product = 1;

  let digits = number.toString(); "14"
  console.log(digits);

  for (let i = 0; i < digits.length; i++) {
    product *= parseInt(digits[i]); 
  }

  return weirdMultipy(product); 
}

console.log(weirdMultipy(39)); // Output: 4
console.log(weirdMultipy(999)); // Output: 2
console.log(weirdMultipy(3)); // Output: 3
