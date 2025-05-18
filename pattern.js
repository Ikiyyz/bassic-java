function pola(str) {
  const [left, right] = str.split(" = "); //["42#3 * 188", "80#204"]
  const [num1, num2] = left.split(" * "); //["42#3", "188"]

  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      const newNum1 = num1.replace("#", i); // "4213"
      const newRight = right.replace("#", j); // "800204"

      //console.log(newNum1, newRight);

      if (parseInt(newNum1) * parseInt(num2) === parseInt(newRight)) {
        return [i, j];
      }
    }
  }
  return null;
}

console.log(pola("42#3 * 188 = 80#204")); // [8, 5]
