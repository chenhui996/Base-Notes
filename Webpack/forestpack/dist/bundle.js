
        (function(modules){
            function require(filename){
                const fn = modules[filename];
                const module = {exports:{}};
                fn(require, module, module.exports);
                return module.exports
            }
            require('/Users/chenhui/Downloads/wepack-learn/forestpack/src/index.js')
        })({'/Users/chenhui/Downloads/wepack-learn/forestpack/src/index.js': function(require, module, exports){"use strict";

var _greeting = require("./greeting.js");

document.write((0, _greeting.greeting)("森林"));},'./greeting.js': function(require, module, exports){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;

function greeting(name) {
  return "你好" + name;
}}})
      