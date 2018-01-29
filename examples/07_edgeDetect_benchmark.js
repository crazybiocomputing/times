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
  let title;
  let outputRaster;
  let chess;

  // Try with various image size
  [32,32,64,128,256,512,1024,2048, 4096].forEach( (rasterSize) => {
    // Create an Image containing boats (from ImageJ))
    let img = new T.Image('uint8',rasterSize,rasterSize);
    // Log
    title = `${param.name} - ${rasterSize} - Pixels ${rasterSize **2}`;

    // Build chessboard
    chess = cpu.fill(cpu.chessboard)(img.getRaster());

    // Run Filter
    t0 = performance.now();
    outputRaster = param.filter(cpu.BORDER_REPEAT)(chess);
    t1 = performance.now();
    document.getElementById('performance').innerHTML += (`<p>Perf. ${title} = ${t1 - t0} milliseconds.</p>`);
  });

  /*
   Display the last one for checking
  // Create the window content from the view

  let view = cpu.view(outputRaster);
  
  let win = new T.Window(title);
  win.addView(view);
  // Add the window to the DOM and display it
  win.addToDOM('workspace');
  */
});


