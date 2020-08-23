# Ajax

- 它可以在阻止页面刷新的情况下，把数据提交到后台;

# Ajax 技术

- 需要依赖一个对象：XML;

## 简单运用

- 验证用户名重复：
  - 当用户输完用户名，点击其他任何地方，导致输入框成为"失去焦点"时:
    - 触发 ajax:
    - 将输入框内的数据传给后台，后台做了一系列验证等处理后，返回对应的结果;
  - 记住，这里最重要的，就是"页面没刷新";

```js
// 阿辉导语：下面为本人撰写的'代码思路',请逐行'慢慢'理解，理解每个部分均代表什么，会大有所获(新手向);
document.querySelector(".inputStyle").onblur = function () {
    // 获取输入框内的数据：this.value
    // console.log(this.value);

    // Ajax
    // 第一步：实例化一个Ajax对象
    let xhr = new XMLHttpRequest();

    // 调取这个Ajax对象里面内涵的一个"open"方法;
    // open：含有三个参数
        // 第一个: 请求方式：get或post等;
        // 第二个: 提交的地址。可理解为"<form active="/checkUser"></form>"里面的active属性(因为表单点击submit时，会自动按照这个地址进行跳转);
        // 第三个: 是否异步。ture or false;
    xhr.open("get", `/checkUser?username=${this.value}`, true);
    // 后台验证后返回的结果:
    xhr.onload = function(){
        // 这是返回的数据
        // console.log(xhr.responseTest);

        // 最后回再回到这里
        // '前端的ajax请求里'的xhr.responseTest,收到的若是一个对象：
        // 打印出来将还是一个对象，不会自动转换成对象，还是json串，记住，json不是对象，只是一种数据格式;
        // 所以用JSON.parse方法，将其转换成对象：
        let obj = JSON.parse(xhr.responseTest);
        console.log(obj);

        // 最后一步：将返回的结果obj，在前端view层里渲染出来
        document.querySelector('.exchange').innerHTML = obj.info;// 提示: 这里的info代表的就是后端传过来的："用户名正确"或"用户名错误";
    }
    // 简单的配置好了，最后，要'发送给后台'进行验证: 调用Ajax对象里面内涵的一个"send"方法;
    xhr.send();
};
```

- 上面的是 ajax 的基本请求，把数据传给后台，然后后台还要进行处理:

```js
// 阿辉导语：这里不是整个服务端代码代码，是处理ajax请求的部分node服务端代码;
router.get("checkUser", (ctx, next) => {
  // 接收ajax发送来的数据
  // console.log(ctx.query.username);

  // 核心，仔细看：
  // 验证数据：那数据跟数据库里的数据进行比对验证
  // 数据库数据文件: userData.json
  let res = userData.find((item) => item.username == ctx.query.username);
  if (res) {
    // 返还数据(验证成功情况下)
    // 虽然返还的是一个对象，但是node的'koa'会将其自动转换成json，再丢给'前端的ajax请求里'的xhr.responseTest;
    // 若用原生的，需要用方法：JSON.stringfy进行编译，编译成json格式后，再丢给xhr.responseTest;
    ctx.body = {
      status: 1,
      info: "用户名正确",
    };
  } else {
    // 返还数据(验证失败情况下)
    ctx.body = {
      status: 2,
      info: "用户名错误",
    };
  }
  // something这个信息，就是上面xhr.responseTest所得到的反馈信息;
});
```

- 核心过程: 前端 ajax 发送到后端后，后端再把数据拿去跟'数据库'里的数据进行验证，再返回相应的结果;(数据库: 存放数据的地方);

# 深入了解 Ajax 请求

- 基础使用已经熟悉，接下来再往里深入学习;

## open 的另一种带参数方式

- 之前，我们了解了 ctx.query 的带参方式(也就是 username=\${this.value});
- 这次，我们了解另一种方式(:id):

```js
// 前端
xhr.open("get", `/get/3`, true);
```

- /get/后面可以跟任何数字，也必须是数字，为什么呢？看后端代码;

```js
// 核心语句：/get/:id的:id，代表必须是数字类型，只要是数字，即成功;
router.get("/get/:id", (ctx, next) => {
  // 不同的获取数据的方式
  // console.log(ctx.params);
  if (ctx.params === 3) {
    ctx.body = "请求成功";
  }
});
```

# post

- 通过 http 正文进行传参的：
  - 所以必须设置编码格式;
  - 不设置就会失败;

```html
<form action="" enctype="application/x-www-form-urlencoded"></form>
<!-- enctype属性即为设置编码格式，这里是html编码格式的设置方法 -->
```

