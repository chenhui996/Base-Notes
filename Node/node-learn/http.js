const http = require("http");
const port = 5624;
const hostname = "127.0.0.1";
const server = http.createServer((req, res) => {
    res.write("hello world1");
    res.end();
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });