"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement = exports.render = void 0;
function render(element) {
}
exports.render = render;
function createElement(type, child) {
    const element = document.createElement(type);
    if (child)
        element.appendChild(child);
    return element;
}
exports.createElement = createElement;
