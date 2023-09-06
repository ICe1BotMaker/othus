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
}

export interface ITF_body_res_send {
    (array: ITFDoc[], path: string): unknown;
}

export interface ITF_page {
    path: string;
    html: string;
}

export interface ITF_state {
    name: string;
    value: any;
}

export interface ITFDoc {
    type: any;

    path?: string;

    textContent?: string;
    className?: (string[] | string);
    child?: (ITFDoc[] | null);
    style?: (string | object);

    onClick?: Function;
    onChange?: Function;
    onInput?: Function;
    onMouseDown?: Function;
    onMouseMove?: Function;
    onMouseUp?: Function;
    onKeyDown?: Function;
    onKeyUp?: Function;
    
    src?: string;
    href?: string;
}

export const states: ITF_state[] = [];

export const state = (name: string, value?: (string | number)) => {
    let result: ITF_state = { name: ``, value: `` };
    states.forEach(state => {
        if (state.name === name) {
            result = state;
        }
    });

    if (typeof value === `undefined`) {
        return result.value;
    } else {
        if (typeof result === `undefined`) {
            states.push({ name, value });

            let result: ITF_state = { name: ``, value: `` };
            states.forEach(state => {
                if (state.name === name) {
                    result = state;
                }
            });
            
            return result.value;
        } else {
            let result: ITF_state = { name: ``, value: `` };
            states.forEach(state => {
                if (state.name === name) {
                    state.value = value;
                    result = state;
                }
            });
            
            return result.value;
        }
    }
}

export const pages: ITF_page[] = [];

export function render(array: ITFDoc[] = []) {
    const send = (arr: ITFDoc[] = [], path: string) => {
        const parse = (obj: ITFDoc, idx: number) => {
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
                        html: ``
                    };

                    page.html += createElement(obj);
                    pages.push(page);
                } else {
                    pages.forEach(page => {
                        if (page.path === path) {
                            page.html += createElement(obj);
                        }
                    });
                }
            } else {
                const request = {};
                const response = { send };
                obj.type.body(request, response);
            }
        }

        arr.forEach((e, idx) => parse(e, idx));
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
        const response = { send };
        element.element.type?.body?.(request, response);
    });

    pages.forEach(page => {
        createPage(page.path, page.html);
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
}>
    ${obj.textContent ? obj.textContent : (obj.child ? obj.child.map(e => createElement(e)).join(``) : ``)}
</${obj.type}>`;
}