const Compiler = require("./compiler.js");
const options = require("../forestpack.config.js");

new Compiler(options).run();