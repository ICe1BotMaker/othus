import { ITF_page } from './types';
export declare const pages: ITF_page[];
export declare function createPage({ path, json, states, html }: ITF_page): void;
export declare function server(port: number): void;
