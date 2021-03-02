// 手写防抖 debounce 函数
function debounce(fn, delay = 500) {
  // timer 是闭包中
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

const input1 = document.getElementById("input");

input1.addEventListener(
  "keyup",
  debounce(function () {
    console.log(input1.value);
  }),
  600
);
