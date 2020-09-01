interface T{
    a: number;
    fn: (x: number) => void;
}

let obj: T = {
    a: 1,
    // 注意，需要在首位显式的标注this，且其标注的this不占参数位
    fn(this: T, x:number){
        return x
    }
}