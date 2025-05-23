// 冒泡排序：反复比较相邻的两个元素，如果顺序不对就交换它们，这样每一轮都会把当前最大的元素‘冒泡’到最后，经过多轮比较后整个数组就有序了。
function bubbleSort (nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = temp
      }
    }
  }

  return nums
}

console.log(bubbleSort([2, 1, 3, 4, 8, 6, 2, 1]))
