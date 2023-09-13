"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var index_1 = __importDefault(require("../index"));
var App_1 = require("./src/App");
var Other_1 = require("./src/Other");
index_1["default"].render([{
  type: "h1",
  textContent: "Hello, world!",
  className: "title"
}, {
  type: "p",
  textContent: "Lorem ipsum dolor simit...",
  className: "content"
}, {
  type: App_1.App,
  path: "/"
}, {
  type: Other_1.Other,
  path: "/other"
}]);