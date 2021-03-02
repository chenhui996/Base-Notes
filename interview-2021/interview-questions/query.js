// 传统方式

// // 正则
// function query(name){
//     const search = location.search.substr(1);
//     // search: 'a=10&b=20&c=30'
//     const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`,'$');
//     const res = search.match(reg);
//     if(res = null){
//         return null;
//     }
//     return res[2];
// }

// query('a'); // 10

// 数组拆分
function queryToObj(name) {
  const res = {};
  const search = location.search.substr(1);
  // search: 'a=10&b=20&c=30'
  search.split("&").forEach((paramStr) => {
    const arr = paramStr.split("=");
    const key = arr[0];
    const val = arr[1];
    res[key] = val;
  });
  return res;
}

queryToObj(); // {a: 10, b: 20, c: 30}
