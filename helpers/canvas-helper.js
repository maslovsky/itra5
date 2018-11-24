export default function cropCircle(sourceContext, x, y, width, height) {
    const image = sourceContext.getImageData(x, y, width, height);

    const canvas = document.createElement('canvas');
    
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    const context = canvas.getContext('2d');
    context.putImageData(image, 0, 0);

    cutCircle(context, width, height);

    return canvas.toDataURL();
}

function cutCircle(context, width, height) {
    context.globalCompositeOperation='destination-in';
    context.beginPath();
    context.arc(width / 2, height / 2, width / 2 - 10, 0, Math.PI * 2);
    context.closePath();
    context.fill();
}