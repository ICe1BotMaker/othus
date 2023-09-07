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
    (name: string, value?: any): string;
}
export interface ITF_page {
    path: string;
    json: ITFDoc[];
    states: ITF_state[];
    html: string;
}
export interface ITF_state {
    name: string;
    value: any;
}
export interface ITFDoc {
    type: any;
    path?: string;
    id?: string;
    textContent?: string;
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
}
export declare const pages: ITF_page[];
export declare function render(array?: ITFDoc[]): void;
export declare function compile(array?: ITFDoc[]): ITFDoc[];
export declare function createElement(obj: ITFDoc): string;
