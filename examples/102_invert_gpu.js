/**
 * Invert colors
 *
 * @author Jean-Christophe Taveau
 */
 
// Create an Image containing boats (from ImageJ))
let img = new T.Image('uint8',360,288);
img.setPixels(new Uint8Array(boats_pixels));

// Get a graphics context from canvas
let gpuEnv = gpu.getGraphicsContext();

// Run invert 
gpu.invert(img.getRaster(),gpuEnv);
