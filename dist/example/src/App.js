"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const index_1 = __importDefault(require("../../index"));
const Header_1 = require("./components/Header");
const cors = () => () => { };
exports.App = {
    middleware: [cors()],
    stateOptions: (option) => option,
    body: (req, res) => {
        res.state(`text`, `0`);
        let idx = 0;
        const count = (req, res) => {
            idx += 1;
            res.state(`text`, String(idx));
        };
        const elements = index_1.default.compile([
            { type: Header_1.Header },
            { type: `p`, textContent: res.state(`text`), className: `count` },
            { type: `button`, textContent: `count`, className: `count-btn`, onClick: count.toString() },
            { type: `a`, href: `/other`, textContent: `link` }
        ]);
        res.send(elements, req.path);
    }
};
