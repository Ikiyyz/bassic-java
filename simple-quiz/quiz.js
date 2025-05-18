const fs = require("fs");
const readline = require("readline");

const fileName = process.argv[2];

if (!fileName) {
  console.log("Tolong sertakan nama file sebagai inputan soalnya");
  console.log("misalnya node tugas12.js data.json");
  process.exit(1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(fileName, "utf-8"));
} catch (err) {
  console.log(`File ${fileName} tidak ditemukan`);
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  "Selamat datang di permainan Tebak-tebakan, kamu akan diberikan pertanyaan dari file ini '" +
    fileName +
    "'."
);
console.log("Untuk berhenti, jawab dengan jawaban yang sesuai.");
console.log(
  "Gunakan 'skip' untuk menangguhkan pertanyaan, dan di akhir pertanyaan akan ditanyakan lagi.\n"
);

let index = 0;
let salah = 0;
let skipped = [];

function askQuestion() {
  if (index >= data.length) {
    if (skipped.length > 0) {
      data = skipped;
      skipped = [];
      index = 0;
      salah = 0;
      askQuestion();
      return;
    } else {
      console.log("Anda Berhasil!");
      rl.close();
      return;
    }
  }

  rl.question(`Pertanyaan: ${data[index].definition}\nJawaban: `, (answer) => {
    if (answer.trim().toLowerCase() === data[index].term.toLowerCase()) {
      console.log("Anda Beruntung!\n");
      index++;
      salah = 0;
      askQuestion();
    } else if (answer.trim().toLowerCase() === "skip") {
      skipped.push(data[index]);
      index++;
      salah = 0;
      askQuestion();
    } else {
      salah++;
      console.log(
        `Anda Kurang Beruntung! anda telah salah ${salah} kali, silahkan coba lagi.`
      );
      askQuestion();
    }
  });
}

askQuestion();
