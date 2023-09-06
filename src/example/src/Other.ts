import othus from '../../index';

const cors = () => () => {};

export const Other: othus.ITF = {
    middleware: [cors()],
    body: (req: othus.ITF_body_req, res: othus.ITF_body_res) => {
        const elements: othus.ITFDoc[] = othus.compile([
            { type: `p`, textContent: `asdf`, className: `text` },
            { type: `p`, textContent: `asdf`, className: `text` },
            { type: `p`, textContent: `asdf`, className: `text` },
            { type: `p`, textContent: `asdf`, className: `text` },
            { type: `p`, textContent: `asdf`, className: `text` },
            { type: `p`, textContent: `asdf`, className: `text` },
            { type: `p`, textContent: `asdf`, className: `text` },
            { type: `p`, textContent: `asdf`, className: `text` }
        ]);

        res.send(elements, req.path);
    }
}