import * as othus from './index';

const cors = () => {};

const App: othus.ITF = {
    middleware: [cors()],
    body: (req: object, res: othus.ITF_body_res) => {
        const elements = othus.compile({
            p: { textContent: `asdf`, className: `asdf` }
        });

        res.render(elements);
    }
}