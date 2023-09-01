export interface ITF {
    body: ITF_body;
    middleware?: any[];
}

export interface ITF_body {
    (req: object, res: ITF_body_res): any;
}

export interface ITF_body_res {
    render: ITF_body_res_render;
}

export interface ITF_body_res_render {
    (element: Element): any;
}

export function render(element: Element) {
    
}

export function compile_sub(object: object = {}, arr: any[] = []) {
    Object.keys(object).forEach((key: string, idx: number) => {
        const value = Object.values(object)[idx];
        if (value?.child) {
            compile_sub(value);
            arr.push(createElement(key, value.child, value?.textContent ? value.textContent : null), arr);
        } else {
            arr.push(createElement(key, null, value?.textContent ? value.textContent : null), arr);
        }
    });

    return arr;
}

export function compile(object: object = {}): Element {
    return compile_sub(object, [])[0];
}

export function createElement(type: string, child?: Element | null, node_text?: string) {
    const element = document.createElement(type);
    if (node_text) element.textContent = node_text;
    if (child) element.appendChild(child);
    return element;
}