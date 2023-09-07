import fs from 'fs';
import http from 'http';
import chalk from 'chalk';
import uglify from 'uglify-js';

import { ITF_page } from './types';

export const pages: ITF_page[] = [];

export function createPage({ path, json, states, html }: ITF_page) {
    pages.push({ path, json, states, html });
}

export function server(port: number) {
    const httpServer = http.createServer((req, res) => {
        if (req.url === `/bundle.js`) {
            res.write(uglify.minify(fs.readFileSync(`./bundle.js`, `utf-8`).replace(`/* &*_-jsbo_-_*& */`, `pages = ${JSON.stringify(pages)}`)).code);
        } else {
            res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
            res.write(`<script src="/bundle.js" nocode async></script>`);
        }

        res.end();
    });

    httpServer.listen(port, () => {
        console.clear();
        console.log(chalk.blue(`local :: othus-beta.v1`));
        console.log(chalk.bold.underline(`This is not a safe version yet.`));
        console.log();
        console.log(chalk.yellow(`https://github.com/kithub-Inc/othus`));
        console.log(chalk.gray(`Please check the official document for details.`));
        console.log();
        console.log(chalk.gray(`(ctrl + click) -> `) + chalk.cyan(`http://localhost:${port}`));
    });
}