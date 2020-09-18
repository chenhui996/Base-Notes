let fs = require("fs");
fs.readFile("./a.txt", "utf8", function (err, data) {
  fs.readFile(data, "utf8", function (err, data) {
    fs.readFile(data, "utf8", function (err, data) {
      console.log(data);
    });
  });
});
