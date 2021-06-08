class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat() {
    alert(`${this.name} eat something`);
  }
  speak() {
    alert(`My name is ${this.name}, age ${this.age}`);
  }
}

let zhang = new Person("cain", 18);
zhang.eat();
zhang.speak();

let wang = new Person("yep", 28);
wang.eat();
wang.speak();
