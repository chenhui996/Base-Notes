var getSumOfTriple = function (arr, start, end) {
    if (start === void 0) { start = Math.min.apply(Math, arr) - 1; }
    if (end === void 0) { end = Math.max.apply(Math, arr) + 1; }
    var newArr = arr.filter(function (item, index) { return item > start && item < end; });
    var resultArr = newArr.filter(function (item) { return item % 3 === 0; });
    var sum = resultArr.reduce(function (acc, cur) { return acc + cur; });
    return sum;
};
var arr = [5, 8, 3, 9, 4, 7, 1, 2, 6];
var arr2 = Array.from({ length: 143 }, function (e, i) { return i * 7; });
console.log(getSumOfTriple(arr));
console.log(getSumOfTriple(arr, 0, 9));
console.log(getSumOfTriple(arr2, 200, 500));
