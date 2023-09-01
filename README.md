# 💫 othus
🆕 typescript-based framework

***Links: [npm](), [github]()***

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
...


### 💾 Example

```ts
import * as othus from 'othus';

const App: othus.ITF = {
    /* your middleware */
    middleware: [],
    body: (req: object, res: othus.ITF_body_res) => {
        const elements = othus.compile({
            p: { textContent: `asdf`, className: `asdf` }
        });

        res.render(elements);
    }
}
```