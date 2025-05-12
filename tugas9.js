function spiral(param1) {
  let matrix = [];
  let num = 0;

  for (let i = 0; i < param1; i++) {
    matrix[i] = [];
    for (let j = 0; j < param1; j++) {
      matrix[i][j] = num;
      num++;
    }
  }

  console.log(matrix);

  let result = [];

  let atas = 0;
  let bawah = param1 - 1;
  let kiri = 0;
  let kanan = param1 - 1;

  while (atas <= bawah && kiri <= kanan) {

    for (let i = kiri; i <= kanan; i++) {
      result.push(matrix[atas][i]);
    }
    atas++;

    for (let i = atas; i <= bawah; i++) {
      result.push(matrix[i][kanan]);
    }
    kanan--;

    if (atas <= bawah) {
      for (let i = kanan; i >= kiri; i--) {
        result.push(matrix[bawah][i]);
      }
      bawah--;
    }

    if (kiri <= kanan) {
      for (let i = bawah; i >= atas; i--) {
        result.push(matrix[i][kiri]);
      }
      kiri++;
    }
  }

  return result;
}

console.log(spiral(5));
// console.log(spiral(6));
