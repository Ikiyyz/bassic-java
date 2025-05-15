const fs = require("fs");
const readline = require("readline");

const data = JSON.parse(fs.readFileSync("data.json", "utf8"));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  "Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!\n"
);

let index = 0;

function askQuestion() {
  if (index < data.length) {
    rl.question(
      `Pertanyaan: ${data[index].definition}\nTebakan: `,
      (answer) => {
        if (answer.trim().toLowerCase() === data[index].term.toLowerCase()) {
          console.log("Selamat Anda Benar!\n");
          index++;
          askQuestion();
        } else {
          console.log("Wkwkwk, Anda kurang beruntung!\n");
          askQuestion();
        }
      }
    );
  } else {
    console.log("Hore Anda Menang!");
    rl.close();
  }
}

askQuestion();
