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
export declare const states: ITF_state[];
export declare const state: (name: string, value?: (string | number)) => any;
export declare const pages: ITF_page[];
export declare function render(array?: ITFDoc[]): void;
export declare function compile(array?: ITFDoc[]): ITFDoc[];
export declare function createElement(obj: ITFDoc): string;
