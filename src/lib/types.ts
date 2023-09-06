import { server } from "./server";

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

export const states: any[] = [];

export const state = (name: string, value?: (string | number)) => {
    let result: any;
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

            let result: any;
            states.forEach(state => {
                if (state.name === name) {
                    result = state;
                }
            });
            
            return result.value;
        } else {
            let result: any;
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

// export const reqresset = () => {
//     const request = {};
//     const response = { send };
// }

export const pages: any[] = [];

export function render(array: ITFDoc[] = []) {
    const send = (arr: ITFDoc[] = [], path: string) => {
        const parse = (obj: ITFDoc, idx: number) => {
            if (typeof obj.type?.body === `undefined`) {
                let result;
                pages.forEach(page => {
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
                    pages.push(page);
                } else {
                    pages.forEach(page => {
                        if (page.path === path) {
                            page.view += createElement(obj);
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
        server();
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


    console.log(pages);
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