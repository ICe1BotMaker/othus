export interface ITF {
    body: ITF_body;
    middleware?: any[];
}

export interface ITF_body {
    (req: object, res: ITF_body_res): any;
}

export interface ITF_body_res {
    send: ITF_body_res_send;
}

export interface ITF_body_res_send {
    (element: Element): any;
}

export interface ITFDoc {
    type: string;
    textContent?: string;
    className?: (any[] | string);
    child?: (ITFDoc | null | undefined);
}

export function render(object: any[] = []) {
    function send(elements: any[] = []) {
        console.log(JSON.stringify(elements, null, 4));
    }

    object[0].type.body({}, {
        send
    });
}

export function compile(array: any[] = []) {
    const foreach = (obj: ITFDoc = { type: `empty` }) => {
        const result: any[] = [];

        result.push(createElement(obj.type, obj?.child ? obj.child : null, obj.textContent));
        
        Object.keys(obj).forEach((key, idx) => {
            const value = Object.values(obj)[idx];

            if (typeof value === `object`) {
                foreach(value);
            }
        });

        return result;
    }

    const elements: any[] = [];
    array.forEach(object => {
        if (Array.isArray(foreach(object)) && foreach(object).length === 1) {
            elements.push(foreach(object)[0]);
        }
    });
    
    return elements;
}

export function createElement(type: string, child?: (ITFDoc | null | undefined), node_text?: string) {
    // const element = document.createElement(type);
    // if (node_text) element.textContent = node_text;
    // if (child) element.appendChild(child);
    // return element;
    return { type, child, node_text };
}