"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createElement = exports.compile = exports.render = exports.pages = void 0;
var server_1 = require("./server");
exports.pages = [];
function render() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var states = [];
  var send = function send() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var path = arguments.length > 1 ? arguments[1] : undefined;
    var parse = function parse(obj) {
      var _a;
      if (_typeof((_a = obj.type) === null || _a === void 0 ? void 0 : _a.body) === "undefined") {
        var result;
        exports.pages.forEach(function (page) {
          if (page.path === path) {
            result = page;
          }
        });
        if (_typeof(result) === "undefined") {
          var page = {
            path: path,
            json: [],
            states: [],
            html: ""
          };
          page.json.push(obj);
          page.states = states;
          page.html += createElement(obj);
          exports.pages.push(page);
        } else {
          exports.pages.forEach(function (page) {
            if (page.path === path) {
              page.json.push(obj);
              page.states = states;
              page.html += createElement(obj);
            }
          });
        }
      } else {
        var request = {};
        var response = {
          send: send,
          state: state
        };
        obj.type.body(request, response);
      }
    };
    arr.forEach(function (e) {
      return parse(e);
    });
  };
  var state = function state(name, value) {
    var result = {
      name: "",
      value: ""
    };
    states.forEach(function (state) {
      if (state.name === name) {
        result = state;
      }
    });
    if (_typeof(value) === "undefined") {
      return result;
    } else {
      if (result.name.trim() === "" && result.value.trim() === "") {
        states.push({
          name: name,
          value: value
        });
        var _result = {
          name: "",
          value: ""
        };
        states.forEach(function (state) {
          if (state.name === name) {
            _result = state;
          }
        });
        return _result;
      } else {
        var _result2 = {
          name: "",
          value: ""
        };
        states.forEach(function (state) {
          if (state.name === name) {
            state.value = value;
            _result2 = state;
          }
        });
        return _result2;
      }
    }
  };
  var componentElements = [];
  var otherElements = [];
  array.forEach(function (element) {
    var _a;
    if (_typeof((_a = element.type) === null || _a === void 0 ? void 0 : _a.body) === "function") {
      componentElements.push({
        element: element,
        path: element.path
      });
    } else {
      otherElements.push(element);
    }
  });
  send(otherElements, "/");
  componentElements.forEach(function (element) {
    var _a, _b;
    var request = {
      path: element.path
    };
    var response = {
      send: send,
      state: state
    };
    (_b = (_a = element.element.type) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.call(_a, request, response);
  });
  exports.pages.forEach(function (page) {
    (0, server_1.createPage)(page);
  });
  (0, server_1.server)(3000);
}
exports.render = render;
function compile() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return array;
}
exports.compile = compile;
function createElement(obj) {
  return "\n<".concat(obj.type, " ").concat(obj.className ? "class=\"".concat(Array.isArray(obj.className) ? obj.className.join(" ") : obj.className, "\"") : "", " ").concat(obj.href ? "href=\"".concat(Array.isArray(obj.href) ? obj.href.join(" ") : obj.href, "\"") : "", ">\n    ").concat(obj.textContent ? obj.textContent : obj.child ? obj.child.map(function (e) {
    return createElement(e);
  }).join("") : "", "\n</").concat(obj.type, ">");
}
exports.createElement = createElement;