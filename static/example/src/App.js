"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;
var index_1 = __importDefault(require("../../index"));
var Header_1 = require("./components/Header");
var cors = function cors() {
  return function () {};
};
exports.App = {
  middleware: [cors()],
  stateOptions: function stateOptions(option) {
    return option;
  },
  body: function body(req, res) {
    res.state("text", "0");
    var idx = 0;
    var count = function count(req, res) {
      idx += 1;
      res.state("text", String(idx));
    };
    var elements = index_1["default"].compile([{
      type: Header_1.Header
    }, {
      type: "p",
      textContent: res.state("text"),
      className: "count"
    }, {
      type: "button",
      textContent: "count",
      className: "count-btn",
      onClick: count.toString()
    }, {
      type: "a",
      href: "/other",
      textContent: "link"
    }]);
    res.send(elements, req.path);
  }
};