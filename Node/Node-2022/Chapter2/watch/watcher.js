const fs = require('fs');
const events = require('events');

class Watcher extends events.EventEmitter { // 扩展 EventEmitter，添加处理文件的方法
    constructor(watchDir, processedDir) {
        super();
        this.watchDir = watchDir;
        this.processedDir = processedDir;
    }

    watch() {
        fs.readdir(this.watchDir, (err, files) => { // 处理 watch 目录中的所有文件
            if (err) throw err;

            for (let index in files) {
                this.emit('process', files[index]); // 待实现
            }
        })
    }

    start() { // 添加开始监控的方法
        fs.watchFile(this.watchDir, () => {
            this.watch();
        })
    }
}

module.exports = Watcher;