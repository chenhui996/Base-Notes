const { rejects } = require("assert");
// callback hell

// let fs = require("fs");
// fs.readFile("./a.txt", "utf8", function (err, data) {
//   fs.readFile(data, "utf8", function (err, data) {
//     fs.readFile(data, "utf8", function (err, data) {
//       console.log(data);
//     });
//   });
// });

// -----------------------------------------------------------------

// Promise

// let fs = require("fs");
// function read(url) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(url, "utf8", function (err, data) {
//       error && reject(error);
//       resolve(data);
//     });
//   });
// };

// read('./a.txt').then(data => {
//     return read(data);
// }).then(data => {
//     return read(data);
// }).then(data => {
//     console.log(data);
// })

// -----------------------------------------------------------------

// constructor

// class Promise {
//   constructor(executor) {
//     // 控制状态，使用了一次之后，接下来的都不被使用
//     this.status = "pendding";
//     this.value = undefined;
//     this.reason = undefined;

//     // 定义resolve函数
//     let resolve = (data) => {
//       if (this.status === "pendding") {
//         this.status = "resolve";
//         this.value = data;
//       }
//     };

//     // 定义reject函数
//     let reject = (data) => {
//       if (this.status === "pendding") {
//         this.status = "reject";
//         this.reason = data;
//       }
//     };

//     // executor方法可能会抛出异常，需要捕获
//     try {
//       // 将resolve和reject函数给使用者
//       executor(resolve, reject);
//     } catch (e) {
//       // 如果在函数中抛出异常则将它注入reject中
//       reject(e);
//     }
//   }
// }

// -----------------------------------------------------------------

// then

// then((onFufilled, onRejected) =>{
//     if(this.status === 'reslove'){
//         onFufilled(this.value)
//     }
//     if(this.status === 'reject'){
//         onRejected(this.reason)
//     }
// });
