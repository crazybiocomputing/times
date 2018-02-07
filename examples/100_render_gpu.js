
/*****************   M A I N   ***********************/

/**
 * Invert uint8 images
 */
let img0 = new T.Image('uint8',256,254);
img0.setPixels(new Uint8Array(blobs_pixels));
// img01.setPixels(new Float32Array(float32_blobs) );
let win0 = new T.Window('Blobs uint8');
let view0 = cpu.view(img0.getRaster());
// Create the window content from the view
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');

/**
 * Invert uint16 images
 */
let img01 = new T.Image('uint16',256,254);
let uint16_blobs = blobs_pixels.map ( (px) => px * 256);
img01.setPixels(new Uint16Array(uint16_blobs) );
let win01 = new T.Window('Blobs uint16');
let view01 = cpu.view(img01.getRaster());
// Create the window content from the view
win01.addView(view01);
// Add the window to the DOM and display it
win01.addToDOM('workspace');

/**
 * Invert float32 images
 */
let img02 = new T.Image('float32',256,254);
let float32_blobs = blobs_pixels.map ( (px) => px / 256);
img02.setPixels(new Float32Array(float32_blobs) );
let win02 = new T.Window('Blobs float32');
let view02 = cpu.view(img02.getRaster());
win02.addView(view02);
win02.addToDOM('workspace');


/**
 * GPU
 */
let gpuEnv01 = gpu.getGraphicsContext('previewUint8');
gpu.invert(img0.getRaster(),gpuEnv01);
let gpuEnv02 = gpu.getGraphicsContext('previewUint16');
gpu.invert(img01.getRaster(),gpuEnv02);
let gpuEnv03 = gpu.getGraphicsContext('previewFloat32');
gpu.invert(img02.getRaster(),gpuEnv03);
