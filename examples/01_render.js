/**
 * Display images
 */

let img0 = new T.Image('boats','uint8',360,288);
img0.setPixels(boats_pixels);
let win0 = new T.Window('boats',360,288);
T.renderUint8(win0)(img0.getRaster());

// show() - Add canvas to the workspace in DOM
document.getElementById('workspace').appendChild(win0.HTMLelement);

let img1 = new T.Image('blobs','uint8',256,254);
img1.setPixels(blobs_pixels);
let win1 = new T.Window('blobs',256,254);
let view1 = T.view()(img1.getRaster());
view1.render(win1);

// show() - Add canvas to the workspace in DOM
document.getElementById('workspace').appendChild(win1.HTMLelement);

let img2 = new T.Image('clown','rgba',320,200);
img2.setPixels(clown_pixels);
let win2 = new T.Window('clown',320,200);
let view2 = T.view()(img2.getRaster());
view2.render(win2);

// show() - Add canvas to the workspace in DOM
document.getElementById('workspace').appendChild(win2.HTMLelement);

const DEG = Math.PI/180.0;
const spiral = (pix,i,x,y,z,w,h,a,d) => 128 * (Math.sin(d / 10+ a * DEG)+1);
const sine = (pix,i,x,y) => Math.sin((x + 2*y) * 5 * DEG) * 100 + 127;

let img3 = new T.Image('Sine','uint8',300,300);
let workflow = T.pipe(T.fill(spiral),T.view());
// T.fillColor(127)(img3.getRaster());
// T.fill(sine)(img3.getRaster());
let view = workflow(img3.getRaster());
let win3 = new T.Window('test',300,300);
view.render(win3);

// show() - Add canvas to the workspace in DOM
document.getElementById('workspace').appendChild(win3.HTMLelement);


