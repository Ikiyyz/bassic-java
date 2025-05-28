import { createServer } from "http";
import { parse } from "url";
import { readFileSync, writeFileSync } from "fs";
import querystring from "querystring";

function getData() {
  return JSON.parse(readFileSync("./data.json", "utf-8"));
}

function saveData(data) {
  writeFileSync("./data.json", JSON.stringify(data, null, 2));
}

createServer((req, res) => {
  const { pathname, query } = parse(req.url, true);

  // READ
  if (pathname === "/") {
    const html = readFileSync("./index.html", "utf-8");
    const data = getData();

    const rows = data
      .map((item, i) => {
        return `<tr>
          <td>${i + 1}</td>
          <td>${item.name}</td>
          <td>${item.height}</td>
          <td>${item.weight}</td>
          <td>${item.birthdate}</td>
          <td>${item.married ? "Yes" : "Not Yet"}</td>
          <td>
            <a href="/edit?index=${i}">Update</a> |
            <a href="/delete?index=${i}" onclick="return confirm('apakah anda ingin menghapus?');">Delete</a>
          </td>
        </tr>`;
      })
      .join("");

    const finalHtml = html.replace("{{rows}}", rows);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(finalHtml);
  }

  // FORM ADD
  else if (pathname === "/add") {
    if (req.method === "GET") {
      const html = readFileSync("./form.html", "utf-8")
        .replace("{{title}}", "Adding Data")
        .replace("{{action}}", "/add")
        .replace("{{name}}", "")
        .replace("{{height}}", "")
        .replace("{{weight}}", "")
        .replace("{{birthdate}}", "");

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } else if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const form = querystring.parse(body);
        const newData = {
          name: form.name,
          height: parseInt(form.height), // integer
          weight: parseFloat(form.weight), // float
          birthdate: form.birthdate, // format ISO
          married: form.married === "true",
        };
        const data = getData();
        data.push(newData);
        saveData(data);
        res.writeHead(302, { Location: "/" });
        res.end();
      });
    }
  }

  // FORM EDIT
  else if (pathname === "/edit") {
    const index = parseInt(query.index);
    const data = getData();

    if (req.method === "GET") {
      const item = data[index];
      let html = readFileSync("./form.html", "utf-8");

      html = html
        .replace("{{title}}", "Updating Data")
        .replace("{{action}}", `/edit?index=${index}`)
        .replace("{{name}}", item.name)
        .replace("{{height}}", item.height)
        .replace("{{weight}}", item.weight)
        .replace("{{birthdate}}", item.birthdate)
        .replace("{{selectedTrue}}", item.married ? "selected" : "")
        .replace("{{selectedFalse}}", !item.married ? "selected" : "");

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } else if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const form = querystring.parse(body);
        data[index] = {
          name: form.name,
          height: parseInt(form.height),
          weight: parseFloat(form.weight),
          birthdate: form.birthdate,
          married: form.married === "true",
        };
        saveData(data);
        res.writeHead(302, { Location: "/" });
        res.end();
      });
    }
    // DELETE
  } else if (pathname === "/delete") {
    const index = parseInt(query.index);
    const data = getData();
    data.splice(index, 1);
    saveData(data);
    res.writeHead(302, { Location: "/" });
    res.end();
  } else if (pathname === "/style.css") {
    const css = readFileSync("./style.css", "utf-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    res.end(css);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
}).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
