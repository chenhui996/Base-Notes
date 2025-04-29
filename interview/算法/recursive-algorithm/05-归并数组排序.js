const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// -------------------------------------------

// 辅助函数区

// 合并 两个有序数组 为 一个有序数组
function merge (arr, left, mid, right) {
  const temp = [] // 当前排序数组

  // 初始化状态
  let c = 0 // temp 的索引指针，每次塞完新元素，需要 + 1
  let i = left // 遍历 左数组 起始索引
  let j = mid + 1 // 遍历 右数组 起始索引

  // 双指针 遍历比较 排序
  while (i <= mid && j <= right) {
    if (arr[i] >= arr[j]) {
      temp[c] = arr[j]
      c++
      j++
    } else {
      temp[c] = arr[i]
      c++
      i++
    }
  }

  // 处理剩余元素

  // 左侧可能有 剩余元素 时
  while (i <= mid) {
    temp[c] = arr[i]
    c++
    i++
  }

  // 右侧可能有 剩余元素 时
  while (j <= right) {
    temp[c] = arr[j]
    c++
    j++
  }

  // 将 temp 根据索引，覆盖 arr 上的元素，实现对 原数组的排序
  for (let i = 0; i <= temp.length - 1; i++) {
    arr[i + left] = temp[i]
  }

  return
}

// 递归函数
function mergeSort (arr, left, right) {
  // 确定终止条件（最底层简单结果）
  if (left === right) return
  // 初始化状态（可选）
  const mid = Math.floor((left + right) / 2)

  // 主流程 递归调用区
  mergeSort(arr, left, mid)
  mergeSort(arr, mid + 1, right)

  // 随着return，逐个合并递归结果（可选）
  merge(arr, left, mid, right)
  return
}

// 入口函数
function sortArray (arr = []) {
  mergeSort(arr, 0, arr.length - 1)
  return
}

// -------------------------------------------

rl.on('line', message => {
  message = JSON.parse(message)

  if (
    message &&
    Object.prototype.toString.call(message) === '[object Array]' &&
    message.every(n => typeof n === 'number' && !isNaN(n))
  ) {
    console.log('输入为纯数字数组 - 排序前:', message)

    // 主流程执行区
    sortArray(message)

    // 最终结果输出区
    console.log('输入为纯数字数组 - 排序后:', message)
  } else {
    console.log('输入类型不是 number[]:', message)
    rl.close()
  }
})
