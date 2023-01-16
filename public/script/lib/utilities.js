HTMLElement.prototype.appendChildren = function(children) {
    children = Array.isArray(children) ? children : [children];
    this.append(...children.map(child => child instanceof HTMLElement ? child : document.createTextNode(child)));
    return this;
};



export function createElement(tag, attributes = {}, events = {}) {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    Object.entries(events).forEach(([event, callback]) => {
        element.addEventListener(event, callback);
    });
    return element;
}