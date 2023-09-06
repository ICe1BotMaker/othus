import othus from '../../../index';

export const Header: othus.ITF = {
    body: (req: othus.ITF_body_req, res: othus.ITF_body_res) => {
        const elements: othus.ITFDoc[] = othus.compile([
            { type: `div`, className: `header`, child: [
                { type: `div`, className: `header-item`, textContent: `item-1` },
                { type: `div`, className: `header-item`, textContent: `item-2` },
                { type: `div`, className: `header-item`, textContent: `item-3` }
            ] }
        ]);

        res.send(elements, ``);
    }
}