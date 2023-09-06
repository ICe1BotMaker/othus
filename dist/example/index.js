"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const App_1 = require("./src/App");
const Other_1 = require("./src/Other");
index_1.default.render([
    { type: `h1`, textContent: `Hello, world!`, className: `title` },
    { type: `p`, textContent: `Lorem ipsum dolor simit...`, className: `content` },
    { type: App_1.App, path: `/` },
    { type: Other_1.Other, path: `/other` }
]);
