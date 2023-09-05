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
export declare function render(object?: any[]): void;
export declare function compile(array?: any[]): any[];
export declare function createElement(type: string, child?: (ITFDoc | null | undefined), node_text?: string): {
    type: string;
    child: ITFDoc | null | undefined;
    node_text: string | undefined;
};
