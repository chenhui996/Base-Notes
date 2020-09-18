# Promise之你看得懂的Promise

## Promise源码详解

### 回调地狱

- 曾几何时，我们的代码是这样的:
    - 为了拿到回调的结果;
    - 不得不callback hell;
- 这种环环相扣的代码可以说是相当恶心了;
```js
let fs = require("fs");
fs.readFile("./a.txt", "utf8", function (err, data) {
  fs.readFile(data, "utf8", function (err, data) {
    fs.readFile(data, "utf8", function (err, data) {
      console.log(data);
    });
  });
});
```