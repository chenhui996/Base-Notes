function PowNumber (number, pow) {
  // 确定终止条件（最底层简单结果）
  if (pow === 1) return number
  if (pow === 0) return 1

  // 处理负数指数
  if (pow < 0) {
    return 1 / PowNumber(number, -pow)
  }

  // 初始化状态（可选） -> 本例子不需要

  // 主流程 递归调用区
  const subResult = PowNumber(number, Math.floor(pow / 2))

  // 随着return，逐个合并递归结果（可选）
  if (pow % 2 === 0) {
    return subResult * subResult
  } else {
    return number * subResult * subResult
  }
}

console.log(PowNumber(2, 5))
console.log(PowNumber(2, -2))
