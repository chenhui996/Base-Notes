字符串、数组:细节扫盲、api 笔记;

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
- 应用场景:
  - 两者比较;
  - 中文字符串比较;

# fromCharCode():

- api 效果:破译 unicode 编码;
- String.fromCharCode(arr1,arr2,arr3);
  - String 代表将 unicode 码破译成字符串类型;
  - arr1,arr2,arr3 分别代表一个 unicode 码，代表此 api 可支持多个参数同时破译;

# indexOf():

- api 效果:查找'目标对象'中是否有对应的字符串，如果有，返回该'字符串第一次出现'时候对应的'索引值'，若搜索不到，返回-1;
- str.indexOf('searchValue',fromIndex);
  - str 代表被查找的'目标对象';
  - searchValue 代表需查找的值;
  - fromIndex:
    - 代表开始查找的位置索引(故必须是数字)。
    - 可选值，不填默认为 0;
    - 若取值小于0，会'当作'0处理;
    - 若取值超出索引值范围，会'返回'-1;

# splice(): 

- api效果:截取字符串;
- str.splice(start,end,"value"):
  - str代表被截取的对象;
  - start代表截取的起始位置;
   - 不填默认为0;
   - 负数:-index:
    - 表示从末尾开始自右向左第index位;
    - index超过索引值，则取0;
   - 超过了索引长度，无意义，取值为length;
  - end代表被截取的终止位置，不填默认为str.length长度;
    - 因为索引问题，索引与实际长度的关系是:str.length-1;
    - 故范围区间取值的规则为:[start,end);
    - 负数:-index:
     - 表示从末尾开始自右向左第index位;
     - index超过索引值，则取0;

# substr:

- 不推荐使用，据说后面可能会被淘汰;

# trim():

- api:去除首未空格;
- 拓展:去除中间空格:
  - 1.用split()进行分割;
  - 2.用concat()进行拼接;

# 数组方法

# sort():

- api效果:排序
- 直接arr.sort();
  - 效果:升序排序;
- 默认排序规则:
  - 如果不提供任何参数，则根据默认规则排序:
    - 根据unicode进行排序:
    - 先比较首位...再次位...;
    - 故数字排序即不会升序排序;
    - 而是按首位升序排序;
- 制定排序规则:
  - 如果提供参数，我们可以制定排序的规则:
    - 在sort()里面加函数:
```javascript
const arr=[5,30];
arr.sort(function(a,b){
  //升序
  return a - b;
  //降序
  //return b - a;
});
```
- a-b结果:
  - 大于0，b排到a前面;
  - 小于0，a排到b前面;
  - 等于0，a和b的位置不变;
- sort()配合Math.random()进行乱序排序:
```javascript
const arr=["a","b","c","d","e"];
arr.sort(function(a,b){
  return Math.random() - 0.5;
  //减0.5是为了计算结果保持在:-0.5~0.5之间。
  //因为sort()函数会根据计算结果的正负进行排序。
});
```

# concat():

- 若在数组中使用，可以合并数组;
  - 返回新数组，不会改变原数组;
- 若对象是两个字符串对象，可以拼接字符串;

# reverse():

- 会改变原有数组;

# splice:

- api:用于截取数组中的内容;
  - 返回一个新数组;
- arr.splice(begin,end);
  - arr:目标数组;
  - begin:起始位置;
    - 超过length，返回空数组;
    - 负数:即倒数截取;
      - 超过length，默认0;
  - end:结束位置;
  - 核心:
    - 区间为:[begin,end);//个人认为，边界细节非常重要;

# 拷贝

- 深拷贝:
  - 数据拷贝过来后，和原数组之间完全没有任何关系了;
  - 递归:可深拷贝数据;
- 浅拷贝:
  - 数据拷贝过来后:
    - 里面的第一层的基本类型是没有关联了;
    - 但是里面的复杂类型，依旧有关联;

# forEach():
  
- api:对数组内的每一个元素，执行提供的函数callback
- arr.forEach(callback,thisArg):
  - callback:
    - function(el,index,arr){}
      - el:循环过程的每一个元素;
      - index:当前循环的元素对应的下标;
      - arr:调用forEach的当前数组;
  - thisArg(可选):
    - 控制当前callback中的this指向;
- 返回值：undefind;
- 不返回新数组;

# filter():

- arr.filter(callback,thisArg):
  - 与forEach一样;
- 返回新数组;

# map():

- api:由数组中的每一位元素，执行函数后的结果，作为新数组的值;
- 与forEach区别：
  - 返回值：新数组;

# reduce():

- api:累计;
- arr.reduce(callback,initValue):
  - arr:目标对象;
  - callback:
    - function(result,el,index){};
      - result:累计结果;
      - el:当前循环元素;
      - index:当前循环元素下标;
  - initValue(可选):
    - 累计的初始值;
    - 一旦填写，第一次循环即为：
      - initValue + arr[0];
    - 不填写(正常情况)：
      - arr[0] + arr[1];

# some():

- api:测试数组中，是否至少有一个元素，通过了指定函数测试，结果返回布尔值;
- arr.some(callback,thisArg):
  - arr:目标数组;
  - callback:用于测试的函数;
    - function(el,index,arr){};
      - el:循环过程的每一个元素;
      - index:当前循环的元素对应的下标;
      - arr:调用forEach的当前数组;
  - thisArg(可选):
    - 控制当前callback中的this指向;

# isNaN()

- isNaN(value):
- api: 判断value转换为Number类型后，是否为NaN(字符串会被隐式转换后，再做判断);
