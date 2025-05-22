// 215. 数组中的第 K 个最大元素
function findKthLargest (nums, k) {
  if (nums.length < k) {
    return
  }

  let maxIndex
  for (let i = 0; i < k; i++) {
    maxIndex = i
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[maxIndex] < nums[j]) {
        maxIndex = j
      }
    }

    let temp = nums[i]
    nums[i] = nums[maxIndex]
    nums[maxIndex] = temp
  }

  return nums[k - 1]
}

console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4))
