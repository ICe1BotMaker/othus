"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.createPage = exports.pages = void 0;
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const chalk_1 = __importDefault(require("chalk"));
const uglify_js_1 = __importDefault(require("uglify-js"));
exports.pages = [];
function createPage({ path, json, states, html }) {
    exports.pages.push({ path, json, states, html });
}
exports.createPage = createPage;
function server(port) {
    const httpServer = http_1.default.createServer((req, res) => {
        if (req.url === `/bundle.js`) {
            res.write(uglify_js_1.default.minify(fs_1.default.readFileSync(`./bundle.js`, `utf-8`).replace(`/* &*_-jsbo_-_*& */`, `pages = ${JSON.stringify(exports.pages)}`)).code);
        }
        else {
            res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
            res.write(`<script src="/bundle.js" nocode async></script>`);
        }
        res.end();
    });
    httpServer.listen(port, () => {
        console.clear();
        console.log(chalk_1.default.blue(`local :: othus-beta.v1`));
        console.log(chalk_1.default.bold.underline(`This is not a safe version yet.`));
        console.log();
        console.log(chalk_1.default.yellow(`https://github.com/kithub-Inc/othus`));
        console.log(chalk_1.default.gray(`Please check the official document for details.`));
        console.log();
        console.log(chalk_1.default.gray(`(ctrl + click) -> `) + chalk_1.default.cyan(`http://localhost:${port}`));
    });
}
exports.server = server;
