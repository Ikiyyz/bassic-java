import { existsSync, readFileSync, writeFileSync } from "fs";
const fileName = "tasks.json";

let todos = [];
if (existsSync(fileName)) {
  todos = JSON.parse(readFileSync(fileName, "utf-8"));
}

const command = process.argv[2];

// semua daftar pekerjaan
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

// task berdasarkan id
else if (command === "task") {
  const id = parseInt(process.argv[3]) - 1;
  if (isNaN(id) || id < 0 || id >= todos.length) {
    console.log("ID Pekerjaan tidak valid.");
  } else {
    const todo = todos[id];
    const status = todo.completed ? "[x]" : "[ ]";
    console.log(`${id + 1}. ${status} ${todo.task}`);
  }
}

// tambah task
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
    writeFileSync(fileName, JSON.stringify(todos, null, 2));
    console.log(`"${task}" telah ditambahkan.`);
  }
}

// hapus task
else if (command === "delete") {
  const index = parseInt(process.argv[3]) - 1;
  if (isNaN(index) || index < 0 || index >= todos.length) {
    console.log("ID Pekerjaan tidak valid.");
  } else {
    const removed = todos.splice(index, 1)[0];
    writeFileSync(fileName, JSON.stringify(todos, null, 2));
    console.log(`"${removed.task}" telah dihapus.`);
  }
}

// selesai
else if (command === "complete") {
  const id = parseInt(process.argv[3]) - 1;
  if (isNaN(id) || id < 0 || id >= todos.length) {
    console.log("ID Pekerjaan tidak valid.");
  } else {
    todos[id].completed = true;
    writeFileSync(fileName, JSON.stringify(todos, null, 2));
    console.log(`"${todos[id].task}" telah selesai.`);
  }
}

//  belum selesai
else if (command === "uncomplete") {
  const id = parseInt(process.argv[3]) - 1;
  if (isNaN(id) || id < 0 || id >= todos.length) {
    console.log("ID Pekerjaan tidak valid.");
  } else {
    todos[id].completed = false;
    writeFileSync(fileName, JSON.stringify(todos, null, 2));
    console.log(`"${todos[id].task}" dikembalikan menjadi belum selesai.`);
  }
}

// list outstanding (belum selesai) dengan asc/desc
else if (command === "list:outstanding") {
  const order = process.argv[3] || "asc";
  const filtered = todos
    .filter((todo) => !todo.completed)
    .sort((a, b) =>
      order === "desc"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
  if (filtered.length === 0) {
    console.log("Tidak ada pekerjaan yang belum selesai.");
  } else {
    filtered.forEach((todo, i) => {
      console.log(`${i + 1}. [ ] ${todo.task}`);
    });
  }
}

// list completed dengan asc/desc
else if (command === "list:completed") {
  const order = process.argv[3] || "asc";
  const filtered = todos
    .filter((todo) => todo.completed)
    .sort((a, b) =>
      order === "desc"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
  if (filtered.length === 0) {
    console.log("Tidak ada pekerjaan yang sudah selesai.");
  } else {
    filtered.forEach((todo, i) => {
      console.log(`${i + 1}. [x] ${todo.task}`);
    });
  }
}


// tambah tag ke task
else if (command === "tag") {
  const id = parseInt(process.argv[3]) - 1;
  const inputTags = process.argv.slice(4);

  if (isNaN(id) || id < 0 || id >= todos.length || inputTags.length === 0) {
    console.log("ID atau tag tidak valid.");
  } else {
    todos[id].tags = todos[id].tags || [];

    const added = [];
    const skipped = [];

    inputTags.forEach(tag => {
      if (!todos[id].tags.includes(tag)) {
        todos[id].tags.push(tag);
        added.push(tag);
      } else {
        skipped.push(tag);
      }
    });

    writeFileSync(fileName, JSON.stringify(todos, null, 2));

    if (added.length)
      console.log(`Tag ${added.join(", ")} telah ditambahkan ke "${todos[id].task}"`);

    if (skipped.length)
      console.log(`Tag ${skipped.join(", ")} sudah ada, tidak ditambahkan lagi.`);
  }
}



// filter berdasarkan tag (case-insensitive)
else if (command?.toLowerCase().startsWith("filter:")) {
  const tagToFilter = command.split(":")[1]?.toLowerCase();

  if (!tagToFilter) {
    console.log("Tolong masukkan nama tag yang ingin difilter. Contoh:");
    console.log("$ node todo.js filter:Belajar");
  } else {
    const filtered = todos.filter(todo =>
      todo.tags.some(tag => tag.toLowerCase() === tagToFilter)
    );

    if (filtered.length === 0) {
      console.log(`Tidak ada pekerjaan dengan tag "${tagToFilter}".`);
    } else {
      console.log(`Daftar pekerjaan dengan tag "${tagToFilter}":`);
      filtered.forEach((todo, i) => {
        const status = todo.completed ? "[x]" : "[ ]";
        console.log(`${i + 1}. ${status} ${todo.task}`);
      });
    }
  }
}


// help
else {
  console.log(">>> JS TODO <<<");
  console.log("$ node tugas13.js <command>");
  console.log("$ node tugas13.js list");
  console.log("$ node tugas13.js task <task_id>");
  console.log("$ node tugas13.js add <task_content>");
  console.log("$ node tugas13.js delete <task_id>");
  console.log("$ node tugas13.js complete <task_id>");
  console.log("$ node tugas13.js uncomplete <task_id>");
  console.log("$ node tugas13.js list:outstanding asc|desc");
  console.log("$ node tugas13.js list:completed asc|desc");
  console.log("$ node tugas13.js tag <task_id> <tag_name_1> ... <tag_name_N>");
  console.log("$ node tugas13.js filter:<tag_name>");
}
