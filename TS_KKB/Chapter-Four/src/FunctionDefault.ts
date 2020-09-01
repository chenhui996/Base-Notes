// 定义一个函数，一个显式的数组标注，一个直接给予默认值参数
function sort(items: Array<number>, order = "desc") {
  return items;
}

// order是直接给予默认值的参数，是可选的;
// order可传可不穿，不穿，默认用desc;
sort([1, 2, 3]);

// 在传默认值的情况下，用'联合类型'来限定值
function sort2(items: Array<number>, order: "desc" | "abc" = "desc") {
  return items;
}
