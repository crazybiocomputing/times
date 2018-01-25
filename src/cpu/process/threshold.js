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
 * This program is distributed in the hope that it will be useful,
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

'use strict';

// Helper Functions

// Determine the first non-zero bin
const getFirstBin = (histogram) => histogram.findIndex( x => x > 0);

// Determine the last non-zero bin
// const getLastBin = (histogram) => histogram.length - 1 - histogram.slice().reverse().findIndex(x => x>0);
const getLastBin = (histogram) => histogram.reduceRight( (last,bin,index) => (bin > 0 && last === -1) ? index : last,-1);

// Cumulative Histogram
const cumulativeHistogram = (histogram) => {
  // TODO return histogram.map ( bin => bin + );
};


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
  let output = T.Raster.from(raster,copy_mode);
  raster.pixelData.forEach( (px,i) => output.pixelData[i] = (px > value) ? 0 : 255);
  // Update statistics + histogram
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
 * Implements Kapur-Sahoo-Wong (Maximum Entropy) thresholding method
 * Kapur J.N., Sahoo P.K., and Wong A.K.C. (1985) "A New Method for
 * Gray-Level Picture Thresholding Using the Entropy of the Histogram"
 * Graphical Models and Image Processing, 29(3): 273-285
 *
 * @param {TImage}   raster - Input gray-level image
 * @param {boolean} copy_mode - Boolean used to control the deep copy or not of the pixels data
 * @return {TImage} - Binary output image with True = 0 (black) and False = 255 (white) pixels
 *
 * @author M. Emre Celebi 06.15.2007 - Original Code
 * @author G.Landini - Ported to ImageJ plugin from E Celebi's fourier_0.8 routines
 * @author Alexis Hubert - Ported to TIMES
 *
 */

const maxEntropy = function (raster,copy=true) {
  let pixel = raster.pixelData;
  let data = toHistogram(raster);
  let thresh=-1;
  let ih, it;
  let tot_ent;
  let ent_back;
  let ent_obj;

  // Determine the normalized histogram
  let total = data.reduce((a, b)=> a+b,0); // Number of pixels? raster.pixelData.length
  let norm_histo = data.map(x => x / total);

  //Calculate cumulative normalized histogram
  let P1 = [...norm_histo];
  P1.reduce((a,b,c,d) => d[c] = a+b, 0);
  let P2 = [...P1];
  P2.reduce((a,b,c,d) => d[c] = 1-b, 0);

  // Determine the first non-zero bin
  let first_bin = data.findIndex(x => x>0);

  // Determine the last non-zero bin
  let last_bin = data.length - 1 - data.slice().reverse().findIndex(x => x>0);

  // Calculate the total entropy each gray-level and find the threshold that maximizes it
  let max_ent = Number.MIN_VALUE;
  let list = data.map((x,y)=> y);
  let list3 = [];
  let list4= [];

  for (it = first_bin; it <= last_bin; it++ ) {

    // Calculate entropy of background
    ent_back = 0.0;
    list3 = list.filter(x=> x<=it);
    let back = list3.map((a,b)=> data[a] != 0 && (ent_back -= ( norm_histo[a] / P1[it] ) * Math.log ( norm_histo[a] / P1[it] )));

    // Calculate entropy of object
    ent_obj = 0.0;
    list4 = list.filter(x=> x>=(it+1));
    let obj = list4.map((a,b)=> data[a] != 0 && (ent_obj -= ( norm_histo[a] / P2[it] ) * Math.log ( norm_histo[a] / P2[it] )));

    tot_ent = ent_back + ent_obj;

    max_ent < tot_ent && (
      max_ent = tot_ent,
      thresh = it
    );
  }
  
  console.log(`Max Entropy ${thresh}`);
  
  return threshold(thresh)(raster);
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
    cpt++;
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

