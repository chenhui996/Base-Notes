# key(obj):

- 获取对象的所有'属性名称'，并返回一个数组;
- Object.key(obj);
  - obj：目标对象;

# value(obj):

- 获取对象的所有属性对应的'值'，并返回一个数组;
- Object.value(obj);
  - obj：目标对象;

# delete:

- 删除整个键值对;
- delete obj.name;
  - 删除目标对象 obj 内部的，属性为 name 的整个键值对;

# Json:

- Json 是一种轻量级的'数据交换'的数据格式;
- 格式：
  - 数据的 key 必须有引号;

# Json 对象:

- 为了方便操作 Json 的数据，JS 专门准备了一个对象;
- var _jsonObj = '{"name":"text"}';

# JSON.parse():

```javascript
var _jsonObj = '{"name":"text"}';
var _jsonArr = "[1,2,3]";
var tarObj = JSON.parse(_jsonObj); //转换成一个objcet，其中key为name，value值为text;
var tarArr = JSON.parse(_jsonArr); //转换成一个array，其中元素为1,2,3;
```

# JSON.stringify():

- 将Object对象转换成JSON对象;
- 返回是一个string类型，格式为json;

# Math方法：

- JS中的内置对象;
- 提供了一些和数学操作相关的'属性'和'方法';

# Math.PI:

- 数学中的：圆周率;

# Math取整：

- Math.ceil():向上取整;
- Math.floor():向下取整;
- Math.round():四舍五入;

# Math.random():

- 返回一个0～1之间的随机数字，包含0，不包含1;



