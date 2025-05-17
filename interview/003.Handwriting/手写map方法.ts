// 请从上至下依次阅读

// 问：手写 map 方法
function customMap<T, U>(array: T[], callback: (item: T, index: number, array: T[]) => U): U[] {
    const result: U[] = [];

    for (let i = 0; i <= array.length - 1; i++) {
        const item = array[i];

        result.push(callback(item, i, array))
    }

    return result;
}

// 问：为什么用泛型 T, U？
// 
// 答：
// 保证 myMap 可以适用于任何类型的数组，而不局限于 number[] 或 string[]。
// T 代表原数组元素类型，U 代表映射后元素类型。


// 问：用 reduce 来实现
function customMapForReduce<T, U>(array: T[], callback: (item: T, index: number, array: T[]) => U): U[] {
    return array.reduce<U[]>((acc, curItem, curIndex, arr) => {
        acc.push(callback(curItem, curIndex, arr))
        return acc;
    }, [])
}

// 问：上面两种实现，和原生 Array.prototype.map 有什么不同？
// 答：支持类型推导：原生 map 也有类型，但自己实现的 myMap 能更明确地控制泛型。

// 问：能否链式调用？ 
// 答：目前不支持链式调用，可以用 class 来实现类似 map 的链式方法。
class MapForChain<T> {
    private data: T[];

    constructor(array: T[]) {
        this.data = array;
    }

    // 实现 map 方法，返回 MapForChain 实例，支持链式调用
    map<U>(callback: (item: T, index: number, array: T[]) => U): MapForChain<U> {
        const result: U[] = [];

        for (let i = 0; i <= this.data.length - 1; i++) {
            const item = this.data[i];
            result.push(callback(item, i, this.data))
        }

        return new MapForChain(result); // 返回 MapForChain 实例，支持链式调用
    }

    // 返回普通数组
    toArray(): T[] {
        return this.data
    }
}


// 使用示例
const myArr = new MapForChain([1, 2, 3]);

const result = myArr
    .map((num) => num * 2) // [2, 4, 6]
    .map((num) => `Number: ${num}`) // ["Number: 2", "Number: 4", "Number: 6"]
    .toArray();

console.log(result); // ["Number: 2", "Number: 4", "Number: 6"]

// 进阶问题
// 问：能不能给 myMap 增加 thisArg 支持？也就是支持 this 绑定？
// 答：可以，代码如下：
function mapThisArg<T, U>(array: T[],
    callback: (this: any, item: T, index: number, arr: T[]) => U,
    thisArg?: any): U[] {
    const result: U[] = [];

    for (let i = 0; i <= array.length - 1; i++) {
        result.push(callback.call(thisArg, array[i], i, array))
        // 这样 callback 内部的 this 就可以指定 thisArg 了
    }

    return result;
}