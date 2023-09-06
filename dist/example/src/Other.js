"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Other = void 0;
const index_1 = __importDefault(require("../../index"));
const cors = () => () => { };
exports.Other = {
    middleware: [cors()],
    body: (req, res) => {
        const elements = index_1.default.compile([
            { type: `p`, textContent: `asdf`, className: `text` },
            { type: `p`, textContent: `asdf`, className: `text` },
            { type: `p`, textContent: `asdf`, className: `text` },
            { type: `p`, textContent: `asdf`, className: `text` },
            { type: `p`, textContent: `asdf`, className: `text` },
            { type: `p`, textContent: `asdf`, className: `text` },
            { type: `p`, textContent: `asdf`, className: `text` },
            { type: `p`, textContent: `asdf`, className: `text` }
        ]);
        res.send(elements, req.path);
    }
};
