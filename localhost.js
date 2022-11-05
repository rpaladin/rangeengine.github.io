// Import Modules
let PATH = require("path");
    FS = require("fs");
    HTTP = require("http");
    URL = require("url");
    PORT = process.argv[2] || 80,
    WEBPAGES = ["/404", "/download", "/about", "/changelog", "/changelog10",  "/store"];
    MIME_TYPES = {
      "html": "text/html",
      "css": "text/css",
      "js": "text/javascript",
      "ico": "image/vnd.microsoft.icon",
      "svg": "image/svg+xml",
      "png": "image/png",
      "jpeg": "image/jpeg",
      "jpg": "image/jpeg",
      "gif": "image/gif",
      "webp": "image/webp",
      "mp4": "video/mp4",
      "webm": "video/webm",
      "json": "application/json"
    };
// Function - Compile Notes
function compileHTML() {
  FS.readdir("templates/", (err, file) => {
    file.forEach(file => {
      if (PATH.extname(file) === ".html") {
        if (PATH.basename(file) !== "navbar.html" && PATH.basename(file) !== "footer.html") {
          let n = FS.readFileSync("templates/navbar.html", "utf8");
          let f = FS.readFileSync("templates/footer.html", "utf8");
          let m = FS.readFileSync("templates/" + file, "utf8");
          FS.writeFileSync(file, n + "\n" + m + "\n" + f);
        }
      }
    });
  });
}
// Compile - Init
compileHTML();
// Compile - On Detected Changes
let fsTimeout;
FS.watch("templates/", {recursive: true}, e => {
  if (!fsTimeout) {
    compileHTML();
    fsTimeout = setTimeout(function() { fsTimeout=null; }, 1000);
  }
});
// Create Server
HTTP.createServer(function(req, res) {
  // Variables
  let URI = URL.parse(req.url).pathname, 
      fileName = PATH.join(process.cwd(), URI);
  // 302 - Redirect Valid URLs
  if (URI === "" || URI === "/") {
    fileName = "index.html";
  } else if (WEBPAGES.includes(URI)) {
    fileName += ".html";
  }
  FS.exists(fileName, function(exists) {
    // Get Extension Types
    let mimeType = MIME_TYPES[fileName.split(".").pop()];
    if (!mimeType) {
      mimeType = "text/plain";
    }
    if (exists) {
      // 200 - OK success
      res.writeHead(200, { "Content-Type": mimeType });
      FS.readFile(fileName, function (err, data) {
        res.end(data);
      });
    } else {
      // 404 - Page Not Found
      fileName = "404.html";
      res.writeHead(404, { "Content-Type": "text/html" });
      FS.readFile(fileName, function (err, data) {
        res.end(data);
      });
    }
  });
}).listen(parseInt(PORT, 10));
console.log("Server started on PORT: [" + PORT + "]");