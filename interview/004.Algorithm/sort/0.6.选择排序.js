// 选择排序的思想是：双重循环遍历数组，每经过一轮比较，找到最小元素的下标，将其交换至 "本轮首位"。
function selectionSort (nums) {
  let minIndex
  for (let i = 0; i < nums.length - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[minIndex] > nums[j]) {
        minIndex = j
      }
    }

    // 将最小元素交换至首位
    const temp = nums[i]
    nums[i] = nums[minIndex]
    nums[minIndex] = temp
  }

  return nums
}

console.log(selectionSort([2, 1, 3, 4, 8, 6, 2, 1]))
