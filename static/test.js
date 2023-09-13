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
var index_1 = __importDefault(require("./index"));
var cors = function cors() {};
exports.App = {
  middleware: [cors()],
  body: function body(req, res) {
    var elements = index_1["default"].compile({
      p: {
        textContent: "asdf",
        className: "asdf"
      }
    });
    res.render(elements);
  }
};