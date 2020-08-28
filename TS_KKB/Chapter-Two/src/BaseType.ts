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


interface Person{
  username: string,
  age: number
}

let a: Person = {
  username: "cain",
  age: 100,
};

let a1: Person = {
  username: "snake",
  age: 123131,
};