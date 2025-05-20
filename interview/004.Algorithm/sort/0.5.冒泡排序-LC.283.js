// 283. 移动零
function moveZero (nums) {
  let zeroCount = 0
  for (let i = 0; i < nums.length - zeroCount; i++) {
    if (nums[i] === 0) {
      // 利用冒泡排序的思想，不断交换，将 0 移动到数组末尾
      for (let j = i; j < nums.length - 1 - zeroCount; j++) {
        const temp = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = temp
      }
      // 末尾多了一个 0，记录下来，以缩小遍历范围
      zeroCount++
      // 下一轮遍历时 i 会增加 1，但此时 nums[i] 已经和 nums[i+1] 交换了，nums[i+1] 还没有判断是否为 0，所以这里先减 1，以使下一轮继续判断 i 位置。
      i--
    }
  }

  return nums
}

console.log(moveZero([0, 1, 0, 3, 12]))
console.log(moveZero([0, 0, 1]))
