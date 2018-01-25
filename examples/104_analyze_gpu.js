/*
 * Analyze with GPU
 * 
 * @author Jean-Christophe Taveau
 */
 
 
/*
 * Test image particles_200x100
 * 
 */

let img1 = new T.Image('uint8',200,100);
img1.setPixels(new Uint8ClampedArray(particles_pixels));

let view1 = cpu.view(img1.getRaster());
// Create the window content from the view
let win1 = new T.Window(`Particles`);
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace');


// Get Graphics Context
let gpuEnv = gpu.getGraphicsContext();

// TODO - Labelling Component

/*
 * Test labelled image particlesROI_200x100
 * 
 *
 * Results from ImageJ:
 * Num,Area,X      ,Y     ,Perim. ,BX ,BY,Width,Height,Feret ,FeretX,FeretY,FeretAngle,MinFeret
 * 1  ,238 ,55.500 ,20.000,55.355 ,47 ,11,17   ,18    ,18.682,53    ,11    ,105.524   ,17.000
 * 2  ,302 ,116.387,36.424,594.284,85 ,11,54   ,52    ,74.967,85    ,11    ,136.081   ,52.000
 * 3  ,238 ,27.500 ,26.000,55.355 ,19 ,17,17   ,18    ,18.682,25    ,17    ,105.524   ,17.000
 * 4  ,696 ,173.569,48.062,230.007,154,27,40   ,43    ,45.486,154   ,60    ,33.341    ,40.000
 * 5  ,1139,76.728 ,69.192,166.368,62 ,39,36   ,54    ,58.523,64    ,41    ,123.147   ,34.038
 * 6  ,238 ,21.500 ,52.000,55.355 ,13 ,43,17   ,18    ,18.682,19    ,43    ,105.524   ,17.000
 * 7  ,238 ,47.500 ,59.000,55.355 ,39 ,50,17   ,18    ,18.682,45    ,50    ,105.524   ,17.000
 * 8  ,546 ,22.022 ,85.342,117.598,8  ,68,41   ,26    ,48.549,8     ,68    ,147.619   ,22.746
 * 9  ,680 ,133.000,81.500,111.657,113,73,40   ,17    ,43.463,113   ,73    ,156.975   ,17.000
 */

let img2 = new T.Image('uint8',200,100);
img2.setPixels(new Uint8ClampedArray(particlesROI_pixels));
let raster2 = img2.getRaster();
let view2 = cpu.view(raster2);

// Number of ROIs = number of bins in histogram - 1 (background)
numROIs = 256; 
let tmp = cpu.histogram(numROIs)(raster2);
let lastBin = tmp.statistics.histogram.reduceRight ( (last,bin,index) => (bin > 0 && last === -1) ? index : last,-1);
console.log(`Last Bin = ${lastBin}`);
let numROI = lastBin;

// Areas = histogram
console.log(tmp.statistics.histogram.slice(1,numROI + 1));

// Create the window content from the view
let win2 = new T.Window(`Particles Labelled`);
win2.addView(view2);
// Add the window to the DOM and display it
win2.addToDOM('workspace');


// Get Graphics Context
gpuEnv = gpu.getGraphicsContext();

// TODO Measurement(s) from particlesROI_pixels
