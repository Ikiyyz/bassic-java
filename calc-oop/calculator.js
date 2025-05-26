const PI = 22 / 7;

class Calculator {
  constructor() {
    this.x = 1;
  }

  add(value) {
    this.x += value;
    return this;
  }

  subtract(value) {
    this.x -= value;
    return this;
  }

  divide(value) {
    this.x /= value;
    return this;
  }

  multiply(value) {
    this.x *= value;
    return this;
  }

  squareRoot() {
    this.x = Math.sqrt(this.x);
    return this;
  }

  exponent(power) {
    this.x = this.x ** power;
    return this;
  }
  
  result() {
    return this.x;
  }
}

export { Calculator, PI };
