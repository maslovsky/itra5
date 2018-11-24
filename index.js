import CanvasManager from './components/canvas-manager/canvas-manager.js';
import CanvasCircle from './components/elements/canvas/canvas-circle.js';

import cropCircle from './helpers/canvas-helper.js';

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', onReady);

    const maxSize = 200;
    const minSize = 100;

    function onReady() {
        const input = document.body.querySelector('.inputfile');
   
        input.addEventListener('change', (e) => {
            const image = new Image();

            image.onload = onImageLoad;

            image.src = URL.createObjectURL(e.target.files[0]);
        });
    }

    function onImageLoad(e) {
        const canvas = document.body.querySelector('.main-canvas');
        const image = document.body.querySelector('.preview img');

        const canvasManager = new CanvasManager(canvas, e.target);
        canvasManager.bindOnRender(() => onRender(canvasManager, image));

        drawCircle(canvasManager);
        
        bindOnWheel(canvasManager);
    }

    function onRender(canvasManager, image) {
        const element = canvasManager.getFirstChild();
        const {x, y} = element.getPosition();
        const size = element.getSize() * 2;

        image.setAttribute('src', cropCircle(canvasManager._context, x, y, size, size));
    }

    function drawCircle(canvasManager) {
        canvasManager.addElement(context => new CanvasCircle(context, null, minSize), 0, 0);
    }

    function bindOnWheel(canvasManager) {
        const canvas = document.body.querySelector('.main-canvas');

        const firstChild = canvasManager.getFirstChild();

        canvas.addEventListener('wheel', (e) => {
            const delta = e.deltaY / 10;

            rescale(firstChild, delta);
            canvasManager.render();
        });
    }

    function rescale(element, delta) {
        const size = element.getSize() - delta;

        if (size <= minSize || size > maxSize) {
            return;
        }

        const {x, y} = element.getPosition();

        element.setSize(size);
        element.setPosition(x + delta, y + delta);
    } 
}());