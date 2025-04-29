function multiply (A, B) {
  // 确定终止条件（最底层简单结果
  if (B === 1) return A
  if (B === 0) return 0

  // 初始化状态（可选）

  // 主流程 递归调用区
  const result = multiply(A, Math.floor(B / 2)) // Olngn

  // 随着return，逐个合并递归结果（可选）
  if (B % 2 === 0) {
    return result + result
  } else {
    return A + result + result
  }
}

console.log(multiply(3, 5))
