function deretKaskus(n) {
   let result = []; // [3, 'KUS', 9, 'KUS', 'KAS', 'KUS', 21, 'KUS', 27, 'KASKUS']
 
   for (let i = 1; i <= n; i++) {
     let angka = i * 3;

     console.log(angka)
 
     if (angka % 5 === 0 && angka % 6 === 0) {
       result.push("KASKUS");
     } else if (angka % 5 === 0) {
       result.push("KAS");
     } else if (angka % 6 === 0) {
       result.push("KUS");
     } else {
       result.push(angka);
     }
   }
 
   return result;
 }
 
 console.log(deretKaskus(10));