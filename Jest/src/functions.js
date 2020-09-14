function arrayNum(num){
    if(!Number.isInteger(num)){
        throw Error("我只接收整数，老哥");
    }

    let result = [];
    for(let i =0; i<=num-1; i++){
        result.push(i);
    }

    return result
}
export default arrayNum;