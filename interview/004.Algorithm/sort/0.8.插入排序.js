// 插入排序：从第二个元素开始，每次将当前元素与前一个比较，如果顺序不对就交换并继续往前比较，直到找到合适的位置插入，这样逐个处理直到所有元素有序。
// 当数字少于两个时，不存在排序问题，当然也不需要插入，所以：直接从第二个数字开始往前插入。
function insertSort (arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i
    while (j >= 1 && arr[j - 1] > arr[j]) {
      const temp = arr[j - 1]
      arr[j - 1] = arr[j]
      arr[j] = temp

      j--
    }
  }

  return arr
}

console.log(insertSort([2, 1, 3, 4, 8, 6, 2, 1]))
