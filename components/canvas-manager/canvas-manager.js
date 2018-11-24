import CanvasElementMover from '../element-mover/canvas-element-mover.js';
import CanvasElement from '../elements/canvas/canvas-element.js';

export default class CanvasManager {
    constructor(canvas, image) {
        this.canvas = canvas;
        this._context = canvas.getContext('2d')
        this._image = image;

        this._objects = [];
        this._currentMovingElement = null;
    }

    addElement(createElement, x, y) {
        const element = createElement(this._context);

        this._createElementMover(element);

        if (element instanceof CanvasElement) {
            element.setPosition(x, y);

            this._objects.push(element);
            this.render();
        }
    }

    getFirstChild() {
        return this._objects[0];
    }

    bindOnRender(callback) {
        this._onRender = callback;
    }

    _createElementMover(element) {
        const elementMover = new CanvasElementMover(element, this.canvas);

        elementMover.bindOnMouseMove(this._getElementOnMouseMove(elementMover));

        elementMover.bindOnPlaced(this._getElementOnPlaced());
    }

    _getElementOnMouseMove(elementMover) {
        return () => {
            if (this._currentMovingElement !== null && this._currentMovingElement !== elementMover) {
                return true;
            }
    
            this._currentMovingElement = elementMover;

            this.render();
        }
    }

    _getElementOnPlaced() {
        return () => {
            this._currentMovingElement = null;
            this.render()
        };
    }

    render() {
        this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this._context.drawImage(this._image, 0, 0, this.canvas.width, this.canvas.height);

        if (this._onRender) {
            this._onRender();
        }

        this._objects.forEach(x => x.render());
    }
}