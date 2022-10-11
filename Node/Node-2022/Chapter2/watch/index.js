const fs = require('fs');
const Watcher = require('./watcher');
const path = require('path');
const watchDir = path.resolve(__dirname, './testDir');
const processedDir = path.resolve(__dirname, './targetDir');

const watcher = new Watcher(watchDir, processedDir);

watcher.on('process', (file) => {
    const watchFile = `${watchDir}/${file}`;
    const processedFile = `${processedDir}/${file.toLowerCase()}`;

    fs.rename(watchFile, processedFile, err => {
        if (err) throw err;
    });
})

watcher.start();