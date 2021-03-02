// 数组拍平

// 测试用例
const arr = [[1, 2], 3, [4, 5, [6, 7, [8, 9, [10, 11]]]]];
// 最终效果：[1, 2, 3, 4, 5, 6, 7, 8, 9 , 10, 11]

function flat(arr) {
  // 验证 arr 中，还有没有深层数组 [1, 2, [3, 4]]
  const isDeep = arr.some((item) => item instanceof Array);
  if (!isDeep) {
    return arr; // 最终在此返回
  }
  const res = Array.prototype.concat.apply([], arr);
  return flat(res); // 递归
}

console.log(flat(arr)); // 最终效果：[1, 2, 3, 4, 5, 6, 7, 8, 9 , 10, 11]
