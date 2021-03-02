interface ArrayConstructor {
  from(arrayLike: any, mapFn?, thisArg?): Array<any>;
}

const getSumOfTriple = (
  arr: number[],
  start: number = Math.min(...arr) - 1,
  end: number = Math.max(...arr) + 1
) => {
  const newArr = arr.filter((item, index) => item > start && item < end);
  const resultArr = newArr.filter((item) => item % 3 === 0);
  const sum = resultArr.reduce((acc, cur) => acc + cur);
  return sum;
};

const arr = [5, 8, 3, 9, 4, 7, 1, 2, 6];
const arr2 = Array.from({ length: 143 }, (e, i) => i * 7);

console.log(getSumOfTriple(arr));
console.log(getSumOfTriple(arr, 0, 9));
console.log(getSumOfTriple(arr2, 200, 500));
