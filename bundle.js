let pages = [];
/* &*_-jsbo_-_*& */

document.write(`<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Document</title>\n</head>\n<body>\n    <div id="root"></div>\n</body>\n</html>`);

pages.forEach(page => {
    if (window.location.pathname === page.path) {
        const parse = obj => {
            Object.keys(obj).forEach((key, idx) => {
                const value = Object.values(obj)[idx];
            })
        }

        page.json.forEach(element => parse(element));
        
        // console.log(page);
    }
});