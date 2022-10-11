const fs = require('fs');
const path = require('path');
const tasks = [];
const wordCounts = {};
const filesDir = path.resolve(__dirname, '../text');
let completedTasks = 0;

function checkIfComplete() {
    completedTasks++;
    if (completedTasks === tasks.length) {
        for (let index in wordCounts) { // 当所有任务全部完成后，列出文件中用到的每个单词以及用了多少次
            console.log(`${index}: ${wordCounts[index]}`);
        }
    }
}

function addWordCount(word) {
    wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
}

function countWordsInText(text) {
    const words = text.toString().toLowerCase().split(/\W+/).sort();

    words.filter(word => word).forEach(word => addWordCount(word)); // 对文本中出现的单词计数
}

fs.readdir(filesDir, (err, files) => {
    if(err){
        throw err;
    }

    files.forEach(file => { 
        const task = (file => { // 定义处理 每个文件 的 任务。每个任务 中 都会 调用 一个异步读取文件的函数 并 对 文件中 使用的单词 计数
            return () => {
                fs.readFile(file, (err, text) => {
                    if (err) {
                        throw err;
                    }
                    countWordsInText(text);
                    checkIfComplete();
                })
            }
        })(`${filesDir}/${file}`);

        tasks.push(task); // 把所有任务都添加到函数调用数组中
    })
    tasks.forEach(task => task());   // 开始并行执行所有任务
})

