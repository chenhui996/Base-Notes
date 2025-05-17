// 本 demo 特点：使用 位运算 避免使用临时变量（大厂有考过
function bubbleSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i; j++) {
      if (nums[j] > nums[j + 1]) {
        nums[j] = nums[j] ^ nums[j + 1];
        nums[j + 1] = nums[j + 1] ^ nums[j];
        nums[j] = nums[j] ^ nums[j + 1];

        // 解析：
        // 1. 
        // 因为第一行：nums[j] = nums[j] ^ nums[j + 1]
        // 所以第二行：nums[j + 1] = nums[j + 1] ^ (nums[j] ^ nums[j + 1]) = nums[j + 1] ^ nums[j + 1] ^ nums[j]
        // 根据 自反性 得出：nums[j + 1] ^ nums[j + 1] = 0
        // 根据与 0 异或​​性，得到自身，得出： 0 ^ nums[j] = nums[j]
        // 最终得出 nums[j + 1] = nums[j]
        // 2.
        // 顾得出第三行：nums[j] = nums[j] ^ nums[j + 1] = (nums[j] ^ nums[j + 1]) ^ nums[j]
        // 根据结合律和自反性得出：(nums[j] ^ nums[j + 1]) ^ nums[j] = nums[j] ^ nums[j] ^ nums[j + 1] = 0 ^ nums[j + 1]
        // 最终得出：nums[j] = nums[j + 1]
        // 交换完毕。
      }
    }
  }

  return nums
}

console.log(bubbleSort([2, 1, 3, 4, 8, 6, 2, 1]))
