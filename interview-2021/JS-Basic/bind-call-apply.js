// 模拟bind
Function.prototype.bind1 = function () {
  // 将参数拆解为数组
  const args = Array.prototype.slice.call(arguments);

  // 获取 this （数组第一项）
  const t = args.shift();

  // 此函数本身
  const self = this;

  return function () {
    return self.apply(t, args);
  };
};

// 模拟call
Function.prototype.call1 = function (context) {
  // 若不是函数类型调用，报错
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  const args = [...arguments];
  args.shift();
  context = context || window;
  context.fn = this;
  const result = context.fn(args);
  delete context.fn;
  return result;
};

// 模拟 apply
Function.prototype.apply1 = function (context) {
  // 若不是函数类型调用，报错
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  context = context || window;
  context.fn = this;
  let result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
