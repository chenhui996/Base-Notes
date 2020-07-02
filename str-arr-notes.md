字符串、数组：细节扫盲、api 笔记;

# str[index]:

- 通过 str[index]取值有兼容性问题，IE8 以下无法使用;

# charAt():

- api 效果:查找'字符串'或'数组'索引下标的值;
- str.charAt(index):
  - str 代表字符串或数组;
  - index 代表索引值,若不填 index,()内默认取 0;
  - index 若取值区间不正确，会返回空字符串;

# charCodeAt():

- api 效果:获取字符串或数组的 unicode 编码;
- str.charCodeAt(index);
  - str 代表字符串或数组;
  - index 代表索引值,若不填 index,()内默认取 0;
  - index 若取值区间不正确，会返回 NaN;
- 应用场景：
  - 两者比较;
  - 中文字符串比较;

# fromCharCode():

- api效果:破译unicode编码;
- String.fromCharCode(arr1,arr2,arr3);
    - String代表将unicode码破译成字符串类型;
    - arr1,arr2,arr3分别代表一个unicode码，代表此api可支持多个参数同时破译;
