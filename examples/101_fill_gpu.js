/**
 * Raster Fill
 */
 
// Spiral
let img3 = new T.Image('uint8',600,300);

let gpuEnv = gpu.getGraphicsContext();

// Works with:
// cpu.spiral -OK
// cpu.ramp - OK
// cpu.black - OK
// cpu.white - OK
// cpu.chessboard -KO - Problem of cast between left and right operands of modulo (%) - Must be fixed

gpu.fill(cpu.ramp)(img3.getRaster(),gpuEnv);
