function indexPrime(param1) {
  let primes = []; // [2, 3, 5, 7]
  let num = 2; // 7

  while (primes.length < param1) { //4 < 4
    let isPrime = true;

    // console.log(primes.length)

    // let hitung = 5;
    // console.log(Math.sqrt(hitung));

    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      primes.push(num);
    }

    num++;
  }

  return primes[param1 - 1];
}

console.log(indexPrime(4));
// console.log(indexPrime(500));  // 3571
// console.log(indexPrime(37786)); // 450881
