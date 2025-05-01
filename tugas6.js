function sentencesManipulation(sentence) {
  const vokal = "aiueo";
  const words = sentence.split(" "); 
  console.log(words)

  let hasil = []; 

  for (let i = 0; i < words.length; i++) { // 0 < 6
    const word = words[i];

    if (vokal.includes(word[0].toLowerCase())) {
      hasil.push(word);
    } else {
      hasil.push(word.slice(1) + word[0] + "nyo");
    }
  }
  return hasil.join(": ")
}

console.log(sentencesManipulation("ibu pergi ke pasar bersama aku"));
//console.log(sentencesManipulation("saya mau maen futsal"));

