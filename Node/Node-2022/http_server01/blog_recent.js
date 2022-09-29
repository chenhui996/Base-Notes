const http = require('http');
const fs = require('fs');

http.createServer((req, res) => { // 创建 http 服务器，并用回调定义响应逻辑
    if (req.url == '/') {
        getTitles(res)
    }
}).listen(8000, '127.0.0.1');

function getTitles(res) {
    fs.readFile('./titles.json', (err, data) => { // 读取 titles.json 文件，并用回调定义如何处理其中的内容
        if (err) { // 如果发生错误,则返回错误信息
            return hadError(err, res);
        }

        getTemplate(JSON.parse(data.toString()), res); // 将文件内容转换为字符串，并将其作为参数传递给 getTemplate 函数
    })
}

function getTemplate(titles, res) {
    fs.readFile('./template.html', (err, data) => { // 读取 template.html 文件，并用回调定义如何处理其中的内容
        if (err) { // 如果发生错误,则返回错误信息
            return hadError(err, res);
        }

        formatHtml(titles, data.toString(), res); // 将文件内容转换为字符串，并将其作为参数传递给 formatHtml 函数
    });
}

function formatHtml(titles, tmpl, res) {
    const html = tmpl.replace('%', titles.join('</><li>')); // 将 % 替换为 titles 数组中的内容
    res.writeHead(200, { 'Content-Type': 'text/html' }); // 设置响应头
    res.end(html); // 返回响应内容
}

function hadError(err, res) {
    console.error(err);
    res.end('Server Error');
}