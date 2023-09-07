"use strict";

window.onload = () => {
    let pages = [];
    /* &*_-jsbo_-_*& */
    
    document.write(`<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Document</title>\n</head>\n<body>\n    <div id="root"></div>\n</body>\n</html>`);
    
    pages.forEach(page => {
        if (window.location.pathname === page.path) {
            const parse = obj => {
                console.log(obj);
                Object.keys(obj).forEach((key, idx) => {
                    const value = Object.values(obj)[idx];
    
                    if (key === `child` && Array.isArray(value)) {
                        value.forEach(e => parse(e));
                    }
                    
                    if (value.name && value.value) {
                        setInterval(() => {
                            page.states.forEach(state => {
                                if (state.name === value.name) {
                                    obj.textContent.value = state.value;
                                }
                            });
                        });
                    }

                    if (/\((.*)\)(.*)\=\>(.*)\{[\s\S]+\}/g.test(value) && typeof eval(value) === `function`) {
                        const state = (name, value) => {
                            let result;
                            page.states.forEach(state => {
                                if (state.name === name) {
                                    state.value = value;
                                    result = state;
                                }
                            });

                            return result;
                        }
                        
                        const request = {};
                        const response = { state };

                        eval(value)(request, response);
                    }
                })
            }
    
            page.json.forEach(element => parse(element));
            
            // console.log(page);
        }
    });
}