/*
 * Compute Threshold with CPU
 * 
 * @author Jean-Christophe Taveau
 */
 
/*
 * Test image #1
 * From http://www.labbookpages.co.uk/software/imgProc/otsuThreshold.html
 * 
 */
 const pixels = [
  0,0,1,4,4,5,
  0,1,3,4,3,4,
  1,3,4,2,1,3,
  4,4,3,1,0,0,
  5,4,2,1,0,0,
  5,5,4,3,1,0
];

/*
 * Test image #2: Boats from ImageJ
 * 
 * ImageJ JS script to get histogram
 *
 * let imp = IJ.openImage("http://wsr.imagej.net/images/boats.gif");
 * IJ.run(imp, "Size...", "width=360 height=288 constrain average interpolation=Bilinear");
 * IJ.run(imp, "Histogram", "");
 * IJ.saveAs("Results", "Histogram of boats.csv");
 *
 */
 
 
/////////////////////////////////////
//
// O T S U
//
/////////////////////////////////////

// Test 1
let img1 = new T.Image('uint8',6,6);
img1.setPixels(new Uint8ClampedArray(pixels));
let raster1 = img1.getRaster();
let win1 = new T.Window('Otsu');

let binary1 = cpu.otsu(raster1);
let workflow1 = cpu.pipe(cpu.otsu, cpu.view);
let view1 = workflow1(raster1);
// Create the window content from the view
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace');

let test1 = (binary1.statistics.histogram[0] === 19 && binary1.statistics.histogram[255] === 17);
if (test1 === true) {
  document.getElementById('test').innerHTML +='<p>Test Image From http://www.labbookpages.co.uk/software/imgProc/otsuThreshold.html:  <b>OK</b></p>';
}
else {
  document.getElementById('test').innerHTML +='<p>Test Image From http://www.labbookpages.co.uk/software/imgProc/otsuThreshold.html:  <b>KO</b></p>';
}


 
/*
 Test 2 Boats
*/
let thresholdOtsuImageJ = 93;


let img2 = new T.Image('uint8',360,288);
img2.setPixels(new Uint8Array(boats_pixels));
let raster2 = img2.getRaster();

let binary = cpu.otsu(raster2);
console.log();
console.log(binary.statistics.histogram[255]);


let workflow2 = cpu.pipe(cpu.otsu, cpu.threshold(93), cpu.view);
let view2 = workflow2(raster2);

let win2 = new T.Window('Otsu - Boats');
// Create the window content from the view
win2.addView(view2);
// Add the window to the DOM and display it
win2.addToDOM('workspace');

let test2 = (binary.statistics.histogram[0] === 79067 && binary.statistics.histogram[255] === 24613);

if (test2 === true) {
  document.getElementById('test').innerHTML +='<p>Test Boats :  <b>OK</b></p>';
}
else {
  document.getElementById('test').innerHTML +='<p>Test Boats :  <b>KO</b></p>';
}


/////////////////////////////////////
//
// Max-entropy
//
/////////////////////////////////////



/////////////////////////////////////
//
// K-means
//
/////////////////////////////////////


/////////////////////////////////////
//
// Adaptive Threshold
//
/////////////////////////////////////




