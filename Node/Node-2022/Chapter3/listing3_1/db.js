const sqlite3 = require('sqlite3').verbose();
const dbName = 'later.sqlite';
const db = new sqlite3.Database(dbName); // 创建数据库连接

db.serialize(() => {
    const sql = `
        CREATE TABLE IF NOT EXISTS articles
            (id INTEGER PRIMARY KEY, title, content TEXT)
        `;

    db.run(sql); // 如果还没有，创建一个 “articles” 表
}) // 创建表 -> integer primary key 为自增长主键

class Article {
    static all(cb) {
        db.all('SELECT * FROM articles', cb); // 获取所有文章
    }

    static find(id, cb) {
        db.get('SELECT * FROM articles WHERE id = ?', id, cb); // 选择一篇指定的文章
    }

    static create(data, cb) {
        const sql = 'INSERT INTO articles(title, content) VALUES (?, ?)';
        db.run(sql, data.title, data.content, cb) // 问号表示参数
    }

    static delete(id, cb) {
        if (!id) {
            return cb(new Error('Please provide an id'));
        }

        db.run('DELETE FROM articles WHERE id= ?', id, cb);
    }
}

module.exports = db;
module.exports.Article = Article;