// 二元选择排序：每轮找出 最大值 跟 最小值，可以把数组需要遍历的范围缩小 一倍。
function selectionSort (nums) {
  let minIndex = 0
  let maxIndex = 0

  for (let i = 0; i < nums.length / 2; i++) {
    minIndex = i
    maxIndex = i

    for (let j = i + 1; j < nums.length - i; j++) {
      if (nums[minIndex] > nums[j]) {
        minIndex = j
      }

      if (nums[maxIndex] < nums[j]) {
        maxIndex = j
      }
    }

    // 若是二者相等，说明已经排序完成，中间并无任何顺序改变
    if (minIndex === maxIndex) {
      break
    }

    // 将 最小值 调换至 “本轮” 首位
    let temp = nums[i]
    nums[i] = nums[minIndex]
    nums[minIndex] = temp

    // 特殊情况：正好最大值就是刚刚调换的 i，也就是 maxIndex === i，那需要将 maxIndex 指向刚刚顺序改变后的位置
    if (maxIndex === i) {
      maxIndex === minIndex
    }

    // 将 最大值 调换至 “本轮” 尾部
    const lastIndex = nums.length - 1 - i
    temp = nums[lastIndex]
    nums[lastIndex] = nums[maxIndex]
    nums[maxIndex] = temp
  }

  return nums
}

console.log(selectionSort([2, 1, 3, 4, 8, 6, 2, 1]))
