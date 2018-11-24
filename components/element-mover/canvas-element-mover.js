import ElementMover from './element-mover.js';

export default class CanvasElementMover extends ElementMover {
    constructor(element, canvas) {
        super(element);

        this._canvas = canvas;

        this._initialize();
    }

    _bindMouseMove(event) {
        this._mouseMoveEventProcessing = ({pageX, pageY}) => {
            event(pageX, pageY);
        };

        this._canvas.ownerDocument.addEventListener('mousemove', this._mouseMoveEventProcessing);
    }

    _unbindMouseMove() {
        this._document.removeEventListener('mousemove', this._mouseMoveEventProcessing);
    }
}