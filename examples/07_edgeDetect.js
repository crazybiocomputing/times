/**
 * Rank Filters Test
 *
 * @author Jean-Christophe Taveau
 */
'use script';

////////////////////////////////
//   R A N K   F I L T E R S
////////////////////////////////
[
  {name: 'Sobel3x3', filter: cpu.sobel3x3},
  {name: 'Laplace3x3', filter: cpu.laplacian3x3},
  {name: 'Laplace5x5', filter: cpu.laplacian5x5}  
].forEach( (param,i) => {
  // Declare some variables
  let t0, t1;

  // Create an Image containing boats (from ImageJ))
  let img = new T.Image('uint8',360,288);
  img.setPixels(new Uint8Array(boats_pixels));

  // Log
  let title = `${param.name}`;

  // Define worflow
  // let workflow = cpu.pipe(cpu.fill(cpu.chessboard),param.filter(cpu.BORDER_REPEAT), cpu.view);
  let workflow = cpu.pipe(param.filter(cpu.BORDER_REPEAT), cpu.view);
  // Run workflow
  t0 = performance.now();
  let view = workflow(img.getRaster());
  t1 = performance.now();
  document.getElementById('performance').innerHTML += (`<p>Perf. ${title} = ${t1 - t0} milliseconds.</p>`);

  // Create the window content from the view
  let win = new T.Window(title);
  win.addView(view);
  // Add the window to the DOM and display it
  win.addToDOM('workspace');

});

console.log('Canny - start');
// Declare some variables
let t0, t1;

// Create an Image containing boats (from ImageJ))
let img = new T.Image('uint8',300,246);
img.setPixels(new Uint8Array(coins_pixels));

// Log
let title = `Canny`;

// Define worflow
// let workflow = cpu.pipe(cpu.fill(cpu.chessboard),param.filter(cpu.BORDER_REPEAT), cpu.view);
let workflow = cpu.pipe(cpu.canny(50,128,cpu.BORDER_REPEAT), cpu.view);
// Run workflow
t0 = performance.now();
let view = workflow(img.getRaster());
t1 = performance.now();
document.getElementById('performance').innerHTML += (`<p>Perf. ${title} = ${t1 - t0} milliseconds.</p>`);

// Create the window content from the view
let win = new T.Window(title);
win.addView(view);
// Add the window to the DOM and display it
win.addToDOM('workspace');
