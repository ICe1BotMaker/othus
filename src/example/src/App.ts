import othus from '../../index';

const cors = () => {};

export const App: othus.ITF = {
    middleware: [cors()],
    body: (req: object, res: othus.ITF_body_res) => {
        const elements: any = othus.compile([
            { type: `p`, textContent: `asdf`, className: `asdf` },
            { type: `p`, textContent: `3asdf23`, className: `as2345df` },
            { type: `p`, textContent: `ㅅㄴ주ed`, className: `샌즈` },
            { type: `div`, child: { type: `span`, textContent: `sansdance`, className: `sansbounce` } }
        ]);

        res.send(elements);
    }
}