import CanvasElement from './canvas-element.js';

export default class CanvasCircle extends CanvasElement {
    constructor(context, color, radius) {
        super(context);

        this._color = color;
        this._radius = radius;
    }

    getSize() {
        return this._radius;
    }

    setSize(newValue) {
        this._radius = newValue;
    }

    render() {
        this._context.fillStyle = this._color;

        this._context.beginPath();

        this._context.arc(this._position.x + this._radius, this._position.y + this._radius, this._radius, 0, 2 * Math.PI);

        this._context.lineWidth = 3;
        this._context.stroke();
    }

    _isPointInElement(x, y) {
        const center = this._getCenter();

        const distance = Math.sqrt((center.x - x) ** 2 + (center.y - y) ** 2);

        return distance <= this._radius;
    }

    _getCenter() {
        return {
            x: this._position.x + this._radius,
            y: this._position.y + this._radius
        }
    }
}