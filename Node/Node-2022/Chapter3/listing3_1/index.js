const express = require('express');
const app = express();
const articles = [{ title: 'Example' }, { name: 'Cain' }];
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json()); // 支持编码为 JSON 的请求消息体
app.use(bodyParser.urlencoded({ extended: true })); // 支持编码为表单的请求消息体

app.get('/articles', (req, res, next) => { // 获取所有文章
    res.send(articles)
})

app.post('/articles', (req, res, next) => { // 创建一篇文章
    const article = { title: req.body.title };
    articles.push(article);
    res.send(article);
})

app.get('/articles/:id', (req, res, next) => { // 获取指定文章
    const id = req.params.id;
    console.log('Fetching:', id);
    res.send(articles[id]);
})

app.delete('/articles/:id', (req, res, next) => { // 删除指定文章
    const id = req.params.id;
    console.log('Deleting:', id);
    delete articles[id];
    res.send({ message: 'Deleted' });
})

app.listen(app.get('port'), () => {
    console.log('App started on port', app.get('port'));
})

module.exports = app;
