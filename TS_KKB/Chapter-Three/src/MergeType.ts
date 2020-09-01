interface o1 {
  x: number;
  y: string;
}
interface o2 {
  z: boolean;
}

// 由于target转换成es5，故Object.assign会提示报错;
let obj: o1 & o2 = Object.assign({}, { x: 1, y: "cain" }, { z: true });
// 解决方案：
// 在tsconfig.json中:
// target的转换输出成es6;
// 用lib配置第三方库:
// lib:['ES2015']


// 这个时候，obj就拥有x y z三个属性;
// 验证：咱们在ts中引用不会报错，即说明交叉类型使用成功;
obj.x
obj.y
obj.z