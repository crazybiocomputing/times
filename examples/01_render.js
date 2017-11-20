/**
 * Display images
 */


let img0 = new T.Image('uint8',360,288);
img0.setPixels(boats_pixels);
let win0 = new T.Window('Boats');
let view0 = T.view(img0.getRaster());
// Create the window content from the view
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');


let img1 = new T.Image('uint8',256,254);
img1.setPixels(blobs_pixels);
let win1 = new T.Window('Blobs Salt&Pepper');
let workflow1 = T.pipe(T.saltAndPepper(0.1), T.view);
let view1 = workflow1(img1.getRaster());
// Create the window content from the view
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace');


let img2 = new T.Image('rgba',320,200);
img2.setPixels(clown_pixels);
let win2 = new T.Window('Clown');
let view2 = T.view(img2.getRaster());
// Create the window content from the view
win2.addView(view2);
// Add the window to the DOM and display it
win2.addToDOM('workspace');

let img21 = new T.Image('rgba',320,200);
img21.setPixels(clown_pixels);
let process = T.pipe(T.crop(140,23,112,103),T.view);
let view21 = process(img21.getRaster());
console.log(`${view21.width} x ${view21.height} `);
let win21 = new T.Window('Clown crop');
// Create the window content from the view
win21.addView(view21);
// Add the window to the DOM and display it
win21.addToDOM('workspace');


const DEG = Math.PI/180.0;
const spiral = (pix,i,x,y,z,w,h,a,d) => 128 * (Math.sin(d / 10+ a * DEG)+1);
const sine = (pix,i,x,y) => Math.sin((x + 2*y) * 5 * DEG) * 100 + 127;
const ramp = (pix,i,x,y,z,w,h) => x / w * 255 ;
const halves = (pix,i,x,y,z,w,h) => (x > w/2) ? pix & 0xffffff00 | 0x80 : pix;

let img3 = new T.Image('uint8',300,300);
let workflow3 = T.pipe(T.fill(spiral),T.view);
let view3 = workflow3(img3.getRaster());
let win3 = new T.Window('Spiral');
win3.addView(view3);
// Add the window to the DOM and display it
win3.addToDOM('workspace');

let img4 = new T.Image('uint8',350,50);
let workflow4 = T.pipe(T.fill(ramp),T.view);
let view4 = workflow4(img4.getRaster());
let win4 = new T.Window('Ramp');
win4.addView(view4);
// Add the window to the DOM and display it
win4.addToDOM('workspace');

let img5 = new T.Image('rgba',320,200);
img5.setPixels(clown_pixels);
let workflow5 = T.pipe(T.calc(halves),T.view);
let view5 = workflow5(img5.getRaster());
let win5 = new T.Window('Clown and Transparency');
win5.addView(view5);
// Add the window to the DOM and display it
win5.addToDOM('workspace');





