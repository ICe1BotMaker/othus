"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const index_1 = __importDefault(require("../../../index"));
exports.Header = {
    body: (req, res) => {
        const elements = index_1.default.compile([
            { type: `div`, className: `header`, child: [
                    { type: `div`, className: `header-item`, textContent: `item-1` },
                    { type: `div`, className: `header-item`, textContent: `item-2` },
                    { type: `div`, className: `header-item`, textContent: `item-3` }
                ] }
        ]);
        res.send(elements, ``);
    }
};
