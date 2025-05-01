// 基于基础版 冒泡排序1 而来
function bubbleSort (nums) {
  let isSorted = false // 是否已经排序完成
  for (let i = 0; i < nums.length; i++) {
    isSorted = false
    for (let j = 0; j < nums.length - i; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = temp
        isSorted = true
      }
    }

    if (!isSorted) {
      break
    }
  }

  return nums
}

console.log(bubbleSort([2, 1, 3, 4, 8, 6, 2, 1]))
