import { createPage, server } from "./server";

export interface ITF {
    body: ITF_body;
    path?: string;
    stateOptions?: ITF_stateOptions;
    middleware?: Function[];
}

export interface ITF_stateOptions {
    (option: ITF_stateOptions_option): any;
}

export interface ITF_stateOptions_option {
    id: string;
    dom: ITFDoc;
}

export interface ITF_body {
    (req: ITF_body_req, res: ITF_body_res): unknown;
}

export interface ITF_body_req {
    path: string;
}

export interface ITF_body_res {
    send: ITF_body_res_send;
    state: ITF_body_res_state;
}

export interface ITF_body_res_send {
    (array: ITFDoc[], path: string): unknown;
}

export interface ITF_body_res_state {
    (name: string, value?: string): string;
}

export interface ITF_page {
    path: string;
    json: ITFDoc[];
    states: ITF_state[];
    html: string;
}

export interface ITF_state {
    name: string;
    value: string;
}

export interface ITFDoc {
    type: any;

    path?: string;

    id?: string;

    textContent?: (string | ITF_state);
    className?: (string[] | string);
    child?: (ITFDoc[] | null);
    style?: (string | object);

    onClick?: (Function | string);
    onChange?: (Function | string);
    onInput?: (Function | string);
    onMouseDown?: (Function | string);
    onMouseMove?: (Function | string);
    onMouseUp?: (Function | string);
    onKeyDown?: (Function | string);
    onKeyUp?: (Function | string);
    
    src?: string;
    href?: string;
    value?: string;
}

export const pages: ITF_page[] = [];

export function render(array: ITFDoc[] = []) {
    const states: ITF_state[] = [];

    const send = (arr: ITFDoc[] = [], path: string) => {
        const parse = (obj: ITFDoc) => {
            if (typeof obj.type?.body === `undefined`) {
                let result: (ITF_page | undefined);
                pages.forEach(page => {
                    if (page.path === path) {
                        result = page;
                    }
                });

                if (typeof result === `undefined`) {
                    const page: ITF_page = {
                        path: path,
                        json: [],
                        states: [],
                        html: ``
                    };

                    page.json.push(obj);
                    page.states = states;
                    page.html += createElement(obj);
                    pages.push(page);
                } else {
                    pages.forEach(page => {
                        if (page.path === path) {
                            page.json.push(obj);
                            page.states = states;
                            page.html += createElement(obj);
                        }
                    });
                }
            } else {
                const request = {};
                const response = { send, state };
                obj.type.body(request, response);
            }
        }

        arr.forEach(e => parse(e));
    }
    
    const state = (name: string, value?: string) => {
        let result: ITF_state = { name: ``, value: `` };
        states.forEach(state => {
            if (state.name === name) {
                result = state;
            }
        });
    
        if (typeof value === `undefined`) {
            return result;
        } else {
            if (result.name.trim() === `` && result.value.trim() === ``) {
                states.push({ name, value });
    
                let result: ITF_state = { name: ``, value: `` };
                states.forEach(state => {
                    if (state.name === name) {
                        result = state;
                    }
                });
                
                return result;
            } else {
                let result: ITF_state = { name: ``, value: `` };
                states.forEach(state => {
                    if (state.name === name) {
                        state.value = value;
                        result = state;
                    }
                });
                
                return result;
            }
        }
    }

    let componentElements: any[] = [];
    let otherElements: ITFDoc[] = [];

    array.forEach(element => {
        if (typeof element.type?.body === `function`) {
            componentElements.push({ element, path: element.path });
        } else {
            otherElements.push(element);
        }
    });

    send(otherElements, `/`);

    componentElements.forEach(element => {
        const request = { path: element.path };
        const response = { send, state };
        element.element.type?.body?.(request, response);
    });

    pages.forEach((page: ITF_page) => {
        createPage(page);
    });

    server(3000);
}

export function compile(array: ITFDoc[] = []) {
    return array;
}

export function createElement(obj: ITFDoc): string {
    return `
<${obj.type} ${
    obj.className ? 
    `class="${
        Array.isArray(obj.className) ? 
        obj.className.join(` `) 
        : 
        obj.className
    }"` 
    : 
    ``
} ${
obj.href ? 
`href="${
    Array.isArray(obj.href) ? 
    obj.href.join(` `) 
    : 
    obj.href
}"` 
: 
``}>
    ${obj.textContent ? obj.textContent : (obj.child ? obj.child.map(e => createElement(e)).join(``) : ``)}
</${obj.type}>`;
}