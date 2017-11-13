/**
 * Calculates statistics of image boats.gif
 */


let img = new T.Image('clown','rgba',320,200);
img.setPixels(clown_pixels);

console.log(img instanceof T.Image);
console.log(T.hue(0xff0a20ff));

// Process
let nChannels = 9;

let workflow = T.pipe(
T.splitChannels(T.red,T.green,T.blue, T.hue, T.saturation, T.value,T.luminance, T.chrominanceRed, T.chrominanceBlue),
T.montage(3,3)
);

let view = workflow(img.raster);

// Render
let win = new T.Window('clown',view.width,view.height);
T.renderUint8(win)(view.raster);

// show() - Add canvas to the workspace in DOM
document.getElementById('workspace').appendChild(win.HTMLelement);
