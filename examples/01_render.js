/**
 * Calculates statistics of image boats.gif
 */

let img0 = new T.Image('boats','uint8',360,288);
img0.setPixels(boats_pixels);
let win0 = new T.Window('boats',360,288);
T.renderUint8(win0)(img0.getRaster());
/*
console.log('renderUint8 ' + img0.pixelData[10000].toString(16) 
  + ' ' + (fromGray8(img0.pixelData[10000])>>>0).toString(16) 
  + ' ' + (toABGR(fromGray8(img0.pixelData[10000]))>>>0).toString(16));
*/

// show() - Add canvas to the workspace in DOM
document.getElementById('workspace').appendChild(win0.HTMLelement);

let img1 = new T.Image('blobs','uint8',256,254);
img1.setPixels(blobs_pixels);
let win1 = new T.Window('blobs',256,254);
T.renderUint8(win1)(img1.getRaster());

// show() - Add canvas to the workspace in DOM
document.getElementById('workspace').appendChild(win1.HTMLelement);

let img2 = new T.Image('clown','rgba',320,200);
img2.setPixels(clown_pixels);
let win2 = new T.Window('clown',320,200);
T.renderRGBA(win2)(img2.getRaster());

// show() - Add canvas to the workspace in DOM
document.getElementById('workspace').appendChild(win2.HTMLelement);
