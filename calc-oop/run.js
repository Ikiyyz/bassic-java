import { Calculator, PI } from "./calculator.js";

const calc = new Calculator();

// 1 + 10 - 5 = 6
console.log("Hasil 1:", calc.add(10).subtract(5).result());

// 6 + 3 * 4 / 6 = 6
console.log("Hasil 2:", calc.add(3).multiply(4).divide(6).result());

// jari-jari = 7
calc.x = 7;
console.log("nilai sekarang:", calc.x);

// 2 * PI * 7 = 44
console.log("Keliling lingkaran:", calc.multiply(2).multiply(PI).result());

// PI * 7^2 = 154
calc.x = 7;
console.log("Luas lingkaran:", calc.exponent(2).multiply(PI).result());

// 4^3 = 64
calc.x = 4;
console.log("4 pangkat 3:", calc.exponent(3).result());

// kuadrat 64 = 8
console.log("Akar kuadrat dari 64:", calc.squareRoot().result());
