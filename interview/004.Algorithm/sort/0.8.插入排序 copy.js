// 插入排序：从第二个元素开始，每次将当前元素与前一个比较，如果顺序不对就交换并继续往前比较，直到找到合适的位置插入，这样逐个处理直到所有元素有序。
// 当数字少于两个时，不存在排序问题，当然也不需要插入，所以：直接从第二个数字开始往前插入。
function insertSort (arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentNumber = arr[i]
    let j = i - 1
    // 寻找插入位置的过程中，不断地将比 currentNumber 大的数字向后挪
    while (j >= 0 && currentNumber < arr[j]) {
      arr[j + 1] = arr[j]
      j--
    }
    // 两种情况会跳出循环：1. 遇到一个小于或等于 currentNumber 的数字，跳出循环，currentNumber 就坐到它后面。
    // 2. 已经走到数列头部，仍然没有遇到小于或等于 currentNumber 的数字，也会跳出循环，此时 j 等于 -1，currentNumber 就坐到数列头部。
    arr[j + 1] = currentNumber
  }

  return arr
}

console.log(insertSort([2, 1]))
