/**
 *
 */
const loadAndProcess = (theFile,data) => {
  const sample = io.loadImage(data);
  // Once the image is loaded, trigger the processing
  sample.then( (result) => {
    // Update image info
    let img = result.image;
    img.metadata.file = {};
    img.metadata.file.type = theFile.type || 'n/a';
    img.metadata.file.size = theFile.size || 'n/a';
    img.metadata.file.lastModified = new Date(theFile.lastModified).toLocaleDateString() || 'n/a';
    console.log(img);
    // Do the processing
    let win = new T.Window(theFile.name + ' - org');
    let workflow = cpu.pipe(cpu.toUint8(cpu.luminance),cpu.sobel3x3(cpu.BORDER_CLAMP_TO_EDGE),cpu.otsu,cpu.houghLines(360,240),cpu.view);
    let view = workflow(img.getRaster());
   // let peaks = workflow(img.getRaster());
    // let view = cpu.viewWithLayer(cpu.drawHougLines(peaks))(img.getRaster());
    win.addView(view);
    win.addToDOM('workspace');

  });
};

/**
 * Action when input/file used
 */
const handleFileSelect = (evt) => {
  let files = evt.target.files; // FileList object

  // files is a FileList of File objects. List some properties.
  let output = [];
  for (let f of files) {
    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = ( (theFile) => (e) => loadAndProcess(theFile, e.target.result) )(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
};


document.getElementById('files').addEventListener('change', handleFileSelect, false);


