// 基于基础版 冒泡排序2而来
function bubbleSort (nums) {
  const n = nums.length - 1
  let isSorted
  let lastSortIndex = n
  let isSortedIndex = -1

  for (let i = 0; i <= n; i++) {
    isSorted = false
    for (let j = 0; j <= lastSortIndex; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = temp

        isSorted = true
        isSortedIndex = j
      }
    }

    lastSortIndex = isSortedIndex

    if (!isSorted) {
      break
    }
  }

  return nums
}

console.log(bubbleSort([2, 1, 3, 4, 8, 6, 2, 1]))
