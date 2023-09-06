import othus from '../../index';

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