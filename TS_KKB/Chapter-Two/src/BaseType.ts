let title: string = "cain";
let n: number = 1;
let isOK: boolean = true;

let ele = document.querySelector("div");
if (ele) {
  ele.style.display = "none";
}

// let a: { username: string; age: number } = {
//   username: "cain",
//   age: 100,
// };


// interface Person{
//   username: string,
//   age: number
// }

// let a: Person = {
//   username: "cain",
//   age: 100,
// };

// let a1: Person = {
//   username: "snake",
//   age: 123131,
// };

// class Person{
//   // username: string
//   constructor(public username: string, public age: number){

//   }
// }

// let user: Person = new Person('cain', 18);

interface AjaxOptions {
  url: string;
  method: string;
}

function ajax(options: AjaxOptions){}

ajax({
  url: '',
  method: 'get'
});