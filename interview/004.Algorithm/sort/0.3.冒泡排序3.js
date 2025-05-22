// 基于基础版 冒泡排序2而来
function bubbleSort (nums) {
  const n = nums.length
  let isSorted
  let isSortedIndex = -1 // 当前轮次 最新交换元素 的 索引值
  let prevSortedIndex = n // 上一轮次 最新交换元素 的 索引值

  for (let i = 0; i <= n; i++) {
    isSorted = false
    for (let j = 0; j <= prevSortedIndex; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = temp

        isSorted = true
        isSortedIndex = j
      }
    }

    prevSortedIndex = isSortedIndex

    if (!isSorted) {
      break
    }
  }

  return nums
}

console.log(bubbleSort([2, 1, 3, 4, 8, 6, 2, 1]))
