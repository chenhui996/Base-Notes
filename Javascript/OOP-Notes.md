# OOP：

- 面向对象编程;
- 是一种编程思想;

# 面向对象编程思想

- 面向过程：
  - 注重解决问题的步骤;
  - 分析问题需要的每一步;
  - 实现函数依次调用;
- 面向对象：
  - 是一种程序设计思想;
  - 将'数据'和'处理数据'的程序'封装到对象';
- 面向对象特性：
  - 抽象;
  - 继承;
  - 封装;
  - 多态;

# 优点：

- 提高代码的'复用性'及'可维护性';

# 工厂模式

- 预先定义好函数，然后'按需调用'；
  - 提高代码复用率；
  - 减少代码冗余；
- 例：
  - 本来一些通过字面量创建的对象，需要重复书写创建;
  - 工厂模式：可仅通过向函数传参来进行创建;

```javascript
function Person(name, age, hobby) {
  let obj = {};
  obj.name = name;
  obj.age = age;
  obj.hobby = function () {
    console.log(hobby);
  };
  return obj;
}
let cain = Person("cain", 100, "like playing games");
let snake = Person("snake", 20, "like debug");
console.log(cain);
console.log(snake);
```

# 类

- 为某些同类型对象所复用的函数;
  - 上述工厂模式中的"Person()"函数即为"类"的概念;
- 抽离某些共用代码，封装成一个类;
- 提高代码复用性;

# new 运算符

- 用构造函数的格式配合 this，改进上面的工厂模式写法：

```javascript
function Person(name, age, hobby) {
  this.name = name;
  this.age = age;
  this.hobby = function () {
    console.log(hobby);
  };
}
let cain = new Person("cain", 100, "like playing games");
let snake = new Person("snake", 20, "like debug");
console.log(cain);
console.log(snake);
```

- 构造函数原型

# ES6 继承：

```javascript
class Dad {
  constructor(height) {
    this.name = "dsad";
    this.age = 50;
    this.height = height;
  }
  fn() {
    //dad fn
  }
}

class Son extends Dad {
  constructor(height) {
    super(height); //super first line
    this.hobby = "ddd";
  }
  fn() {
    super.fn(); //继承dad的fn,且之后会执行dad的fn;
    //son fn
  }
}
let newSon = new Son("dsda");
console.log(newSon);
```

- 当父与子都有同样属性时，就近原则;
  - 若还是想继承，可用 super 与父类通信调取;

# ES2020: ??

- 合并空运算符;
- 若有变量参数传入，优先选；
- 否则，选默认参数；
- 没默认参数，返回 undefind;

# ES2020: 可选链式操作

```javascript
let obj = {};
console.log(obj.person?.name);
```

# 按需导入：

```javascript
document.onclick = async function(){
    import(./a.js).then(res=>{
        console.log(res);//当在文档点击时，才导入文件;
    })
}
```

- # 传值与传址

- 简单数据类型:传值;
  - Number;
  - String;
  - Boolean;
  - Undefind;
  - Null;
- 简单数据类型会新开辟内存地址;
- 复杂数据类型:传址;
  - Object;
- 复杂数据类型不会新开辟内存地址;

# 深拷贝

- 全部拷贝;
- 对于复杂数据类型的拷贝:
  - 可以从内存里重新开辟地址;
  - 解决传址问题;
- 序列化：
  - 先将对象转换成 json;
  - 再将 json 转换成对象;

```javascript
let objCopy = JSON.parse(JSON.stringify(obj));
//obj先被JSON.stringify()转换成json序列;
//再被JSON.parse()转换回对象，并赋值给objCopy,实现深拷贝;
//本质：从内存重新开辟了一个地址，故不会发生传址;
```

- 序列化缺陷:
  - 当 obj 中含有'函数方法'或者是'undefind'时：
    - 序列化会丢失'函数方法'和'undefind';
- 解决方法：
  - 自行封装一个'深拷贝函数'进行拷贝;

```javascript
function deepCopy(obj) {
  //思路:
  //1.循环遍历对象;
  //2.把'循环遍历的值'赋值给一个'新的对象';
  //3.新的对象会让内容新开辟一个地址;
  //完成————深拷贝函数;
  let newObj = Array.isArray(obj) ? [] : {};
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      if(typeof obj[key] === "object"){
        //复杂数据类型，故需要再遍历其内部对象
        newObj[key] = deepCopy(obj[key]);
      }
      else{
        //所有的结果拷贝，均是遍历走到底后，进行简单数据类型的拷贝;
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}
```

# 组合继承

- 防止原型在继承时，子类和父类进行相互影响;
- 只是一种方法手段而已；
  - 本质均是在内存重新开辟一个新的地址;
- 方法：
  - 中间创建一个中介函数对象;
  - Mid.prototype = Dad.prototype;
  - Son.prototypr = new Mid();
  - 此时，Dad与Son原型直接的联系已被切断;
  - 最后，在将prototype.constructor指回Son;
  - Son.prototype.constructor = Son;
- 解析：
  - 通过new Mid()实例化;
  - 在内存开辟了一个新的地址;

# 单例模式

- 防止误操作;
- 无论实例多少次，最后都会只有一个实例;

# 装饰者模式

```js
//原code
class Yase{
  constructor(){
    this.name = "亚瑟";
  }
  fire(){
    console.log("释放技能");
  }
}
//在此基础上，不动原code进行拓展，被称为，装饰者模式：

//需求：
//打印释放技能之后，打印“造成100点伤害”

//1.继承(扩展一些新的技能);
class MyYase extends Yase{
  fire(){
    super();
    console.log("造成100点伤害");
  }
  //或者直接扩展新的原型属性
  say(){

  }
}
//实例化、调用：
let newYase = newMyYase();
newYase.fire();
//MyYase成功继承Yase;


//2.装饰者(原本功能基础上增强)
const hurt = function(){
  console.log("造成100点伤害");
}
//封装一个装饰器，给它装上:
//这里我用高阶函数来封装一个装饰器：
//高阶函数：把'函数当成参数'传入的函数;
const DecoratorFn = function(fn1,fn2){
  return function(){
    fn1();
    fn2();
  }
}
//实例化、调用：
let newYase = newMyYase();
let myfn = DecoratorFn(newYase.fire,hurt);
mufn();


//还有直接用Function方法进行扩展：
Function.prototype.DecoratorFn = function(fn){
  this();
  fn();
}
//实例化、调用：
let newYase = newMyYase();
newYase.fire.DecoratorFn(hurt);

//感想：装饰者模式就是'拼接'函数or...，达到想要的效果;
```

# 观察者模式

