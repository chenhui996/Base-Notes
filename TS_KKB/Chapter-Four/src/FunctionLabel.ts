// 例1:
function fn(a1: string): string {
  return a1;
}

// 例2:
let fn2: (a2: string) => string = function (a2) {
    return a2;
};

// 例3:
type callback = (a3: string) => string;

let fn3: callback = function(a3){
    return a3;
}

// 例4:
interface ICallBack{
    (a: string):string
}
let fn4: ICallBack = function(a4){
    return a4;
}