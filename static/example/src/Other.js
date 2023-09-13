"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Other = void 0;
var index_1 = __importDefault(require("../../index"));
var cors = function cors() {
  return function () {};
};
exports.Other = {
  middleware: [cors()],
  body: function body(req, res) {
    var elements = index_1["default"].compile([{
      type: "p",
      textContent: "asdf",
      className: "text"
    }, {
      type: "p",
      textContent: "asdf",
      className: "text"
    }, {
      type: "p",
      textContent: "asdf",
      className: "text"
    }, {
      type: "p",
      textContent: "asdf",
      className: "text"
    }, {
      type: "p",
      textContent: "asdf",
      className: "text"
    }, {
      type: "p",
      textContent: "asdf",
      className: "text"
    }, {
      type: "p",
      textContent: "asdf",
      className: "text"
    }, {
      type: "p",
      textContent: "asdf",
      className: "text"
    }]);
    res.send(elements, req.path);
  }
};