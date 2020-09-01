function showOrHide(
  el: Element,
  attr: string,
  value: "block" | "none" | number
) {
  //
}

let div = document.querySelector("div");

if (div) {
  showOrHide(div, "display", "none");
  showOrHide(div, "opacity", 1);
  // 由于咱css比较6，主观上不会写错;
  // 但是ts就是给写错的时候准备的;
  // 假设写成：showOrHide( div, 'display', 1 );
  // 就报错了;
}
// 所以，对于这个例子，我们需要的是'一对对正确的'css样式'组合';
// 不能随便拼接

// 我们来看看'函数重载'

// display的情况
function showOrHide2(el: HTMLElement, attr: "display", value: "block" | "none");
// opacity的情况
function showOrHide2(el: HTMLElement, attr: "opacity", value: number);
// 其他情况
function showOrHide2(el: HTMLElement, attr: any, value: any) {
    el.style[attr] = value;
}

let div2 = document.querySelector("div");

if (div2) {
  showOrHide2(div2, "display", "none");
  showOrHide2(div2, "opacity", 1);
  // err
  // showOrHide2(div2, "opacity", "none");
}
