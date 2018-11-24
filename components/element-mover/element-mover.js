export default class ElementMover {
    constructor(element) {
        if (!element) {
            throw 'Element is not defined';
        }

        this._element = element;
        this._isMouseDown = false;
    }

    getElement() {
        return this._element;
    }

    bindOnPlaced(event) {
        this._onPlaced = event;
    }

    bindOnMouseMove(event) {
        this._onMouseMoveCallback = event;
    }

    _initialize() {
        this._element.bindMouseDown(() => this._MouseDown());
        this._element.bindMouseUp(() => this._MouseUp());

        this._bindMouseMove((x, y) => this._MouseMove(x, y));
    }

    _bindMouseMove() {
        throw 'Not implemented';
    }

    _unbindMouseMove() {
        throw 'Not implemented';
    }

    _MouseDown() {
        const {x, y} = this._element.getPosition();

        this._mouseOffset = {
            x: this._mousePosition.x - x,
            y: this._mousePosition.y - y,
        };

        this._isMouseDown = true;
    }

    _MouseUp() {
        this._mouseOffset = {x: 0, y: 0};

        if (this._onPlaced) {
            const {x, y} = this._element.getPosition();

            this._onPlaced(x, y);
        }

        this._isMouseDown = false;
    }

    _MouseMove(x, y) {
        this._mousePosition = {x, y};

        if (this._isMouseDown && this._checkMouseMoveCallback()) {
            this._element.setPosition(x - this._mouseOffset.x, y - this._mouseOffset.y);
        }
    }

    _checkMouseMoveCallback() {
        return !this._onMouseMoveCallback || (this._onMouseMoveCallback && !this._onMouseMoveCallback());
    }

    destroy() {
        this._unbindMouseMove();
        this._element.destroy();
    }
}