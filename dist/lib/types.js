"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement = exports.compile = exports.render = exports.pages = void 0;
const server_1 = require("./server");
exports.pages = [];
function render(array = []) {
    const states = [];
    const send = (arr = [], path) => {
        const parse = (obj) => {
            var _a;
            if (typeof ((_a = obj.type) === null || _a === void 0 ? void 0 : _a.body) === `undefined`) {
                let result;
                exports.pages.forEach(page => {
                    if (page.path === path) {
                        result = page;
                    }
                });
                if (typeof result === `undefined`) {
                    const page = {
                        path: path,
                        json: [],
                        states: [],
                        html: ``
                    };
                    page.json.push(obj);
                    page.states = states;
                    page.html += createElement(obj);
                    exports.pages.push(page);
                }
                else {
                    exports.pages.forEach(page => {
                        if (page.path === path) {
                            page.json.push(obj);
                            page.states = states;
                            page.html += createElement(obj);
                        }
                    });
                }
            }
            else {
                const request = {};
                const response = { send, state };
                obj.type.body(request, response);
            }
        };
        arr.forEach(e => parse(e));
    };
    const state = (name, value) => {
        let result = { name: ``, value: `` };
        states.forEach(state => {
            if (state.name === name) {
                result = state;
            }
        });
        if (typeof value === `undefined`) {
            return result;
        }
        else {
            if (result.name.trim() === `` && result.value.trim() === ``) {
                states.push({ name, value });
                let result = { name: ``, value: `` };
                states.forEach(state => {
                    if (state.name === name) {
                        result = state;
                    }
                });
                return result;
            }
            else {
                let result = { name: ``, value: `` };
                states.forEach(state => {
                    if (state.name === name) {
                        state.value = value;
                        result = state;
                    }
                });
                return result;
            }
        }
    };
    let componentElements = [];
    let otherElements = [];
    array.forEach(element => {
        var _a;
        if (typeof ((_a = element.type) === null || _a === void 0 ? void 0 : _a.body) === `function`) {
            componentElements.push({ element, path: element.path });
        }
        else {
            otherElements.push(element);
        }
    });
    send(otherElements, `/`);
    componentElements.forEach(element => {
        var _a, _b;
        const request = { path: element.path };
        const response = { send, state };
        (_b = (_a = element.element.type) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.call(_a, request, response);
    });
    exports.pages.forEach((page) => {
        (0, server_1.createPage)(page);
    });
    (0, server_1.server)(3000);
}
exports.render = render;
function compile(array = []) {
    return array;
}
exports.compile = compile;
function createElement(obj) {
    return `
<${obj.type} ${obj.className ?
        `class="${Array.isArray(obj.className) ?
            obj.className.join(` `)
            :
                obj.className}"`
        :
            ``} ${obj.href ?
        `href="${Array.isArray(obj.href) ?
            obj.href.join(` `)
            :
                obj.href}"`
        :
            ``}>
    ${obj.textContent ? obj.textContent : (obj.child ? obj.child.map(e => createElement(e)).join(``) : ``)}
</${obj.type}>`;
}
exports.createElement = createElement;
