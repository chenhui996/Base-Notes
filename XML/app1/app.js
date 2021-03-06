const http = require('http');
const fs = require('fs');

let str = "[]";

const user = ['mt', 'hai', 'xiaorui'];
const server = http.createServer((require,response)=> {
    if(require.url === '/index.html'){
        let content = fs.readFileSync('./index.html');
        response.setHeader('content-type', 'text/html;charset=utf-8');
        response.end(content);
    }
    if(require.url === '/getData'){
        getData(response);
    }
});

function getData(res){
    let newStr = (fs.readFileSync('./data.json')).toString();
    if(str === newStr){
        console.log("no change");
        setTimeout(function() {
            getData(res);
        }, 100);
    }
    else{
        console.log('change');
        str = newStr;
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.end(str);
    }
    // return newStr;
    // 浏览器页面直接刷新，会出现数据消失;
    // 原因：get请求发出去了，服务器没有返回数据，但是页面刷新了，数据没给，那就渲染成空了;
    // 为什么不能用之前的数据？因为此例子，页面每次刷新，都要等服务器返数据，再渲染进dom上;
    // 浏览器刷新了，等于更新清空了数据，然后就像嗷嗷待哺的仔，等着数据进嘴呢;
    
    // 但是由于数据没变直接刷新，导致页面资源没法加载了;
    // 故若连续刷新多次，那么，就算改了data里的数据，也不会马上重新渲染;

    // 需要再data改了后，再次刷新页面，让其正常流程跑，不要返回错误信息;
}
server.listen(8081,()=>{
    console.log("Server running at http://localhost:8081");
})