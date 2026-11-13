const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "..", "logs", "requests.log");

function logger(req, res, next) {
  const time = new Date().toISOString();
  const line = "[" + time + "] " + req.method + " " + req.originalUrl;

  console.log(line);

  fs.appendFile(logFile, line + "\n", (err) => {
    if (err) {
      console.log("Log dosyasına yazılamadı");
    }
  });

  next();
}

module.exports = logger;
