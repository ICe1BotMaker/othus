"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement = exports.compile = exports.render = exports.pages = exports.state = exports.states = void 0;
const server_1 = require("./server");
exports.states = [];
const state = (name, value) => {
    let result;
    exports.states.forEach(state => {
        if (state.name === name) {
            result = state;
        }
    });
    if (typeof value === `undefined`) {
        return result.value;
    }
    else {
        if (typeof result === `undefined`) {
            exports.states.push({ name, value });
            let result;
            exports.states.forEach(state => {
                if (state.name === name) {
                    result = state;
                }
            });
            return result.value;
        }
        else {
            let result;
            exports.states.forEach(state => {
                if (state.name === name) {
                    state.value = value;
                    result = state;
                }
            });
            return result.value;
        }
    }
};
exports.state = state;
// export const reqresset = () => {
//     const request = {};
//     const response = { send };
// }
exports.pages = [];
function render(array = []) {
    const send = (arr = [], path) => {
        const parse = (obj, idx) => {
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
                        view: ``
                    };
                    page.view += createElement(obj);
                    exports.pages.push(page);
                }
                else {
                    exports.pages.forEach(page => {
                        if (page.path === path) {
                            page.view += createElement(obj);
                        }
                    });
                }
            }
            else {
                const request = {};
                const response = { send };
                obj.type.body(request, response);
            }
        };
        arr.forEach((e, idx) => parse(e, idx));
        (0, server_1.server)();
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
        const response = { send };
        (_b = (_a = element.element.type) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.call(_a, request, response);
    });
    console.log(exports.pages);
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
            ``}>
    ${obj.textContent ? obj.textContent : (obj.child ? obj.child.map(e => createElement(e)).join(``) : ``)}
</${obj.type}>`;
}
exports.createElement = createElement;
