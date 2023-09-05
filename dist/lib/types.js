"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement = exports.compile = exports.render = void 0;
function render(object = []) {
    function send(elements = []) {
        console.log(JSON.stringify(elements, null, 4));
    }
    object[0].type.body({}, {
        send
    });
}
exports.render = render;
function compile(array = []) {
    const foreach = (obj = { type: `empty` }) => {
        const result = [];
        result.push(createElement(obj.type, (obj === null || obj === void 0 ? void 0 : obj.child) ? obj.child : null, obj.textContent));
        Object.keys(obj).forEach((key, idx) => {
            const value = Object.values(obj)[idx];
            if (typeof value === `object`) {
                foreach(value);
            }
        });
        return result;
    };
    const elements = [];
    array.forEach(object => {
        if (Array.isArray(foreach(object)) && foreach(object).length === 1) {
            elements.push(foreach(object)[0]);
        }
    });
    return elements;
}
exports.compile = compile;
function createElement(type, child, node_text) {
    // const element = document.createElement(type);
    // if (node_text) element.textContent = node_text;
    // if (child) element.appendChild(child);
    // return element;
    return { type, child, node_text };
}
exports.createElement = createElement;
