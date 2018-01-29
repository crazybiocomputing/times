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
  {name: 'Variance',size: 3, size_or_radius: 1, type: cpu.KERNEL_CIRCLE, filter: cpu.varianceFilter},
  {name: 'Minimum',size: 7, size_or_radius: 7, type: cpu.KERNEL_SQUARE, filter: cpu.minimumFilter},
  {name: 'Maximum',size: 7, size_or_radius: 7, type: cpu.KERNEL_SQUARE, filter: cpu.maximumFilter},
  {name: 'Maximum',size: 7, size_or_radius: 1, type: cpu.KERNEL_RECTANGLE, filter: cpu.maximumFilter},
  {name: 'Median',size: 7, size_or_radius: 7, type: cpu.KERNEL_RECTANGLE, filter: cpu.medianFilter}
].forEach( (param,i) => {
  // Declare some variables
  let t0, t1;

  // Create an Image containing boats (from ImageJ))
  let img = new T.Image('uint8',360,288);
  img.setPixels(new Uint8Array(boats_pixels));

  // Log
  let title = `${param.name} ${param.size}x${param.size}`;
  title += (param.type === cpu.KERNEL_CIRCLE) ? ` - Radius: ${param.size_or_radius}` : '';
  title  = (param.type === cpu.KERNEL_RECTANGLE) ? `${param.name} ${param.size}x${param.size_or_radius}` : title;

  // Define kernel
  let size = param.size;
  let radius = param.size_or_radius;
  let kernel = cpu.convolutionKernel(
    param.type,                    // Circular or square kernel
    size,                          // kernel width - Square size kernel 5 x 5
    radius,                        // kernel height or radius depending of the kernel type
    new Array(size * size)         // Weights. Unused for rank filters but mandatory for creating kernel.
  );

  // Define worflow
  let workflow = cpu.pipe(param.filter(kernel, cpu.BORDER_REPEAT), cpu.view);
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


