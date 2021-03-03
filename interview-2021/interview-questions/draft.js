let a = 100;
function test(){
    console.log(a);
    let a = 10;
    console.log(a);
}
test();
console.log(a);