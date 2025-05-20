const fs = require("fs");
const fileName = "tasks.json";

let todos = [];
if (fs.existsSync(fileName)) {
  todos = JSON.parse(fs.readFileSync(fileName, "utf-8"));
}

const command = process.argv[2];


// daftar pekerjaan
if (command === "list") {
  console.log("Daftar pekerjaan:");
  if (todos.length === 0) {
    console.log("Tidak ada pekerjaan.");
  } else {
    todos.forEach((todo, i) => {
      const status = todo.completed ? "[x]" : "[ ]";
      console.log(`${i + 1}. ${status} ${todo.task}`);
    });
  }
}

// tambah pekerjaan baru
else if (command === "add") {
  const task = process.argv.slice(3).join(" ");
  if (!task) {
    console.log("Tolong masukan pekerjaan yang ingin ditambahkan.");
  } else {
    todos.push({
      task,
      completed: false,
      createdAt: new Date().toISOString(),
      tags: [],
    });
    fs.writeFileSync(fileName, JSON.stringify(todos, null, 2));
    console.log(`"${task}" telah ditambahkan.`);
  }
}

// hapus pekerjaan
else if (command === "delete") {
  const index = parseInt(process.argv[3]) - 1;
  if (isNaN(index) || index < 0 || index >= todos.length) {
    console.log(todos.length);
    console.log("ID Pekerjaan tidak valid.");
  } else {
    const removed = todos.splice(index, 1)[0];
    fs.writeFileSync(fileName, JSON.stringify(todos, null, 2));
    console.log(`"${removed.task}" telah dihapus dari daftar.`);
  }
}

// pekerjaan selesai
else if (command === "complete") {
  const id = parseInt(process.argv[3]) - 1;
  if (isNaN(id) || id < 0 || id >= todos.length) {
    console.log("ID Pekerjaan tidak valid.");
  } else {
    todos[id].completed = true;
    fs.writeFileSync(fileName, JSON.stringify(todos, null, 2));
    console.log(`"${todos[id].task}" telah  selesai.`);
  }
}


// perintah
else {
  console.log(">>> JS TODO <<<");
  console.log("$ node tugas13.js <command>");
  console.log("$ node tugas13.js list");
  console.log("$ node tugas13.js add <task_content>");
  console.log("$ node tugas13.js delete <task_id>");
  console.log("$ node tugas13.js complete <task_id>");
  console.log("$ node tugas13.js uncomplete <task_id>");
}
