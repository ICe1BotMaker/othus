"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.createPage = exports.pages = void 0;
const http_1 = __importDefault(require("http"));
const chalk_1 = __importDefault(require("chalk"));
exports.pages = [];
function createPage(path, html) {
    exports.pages.push({ path, html });
}
exports.createPage = createPage;
function server(port) {
    const httpServer = http_1.default.createServer((req, res) => {
        res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
        exports.pages.forEach((page) => {
            if (req.url === page.path) {
                res.write(page.html);
            }
        });
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
