"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const index_1 = __importDefault(require("../../index"));
const cors = () => { };
exports.App = {
    middleware: [cors()],
    body: (req, res) => {
        const elements = index_1.default.compile([
            { type: `p`, textContent: `asdf`, className: `asdf` },
            { type: `p`, textContent: `3asdf23`, className: `as2345df` },
            { type: `p`, textContent: `ㅅㄴ주ed`, className: `샌즈` },
            { type: `div`, child: { type: `span`, textContent: `sansdance`, className: `sansbounce` } }
        ]);
        res.send(elements);
    }
};
