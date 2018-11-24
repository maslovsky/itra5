import Element from '../element.js';

export default class CanvasElement extends Element {
    constructor(context) {
        super();

        this._context = context;
    }

    bindMouseDown(event) {
        this._mouseDownEvent = ({offsetX, offsetY}) => {
            if (this._isPointInElement(offsetX, offsetY)) {
                event();
            }
        };
        
        this._context.canvas.addEventListener('mousedown', this._mouseDownEvent);
    }

    bindMouseUp(event) {
        this._mouseUpEvent = event;
        
        this._context.canvas.addEventListener('mouseup', this._mouseUpEvent);
    }

    render() {
        throw 'Not implemented';
    }

    destroy() {
        this._context.canvas.removeEventListener('mousedown', this._mouseDownEvent);
        this._context.canvas.removeEventListener('mouseup', this._mouseUpEvent);
    }

    _isPointInElement(x, y) {
        throw 'Not implemented';
    }
}