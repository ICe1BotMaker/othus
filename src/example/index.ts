import othus from '../index';

import { App } from './src/App';
import { Other } from './src/Other';

othus.render([
    { type: `h1`, textContent: `Hello, world!`, className: `title` },
    { type: `p`, textContent: `Lorem ipsum dolor simit...`, className: `content` },
    { type: App, path: `/` },
    { type: Other, path: `/other` }
]);