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
index.tsxo
src/
    components/
        Header.tsxo
    App.tsxo
```


### 💾 Example

`index.tsxo`
```ts
import othus from 'othus';

import { App } from './src/App';

othus.render(
    <App path="/" />
);
```

`src/App.tsxo`
```ts
import othus from 'othus';

import { Header } from './components/Header';

const cors = () => () => {};

export const App: othus.ITF = {
    middleware: [cors()],
    stateOptions: (option: othus.ITF_stateOptions_option) => option,
    body: (req: othus.ITF_body_req, res: othus.ITF_body_res) => {
        res.state(`text`, `0`);

        const count = (req: othus.ITF_body_req, res: othus.ITF_body_res) => {
            res.state(`text`, res.state(`text`) + 1);
        };
				
		const elements: othus.ITFDoc[] = othus.compile(
			<p className="count">{res.state(`text`)}</p>
            <p className="count-btn" onClick={count}>count</p>
        );

        res.send(elements, req.path);
    }
}
```