class User {
  constructor(
    // 可以访问，但是一旦确定不能修改
    readonly id: number,
    // 可以访问，但是不能外部修改
    protected username: string,
    // 外部包括子类不能访问，也不可修改
    private password: string
  ) {
    // ...
  }
  // 类的方法也可以添加修饰符
  protected method() {
    // protected不能从外部访问，只能'类的内部'或其'子类'进行访问;
    user1.username;
    // private只能在类的内部进行访问;
    user1.password;
  }
}

let user1 = new User(1, "cain", "123");

// readonly:

// true
// user1.id;

// error
// user1.id = 1;
// 因为是只读属性，不能修改;

// protected:

// true
// class Vip extends User{
//     method2(){
//         this.username;
//     }
// }
// 是其父类继承过来的子类，所以可以访问;

// error
// user1.username;
// 因为 protected 属性是受保护的，不能从外部访问，只能'类的内部'或其'子类'进行访问;

// readonly
// 只能在类的自身内部进行访问;
