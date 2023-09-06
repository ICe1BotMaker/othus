import http from 'http';
import chalk from 'chalk';

import { ITF_page } from './types';

export const pages: ITF_page[] = [];

export function createPage(path: string, html: string) {
    pages.push({ path, html });
}

export function server(port: number) {
    const httpServer = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });

        pages.forEach((page: ITF_page) => {
            if (req.url === page.path) {
                res.write(page.html);
            }
        });

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