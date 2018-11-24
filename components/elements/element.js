export default class Element {
    constructor() {
        this._position = {x: 0, y: 0};
    }
    
    getPosition() {
        return Object.assign({}, this._position);
    }

    setPosition(x, y) {
        this._position.x = x;
        this._position.y = y;
    }

    bindMouseDown(event) {
        throw 'Not implemented';
    }

    bindMouseUp(event) {
        throw 'Not implemented';
    }

    destroy() {

    }
}