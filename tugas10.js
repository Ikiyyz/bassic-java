const readline = require("readline");

function sentencesManipulation(sentence) {
  const vokal = "aiueo";
  const words = sentence.split(" ");
  let hasil = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (vokal.includes(word[0].toLowerCase())) {
      hasil.push(word);
    } else {
      hasil.push(word.slice(1) + word[0] + "nyo");
    }
  }

  return hasil.join(" ");
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "tulis kalimatmu disini > ",
});

rl.prompt();

rl.on("line", (line) => {
  const hasil = sentencesManipulation(line);
  console.log(`hasil konversi: ${hasil}`);
  rl.prompt();
});

rl.on("close", () => {
  console.log("Good bye!");
});
