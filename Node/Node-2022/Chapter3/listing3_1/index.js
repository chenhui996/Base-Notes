const express = require('express');
const app = express();
const articles = [{ title: 'Example' }, { name: 'Cain' }];

app.set('port', process.env.PORT || 3000);

app.get('/articles', (req, res, next) => { // 获取所有文章
    res.send(articles)
})

app.post('/articles', (req, res, next) => { // 创建一篇文章
    res.send('OK');
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
