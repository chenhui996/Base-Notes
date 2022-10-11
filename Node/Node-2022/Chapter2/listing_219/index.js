const async = require('async');
const exec = require('child_process').exec;

function downloadNodeVersion(version, destination, callback) { // 下载指定版本的 Node 源码
    // console.log('callback', callback);
    const url = `https://nodejs.org/dist/v${version}/node-v${version}.tar.gz`;
    const filepath = `${destination}/${version}.tgz`;
    exec(`curl ${url} > ${filepath}`, callback); // node 子进程
}

async.series([ // 按顺序执行串行化任务
    callback => {
        async.parallel([
            callback => {
                console.log('Downloading Node v4.4.7...');
                downloadNodeVersion('4.4.7', './tmp', callback);
            },
            callback => {
                console.log('Downloading Node v6.3.0...');
                downloadNodeVersion('6.3.0', './tmp', callback);
            }
        ], callback)
    },
    callback => {
        console.log('Creating archive of downloaded files...');
        exec('tar cvf node_distros.tar ./tmp/4.4.7.tgz ./tmp/6.3.0.tgz', err => {
            if (err) {
                throw err;
            }

            console.log('All done!');
            callback();
        })
    }
])

