function stringManipulation(word) {
  const vokal = "aiueo";
  if (vokal.includes(word[0].toLowerCase())) {
    return word;
  } else {
    return word.slice(1) + word[0] + "nyo";
  }
}

console.log(stringManipulation("ayam"));
console.log(stringManipulation("bebek"));

 