- 下面为 ajax 里面的，编码格式的设置方法：

```js
// ajax里，设置编码格式用到的是：xhr.setRequestHeader()这个api进行设置;
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

// 设置完编码格式后，数据就可以通过ajax的post请求进行传递了;
let data = "username=cain&age=100";
xhr.send(data); //定义好数据参数后，通过send方法发送出去即可;
```

- 然后就是后端的数据接收了:

```js
// 接收post，要用到koa-body依赖进行接收:
const KoaBody = require("koa-body");
server.use(KoaBody());
// 既然ajax是post的请求，所以后端接收的router，也要用post;
router.post("", (ctx, next) => {
  // koa-body依赖弄好后，就可以接收post的数据参数了
  // console.log(ctx.request.body);
});
```

### xhr.getAllResponseHeaders()

- 获取所有请求头;

### xhr.getResponseHeader()

- 获取指定的请求头：
  - xhr.getResponseHeader("content-type")

### xhr.onreadystatechange

- 与 onload 类似，拿'返还结果'的方法;
- 监听 ajax 的'准备状态'和'状态'的值，判定是否要执行相应结果，类比于 xhr.onload(判断条件是：全部加载完成后，执行执行相应结果);

```js
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      console.log(xhr.responseText);
    }
  }
};
```

## FormData

- 实现文件的传递:
  - form 的 type 属性: file;
  - 获取文件用 files 属性;

```js
document.querySelector("buttom").onclick = function () {
  // 获取文件用 files 属性;
  let file = document.querySelector(".myfile").files[0];

  // 实例化一个 FormData 对象:
  let form = new FormData();
  // 往里面添'数据类型'和'数据内容';
  form.append("img", file);

  // 然后就是常规的 ajax 请求的设置和发送了
  let xhr = new XMLHttpRequest();
  // 这里要注意，虽然是post请求，但是因为用的是FormData，所以'不需要'设置'请求头';
  xhr.open("post", "/upload", true);
  xhr.onload = function () {
    console.log(xhr.responseText);
  };
  // 将数据塞进 send 里面发送给后端;
  xhr.send(form);
};
```

- 下面是后端的接收：

```js
// koa-body要允许接收文件类型
server.use(
  KoaBody({
    multipart: true,
  })
);
// 设置post
router.post("/upload", (ctx, next) => {
  // 数据
  // console.log(ctx.request.body);
  // 文件
  // console.log(ctx.request.files);
  // 文件路径
  // ctx.request.files.img.path

  // 将上传的文件存放至目标目录下
  let fileData = fs.readFileSync(ctx.request.files.img.path);
  fs.writeFileSync("static/imgs" + ctx.request.files.img.name, fileData);
  // 第一个参数是file: 文件名或文件描述符;
  // 第二个参数是data: 要写入文件的数据，可以是 String(字符串) 或 Buffer(缓冲) 对象;
  // 还有两个参数，这里用不到，就不去提到了;
  ctx.body = "请求成功";
});
```

## 监控上传进度

### upload 事件钩子

- onloadstart: 上传开始;
- onprogress: 数据传输进行中;
  - evt.total: 需要传输的总大小;
  - evt.loaded: 当前上传的文件大小;
- onabort: 上传操作终止;
- onerror: 上传失败;
- onload: 上传成功;
- onloadend: 上传完成;
- 使用：
    - xhr.upload.onloadstart = function(){};
- 取消上传使用：
    - 在另一个取消上传的按钮中：
    - xhr.abort();
- 计算上传进度：
    - (evt.loaded / evt.total * 100).toFixed(0);
    - 也就是'当前上传的文件大小' / '需要传输的总大小';
    - *100,为的是换算成百分比;
    - toFixed(0)取小数点后几位，0代表取小数点后0位，也就是取整;
    - 因为 onprogress 会不停执行，所以上面计算的上传速度，也就会不停的更新最新值;
    - 最后再渲染到view，结束;
- 计算上传速度:
    - 速度默认单位: b/s;
    - 文件大小差 / 时间差;
    - 文件大小差：
        - onloadstart里取一个当前文件大小;
        - onprogress里取一个当前文件大小;
    - 时间差：
        - 单位：毫秒,所以时间差算出来后，要/1000;
        - onloadstart里取一个当前时间;
        - onprogress里取一个当前时间;
            - 记得在'每次计算后'，还要将'开始时间'设置为'这次'在'onprogress里'取到的'时间';
    - 最后再渲染到view，结束;
