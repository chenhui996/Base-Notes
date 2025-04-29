function DgNumber (number) {
  // 确定终止条件（最底层简单结果）
  if (number === 1) {
    return 1
  }

  // 初始化状态（可选） -> 本例子不需要

  // 主流程 递归调用区
  const subResult = DgNumber(number - 1)

  // 随着return，逐个合并递归结果（可选）
  return number * subResult
}

console.log(DgNumber(5));

// factorial(5)
// = 5 * factorial(4)
// = 5 * 4 * factorial(3)
// = 5 * 4 * 3 * factorial(2)
// = 5 * 4 * 3 * 2 * factorial(1)
// = 5 * 4 * 3 * 2 * 1  // 触发终止条件
// = 120
