# 字符串比较：

* 本质上是比较ascii码；
# 二分查找：

* 二分查找是一种在每次比较之后将查找空间一分为二的算法。
* 每次需要查找集合中的索引或元素时，**都应该考虑二分查找**。
* 如果集合是无序的，我们可以总是在应用二分查找之前先对其进行排序。
# switch：

* 模版：
```javascript
<script>
  switch(表达式 || 变量){
    case value1 :
      console.log("message1");
      break;
    case value2 :
      console.log("message2");
      break;
    case value3 :
      console.log("message3");
      break;
    default :
      console.log("default message");
      break;
  }
</script>
```
* 其中表达式、变量、value的比较为：全等(===)；
  * 若做判断语句，(表达式||变量)的位置可写(true or false)，value写成判断条件。
* 穿透：
  * 找到匹配项之后，从该匹配项执行，一直到代码结束；
  * 故要在需要结束的语句后加break；
* 穿透的好处（必要性）：
  * 多个满足项共用一个结果；
  * 代码更简介，性能更好；
* 所有的switch语句，都可用if语句来替代；
* default位置可任意；

# for in循环：

* for in写法与vue的v-for写法，几乎一样；
* for in 可以遍历打印出对象的属性值，这是for循环做不到的；
* 由for in得到的启发：
  * 万物皆属性：
    * 对象最直观，正常'键值对'；
    * 普通数组比较隐晦，其也是'键值对'，用for in也可打印出数组的key，结果为其下标；
