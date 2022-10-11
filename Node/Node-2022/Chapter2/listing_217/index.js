const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');
const configFilename = './rss_feeds.txt';

let tasks = [];

// 负责执行任务的 next 函数
function next(err, result) {
    if (err) {
        throw err; // 如果任务出错，则抛出异常
    };
    const currentTask = tasks.shift();   // 从任务数组中取出下个任务
    if (currentTask) {
        currentTask(result);   // 执行当前任务
    }
}

// 任务1：确保包含 RSS 预定源 URL 列表的文件存在
function checkForRSSFile() {
    fs.exists(configFilename, (exists) => {
        if (!exists) {
            return next(new Error(`Missing RSS file: ${configFilename}`)); // 只要有错误就尽早返回
        }
        next(null, configFilename);
    })
}

// 任务2：读取并解析包含预订源 URL 的文件
function readRSSFile(configFilename) {
    fs.readFile(configFilename, (err, feedList) => {
        if (err) {
            return next(err);
        }
        feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split('\n'); // 将预订源 URL 列表转换成字符串，然后分隔成一个数组
        const random = Math.floor(Math.random() * feedList.length); // 从预订源 URL 数组中随机选择一个预订源 URL
        next(null, feedList[random]);
    })
}

// 任务3：向选定的预订源发送 HTTP 请求以获取数据
function downloadRSSFeed(feedUrl) {
    request({ url: feedUrl }, (err, res, body) => {
        if (err) {
            return next(err);
        }

        if (res.statusCode !== 200) {
            return next(new Error('Abnormal response status code'));
        }

        next(null, body);
    })
}

// 任务4：将预订源数据解析到一个条目数组中
function parseRSSFeed(rss) {
    const handler = new htmlparser.RssHandler();
    const parser = new htmlparser.Parser(handler);

    parser.parseComplete(rss);

    if (!handler.dom.items.length) {
        return next(new Error('No RSS items found'));
    }

    const item = handler.dom.items.shift();

    // 如果有数据，显示第一个预订源条目的标题和 URL
    console.log(item.title);
    console.log(item.link);
}

// 把所有要做的任务按执行顺序添加到一个数组中
tasks = [
    checkForRSSFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed
];

// 开始任务的串行化执行
next();   