/*
 *  TIMES: Tiny Image ECMAScript Application
 *  Copyright (C) 2017  Jean-Christophe Taveau.
 *
 *  This file is part of TIMES
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,Image
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with TIMES.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */

/**
 * Manual thresholding
 *
 * @param {number} value - Threshold value
 * @param {TRaster}   raster - Input gray-level image
 * @param {boolean} copy_mode - Boolean used to control the deep copy or not of the pixels data
 * @return {TRaster} - Binary output image with True = 0 (black) and False = 255 (white) pixels
 *
 * @author Jean-Christophe Taveau
 */
const threshold = (value) => (raster,copy_mode = true) => {
  console.log('threshold '+ value);
  let output = T.Raster.from(raster,copy_mode);
  raster.pixelData.forEach( (px,i) => output.pixelData[i] = (px > value) ? 0 : 255);
  cpu.histogram(256)(output,copy_mode);
  return output;
};


/**
 * Otsu thresholding
 * Adapted from http://www.labbookpages.co.uk/software/  rasterProc/otsuThreshold.html
 *
 * @param {Raster}   raster - Input gray-level image
 * @param {boolean} copy_mode - Boolean used to control the deep copy or not of the pixels data
 * @return {Raster} - Binary output image with True = 0 (black) and False = 255 (white) pixels
 *
 * @author Jordan Bevik <Jordan.Bevic@qtiworld.com> - Original C++ code 
 * @author G.Landini ported to ImageJ plugin
 * @author Mercia Ngoma Komb - JS port
 * @author Jean-Christophe Taveau - Bug Fix
 */

const otsu =  function(raster,copy_mode=true) {
    
  const otsuIJ = (histogram) => {
  
    // Init values
    let [S,N] = histogram.reduce((accu,bin,index,arr) => {
      accu[0] += index * bin; // Total histogram intensity
      accu[1] += bin;   // Total number of data points
      return accu;
    },[0,0]);

    // Look at each possible threshold value,
    // calculate the between-class variance, and decide if it's a max
    let finalThreshold = histogram.reduce( (accu,bin,k,arr) => {
      // k = the current threshold;
      accu.Sk += k * arr[k];
      accu.N1 += arr[k];
      
      // The float casting here is to avoid compiler warning about loss of precision and
      // will prevent overflow in the case of large saturated images
      let denom = ( accu.N1) * (N - accu.N1); // Maximum value of denom is (N^2)/4 =  approx. 3E10

      if (denom !== 0 ){
        let num = ( accu.N1 / N ) * S - accu.Sk;   // Maximum value of num =  255 * N = approx 8E7
        accu.BCV = (num * num) / denom;
      }
      else {
        accu.BCV = 0.0;
      }

      if (accu.BCV >= accu.BCVmax) { // Assign the best threshold found so far
        accu.BCVmax = accu.BCV;
        accu.kStar = k;
      }
      return accu;
      
    },{
      BCV: 0,    // The current Between Class Variance 
      BCVmax: 0, // Maximum BCV
      kStar:0,   // kStar = optimal threshold
      Sk: 0,     // The total intensity for all histogram points <=k
      N1: 0      // N1 = # points with intensity <=k
    });
    
   return finalThreshold.kStar;
  }
  

  // Get Histogram
  let binNumber = (raster.type === 'uint8' || raster.type === 'float32') ? 256 : 65536;
  raster = cpu.histogram(binNumber)(raster);
  // Compute threshold
  let the_threshold = otsuIJ(raster.statistics.histogram);
  console.log(`Otsu Threshold: ${the_threshold}`);
  // Apply threshold
  return threshold(the_threshold)(raster,copy_mode);;
}

/**
 * Max-entropy thresholding
 *
 * @param {TImage}   raster - Input gray-level image
 * @param {boolean} copy_mode - Boolean used to control the deep copy or not of the pixels data
 * @return {TImage} - Binary output image with True = 0 (black) and False = 255 (white) pixels
 *
 * @author Alexis Hubert
 */

const maxEntropy = function (  raster,copy=true) {
  // TODO
};

/**
* <Description>
*
* @param {number} value - Threshold value
* @param {number} kernelsize - Convolution filer size
* @param {boolean} copy_mode - Boolean used to control the deep copy or not of the pixels data
* @return {TRaster} - Binary output image with True = 0 (black) and False = 255 (white) pixels

* @author Rémy Viannais
*/
const adaptiveThreshold = (Threshold,kernelsize) => (raster,copy_mode=true) => {
  // TODO
};


/**
 * K-means thresholding
 *
 * @param {number} k - Number of clusters wanted
 * @param {TImage}   raster - Input gray-level image
 * @param {boolean} copy_mode - Boolean used to control the deep copy or not of the pixels data
 * @return {TImage} - Processed Image
 *
 * @author: Julien Benetti
 */

const kmeans = (k) => (raster,copy_mode = true) => {
  let output = T.Raster.from(raster,true);
  let data = T.Raster.from(raster,true).pixelData;
  
  // Force histogram computation
  let binNumber = (raster.type === 'uint8' || raster.type === 'float32') ? 256 : 65536;
  raster = cpu.histogram(binNumber)(raster);
  let histo = raster.statistics.histogram;

  // Initialize k number of random "centroids"
  let min = histo.findIndex(x => x > 0);
  let max = histo.length - histo.slice().reverse().findIndex(x => x > 0);
  let shisto = histo.slice(min,max);
  let centroidArray = shisto.map((x, idx) => idx+min).sort(() => 0.5-Math.random()).slice(0, k).sort((x, idx) => x-idx);

  // Find for each pixel the index of its closest centroid
  let labelArray = shisto.map((x, idx) => closestValueidx(idx+min, centroidArray));

  // Beginning of the kmeans loop
  let condition = true;
  while(condition) {
    // Initialize empty arrays of k lengths
    let newCentroidArray = Array(k).fill(0);
    let centroidNumber = [...newCentroidArray];

    // Add each pixel value of each cluster together
    labelArray.map((x, idx) => {
      newCentroidArray[x] += shisto[idx]*(idx+min);
      centroidNumber[x] += shisto[idx];});

    // Calculate new centroids and for each pixel the index of its closest one
    centroidArray = newCentroidArray.map((x, idx) => (x / centroidNumber[idx]) |0);
    let newLabelArray = shisto.map((x, idx) => closestValueidx(idx+min, centroidArray));

    // If none of them switch cluster : end of loop
    condition = !(labelArray.every((x, idx) => x === newLabelArray[idx]));
    (condition) && (labelArray = newLabelArray);
    cpt++
  }

  let minArray = Array(min).fill(0);
  let maxArray = Array(max-shisto.length-min).fill(k-1);
  flabelArray = [...minArray, ...labelArray, ...maxArray];

  // If binary thresholding : black and white. If multilevel : Value of the centroids.
  output.pixelData = (k==2) ? data.map(x => flabelArray[x]*255) : data.map(x => centroidArray[flabelArray[x]]);
  console.log(output);
  console.log('K-means');
  return output;
}

// Find in an array the index of its closest value to x
const closestValueidx = (x, arr) =>
        arr.map(y => x-y > 0 ? x-y : -(x-y))    // distance absolute value
           .reduce((bestidx, dist, idx, array) => dist < array[bestidx] ? idx : bestidx, 0);



export {otsu,threshold};

