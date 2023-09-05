"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const index_1 = __importDefault(require("./index"));
const cors = () => { };
exports.App = {
    middleware: [cors()],
    body: (req, res) => {
        const elements = index_1.default.compile({
            p: { textContent: `asdf`, className: `asdf` }
        });
        res.render(elements);
    }
};
