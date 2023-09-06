<img src="./othus.png" width="100%">

# 💫 othus
🆕 typescript-based framework

***Links: [npm](https://www.npmjs.com/package/othus), [github](https://github.com/kithub-Inc/othus)***

### 💬 Differences from express
- Create an **xml grammar** from within the **typescript** file.
- More detailed information than ever before.
- Stronger ***routing*** than traditional *routers*.

### 📌 Installation
Run from the shell of the operating system:
```
$ npm install othus
```

### 📂 Recommended Directory Structure
```
index.ts
src/
    components/
        Header.ts
    App.ts
```


### 💾 Example

`index.ts`
```ts
import othus from 'othus';

import { App } from './src/App';

othus.render([
    { type: App, path: `/` }
]);
```

`src/App.ts`
```ts
import othus from 'othus';

import { Header } from './components/Header';

const cors = () => () => {};

export const App: othus.ITF = {
    middleware: [cors()],
    stateOptions: (option: othus.ITF_stateOptions_option): any => option,
    body: (req: othus.ITF_body_req, res: othus.ITF_body_res) => {
        const elements: othus.ITFDoc[] = othus.compile([
            { type: Header },
            { type: `p`, textContent: String(othus.state(`text`, 0)), className: `count` },
            { type: `button`, textContent: `count`, className: `count-btn` }
        ]);

        res.send(elements, req.path);
    }
}
```