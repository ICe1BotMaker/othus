import othus from '../../index';

import { Header } from './components/Header';

const cors = () => () => {};

export const App: othus.ITF = {
    middleware: [cors()],
    stateOptions: (option: othus.ITF_stateOptions_option): any => option,
    body: (req: othus.ITF_body_req, res: othus.ITF_body_res) => {
        res.state(`text`, `0`);

        const count = (req: othus.ITF_body_req, res: othus.ITF_body_res) => res.state(`text`, Number(res.state(`text`)) + 1);

        const elements: othus.ITFDoc[] = othus.compile([
            { type: Header },
            { type: `p`, textContent: res.state(`text`), className: `count` },
            { type: `button`, textContent: `count`, className: `count-btn`, onClick: count.toString() },
            { type: `a`, href: `/other`, textContent: `link` }
        ]);

        res.send(elements, req.path);
    }
}