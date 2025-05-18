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
  // membuat interface readline

  input: process.stdin, // membaca input // objek konfigurasi
  output: process.stdout, // menampilkan output
  prompt: "tulis kalimatmu disini > ",
});

rl.prompt(); // menampilkan teks prompt di terminal

rl.on("line", (line) => {
  // menangkap input dari readline
  const hasil = sentencesManipulation(line); // memproses input pengguna
  console.log(`hasil konversi: ${hasil}`);
  rl.prompt(); // menampilkan prompt lagi
});

rl.on("close", () => {
  console.log("Good bye!");
});

