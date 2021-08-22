console.log(require("./toolbox.js"))

const toolbox = require("./toolbox.js");

var from = "test";

var b64 = toolbox.b64.to(from)

console.log(from,b64);
console.log(toolbox.b64.from(b64));