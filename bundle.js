"use strict";

window.onload = () => {
    const createElement = (page, obj) => {
        const element = document.createElement(obj.type);

        Object.keys(obj).forEach((key, idx) => {
            const value = Object.values(obj)[idx];
            
            if (child_list.includes(key)) {
                if (typeof value === `object` && value.name && value.value ? true : false) {
                    let result;
                    page.states.forEach(state => {
                        if (state.name === value.name) {
                            result = state;
                        }
                    });

                    obj.textContent = result.value;
                }

                if (key !== `textContent`) element.setAttribute(key, value);
                else element.textContent = obj.textContent;
            }

            if (on_list.includes(key)) {
                element[key.toLowerCase()] = () => {
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
            }
        });
        
        return element;
    }

    let pages = [];
    /* &*_-jsbo_-_*& */
    let interval;
    let child_list = [
        "id",

        "textContent",
        "className",
        "style",
        
        "src",
        "href",
        "value",
    ];
    let on_list = [
        "onClick",
        "onChange",
        "onInput",
        "onMouseDown",
        "onMouseMove",
        "onMouseUp",
        "onKeyDown",
        "onKeyUp",
    ]
    
    document.write(`<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Document</title>\n</head>\n<body>\n    <div id="root"></div>\n</body>\n</html>`);
    
    pages.forEach(page => {
        if (window.location.pathname === page.path) {
            // setInterval(() => {
                document.querySelector(`body #root`).innerHTML = ``;
                
                let viewer = [];
    
                const parse = obj => {
                    viewer.push(createElement(page, obj));
    
                    Object.keys(obj).forEach((key, idx) => {
                        const value = Object.values(obj)[idx];
        
                        if (key === `child` && Array.isArray(value)) {
                            value.forEach(e => parse(e));
                        }
                    })
                }
        
                page.json.forEach(element => parse(element));
                
                viewer.forEach(view => {
                    document.querySelector(`body #root`).appendChild(view);
                });
            // });
        }
    });
}