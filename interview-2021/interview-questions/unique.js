// 传统方式（数组去重）

// 测试用例
const arr = [30, 30, 10, 10, 20, 30, 40, 10, 50, 50];

function unique(arr) {
  const res = [];
  arr.forEach((item) => {
    if (res.indexOf(item) < 0) {
      res.push(item);
    }
  });
  return res;
}

console.log(unique(arr)); // [ 30, 10, 20, 40, 50 ]
