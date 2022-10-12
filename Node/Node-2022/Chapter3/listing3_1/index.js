const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Article = require('./db').Article; // 1.加载数据库模块
const read = require('node-readability');
const path = require('path');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json()); // 支持编码为 JSON 的请求消息体
app.use(bodyParser.urlencoded({ extended: true })); // 支持编码为表单的请求消息体

app.use(
    '/css/bootstrap.css',
    express.static('./node_modules/bootstrap/dist/css/bootstrap.css')
);

app.get('/articles', (req, res, next) => { // 获取所有文章
    Article.all((err, articles) => { // 调用数据库 api -> 获取所有文章
        if (err) return next(err);
        res.format({
            html: () => {
                res.render(path.join(__dirname, './view/articles.ejs'), { articles: articles });
            },
            json: () => {
                res.send(articles);
            }
        });
    })
})

app.post('/articles', (req, res, next) => { // 创建一篇文章
    const url = req.body.url; // 从 POST 消息体中得到 URL

    read(url, (err, result) => { // 用 readability 模块获取这个 URL 指向的页面
        if (err || !result) {
            res.status(500).send('Error downloading article');
        }

        Article.create({ title: result.title, content: result.content }, (err, article) => {
            if (err) return next(err);
            res.send('OK'); // 文章保存成功后，发送状态码为 200 的响应
        })
    })
})

app.get('/articles/:id', (req, res, next) => { // 获取指定文章
    const id = req.params.id;
    Article.find(id, (err, article) => { // 调用数据库 api -> 获取指定文章
        if (err) return next(err);
        res.send(article);
    })
})

app.delete('/articles/:id', (req, res, next) => { // 删除指定文章
    const id = req.params.id;
    Article.delete(id, (err) => { // 调用数据库 api -> 删除指定文章
        if (err) return next(err);
        res.send({ message: 'Deleted' });
    })
})

app.listen(app.get('port'), () => {
    console.log('App started on port', app.get('port'));
})

module.exports = app;
