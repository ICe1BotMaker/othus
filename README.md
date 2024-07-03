<img src="https://raw.githubusercontent.com/kithub-Inc/othus/master/othus.png" width="100%">

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

othus.render(
    <App path="/" />
);
```

`src/App.ts`
```ts
import othus from 'othus';

import { Header } from './components/Header';

const cors = () => () => {};

export const App: othus.ITF = {
    middleware: [cors()],
    stateOptions: (option) => option,
    body: (req, res) => {
        res.state(`text`, `0`);

        const count = (req, res) => {
            res.state(`text`, res.state(`text`) + 1);
        };
				
        const elements = othus.compile(
            <p className="count">{res.state(`text`)}</p>
            <p className="count-btn" onClick={count}>count</p>
        );

        res.send(elements, req.path);
    }
}
```
