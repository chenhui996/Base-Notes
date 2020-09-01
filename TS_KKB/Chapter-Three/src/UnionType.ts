function css(el: Element, attr: string, value: string | number) {
  return value;
}

let box = document.querySelector("div");

// 其中，value可能是字符串，也可能是数字

if (box) {
  // 字符串的情况：
  css(box, "width", "100px");

  // 数字的情况
  css(box, "opacity", 1);

}
// 所以，要用到联合类型