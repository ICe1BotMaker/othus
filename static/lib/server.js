"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = exports.createPage = exports.pages = void 0;
var fs_1 = __importDefault(require("fs"));
var http_1 = __importDefault(require("http"));
var chalk_1 = __importDefault(require("chalk"));
var uglify_js_1 = __importDefault(require("uglify-js"));
exports.pages = [];
function createPage(_ref) {
  var path = _ref.path,
    json = _ref.json,
    states = _ref.states,
    html = _ref.html;
  exports.pages.push({
    path: path,
    json: json,
    states: states,
    html: html
  });
}
exports.createPage = createPage;
function server(port) {
  var httpServer = http_1["default"].createServer(function (req, res) {
    if (req.url === "/bundle.js") {
      res.write(uglify_js_1["default"].minify(fs_1["default"].readFileSync("./bundle.js", "utf-8").replace("/* &*_-jsbo_-_*& */", "pages = ".concat(JSON.stringify(exports.pages)))).code);
    } else {
      res.writeHead(200, {
        'Content-type': 'text/html; charset=utf-8'
      });
      res.write("<script src=\"/bundle.js\" nocode async></script>");
    }
    res.end();
  });
  httpServer.listen(port, function () {
    console.clear();
    console.log(chalk_1["default"].blue("local :: othus-beta.v1"));
    console.log(chalk_1["default"].bold.underline("This is not a safe version yet."));
    console.log();
    console.log(chalk_1["default"].yellow("https://github.com/kithub-Inc/othus"));
    console.log(chalk_1["default"].gray("Please check the official document for details."));
    console.log();
    console.log(chalk_1["default"].gray("(ctrl + click) -> ") + chalk_1["default"].cyan("http://localhost:".concat(port)));
  });
}
exports.server = server;