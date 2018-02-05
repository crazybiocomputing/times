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
 * @module hough
 */
 
/**
 * Linear Hough Transform
 * Ported from http://rosettacode.org/wiki/Hough_transform#Java
 * 
 * @param {type} params - Parameters
 * @param {TRaster} img - Input image to process
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - Image corresponding to the accumulator
 *
 * @author Théo Falgarone
 * @author Jean-Christophe Taveau
 */
const houghLines = (theta_hough_width, rho_height, keep_source = false) => (raster,copy=true) => {
  let output =  T.Raster.from(raster,false);
  let w = raster.width;
  let h = raster.height;

  // Hough height must be even
  let rho_hough_height = Math.trunc(rho_height / 2.0) * 2;
  let cy = rho_hough_height / 2.0;

  let maxRadius = Math.ceil(Math.hypot(w,h));
  let half_rho_hough_height = rho_hough_height / 2.0;

  console.log(`${theta_hough_width} x ${rho_hough_height} = ${theta_hough_width * rho_hough_height} ${maxRadius}`);
  // Update width
  output.width = theta_hough_width;
  output.height = rho_hough_height;
  output.type = 'float32';

  // Precompute theta, cos(theta), sin(theta)
  let thetas = Array.from({length : theta_hough_width }, (v,i) => {
    let th = i * Math.PI / theta_hough_width;
    return {theta: th, cos: Math.cos(th),sin:Math.sin(th)};
   } );

  // Computation
  output.pixelData = raster.pixelData.reduce( (hspace, px, index) => {
    let x = index % w;
    let y = Math.floor(index/w);

    if (px === 0) {
      thetas.forEach( (th,k) => {
        let rho = th.cos * x + th.sin * y;
        let rScaled = cy + Math.trunc(Math.round(rho * half_rho_hough_height / maxRadius));
        hspace[k + rScaled * theta_hough_width] += 1.0;
      });
    }
    return hspace;

  },new Float32Array(theta_hough_width * rho_hough_height).fill(0) );

  return output;
}

/**
 * Calculate and fill the hough space using Parallel Coordinates
 * Markéta Dubská, Jiří Havel, Adam Herout (2011) Real-time detection of lines using parallel coordinates and OpenGL
 * Proceeding SCCG '11 Proceedings of the 27th Spring Conference on Computer Graphics
 * doi:10.1145/2461217.2461245
 *
 * @param {raster} raster - image raster
 * @param {image float32} accu - hough space accumulator
 * @return {image float32} accu - calculate hough space accumulator
 *
 * @author Tristan Maunier
 * @author Jean-Christophe Taveau - Functional Programming
 */

const houghPClines = (hough_width, hough_height) => (raster,copy_mode = true) => {

  // Bresenham Algorithm (Wikipedia)
  const drawLine = (x1,  y1,  x2,  y2, pixels, w) => {
  let dx, dy ;
  let e ; // Error value
  e  = x2 - x1 ;        // -e(0,1)
  dx = e * 2 ;          // -e(0,1)
  dy = (y2 - y1) * 2 ;  // e(1,0)
  let x = x1, y = y1;
  while (x <= x2) {
    pixels[x + w * y]++;
    x++ ;  // colonne du pixel suivant
    if ( (e = e - dy) <= 0) {  // erreur pour le pixel suivant de même rangée
      y++;  // choisir plutôt le pixel suivant dans la rangée supérieure
      e += dx ;  // ajuste l’erreur commise dans cette nouvelle rangée
    }
  }  
  // Le pixel final (x2, y2) n’est pas tracé.
  pixels[x + w * y]++;
  };

  let output = T.Raster.from(raster,false);
  output.type = 'float32';
  output.width = hough_width;
  output.height = hough_height;

  let D = hough_width / 2;
  let V = hough_height / 2;
  output.pixelData = raster.pixelData.reduce ( (hspace,px) => {
    // raster must be `binary` containing pixel values core.PIXEL_TRUE and core.PIXEL_FALSE
    if (px  === 0) {
      drawLine(0, -y+V, D,x+V,hspace,hough_width);
      drawLine(D,x+V,2*D,y+V,hspace,hough_width);
    }
    return hspace;
  }, new Float32Array(hough_width * hough_height).fill(0));

  return output;
}


/**
 * Circular Hough Transform
 *
 * @param {type} params - Parameters
 * @param {TRaster} img - Input image to process
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - Image corresponding to the accumulator
 *
 * @author TODO
 */
const houghCircle = (params) => (raster,copy=true) => {
  let ouput =  TRaster.from(raster,copy);
  // TODO
  return output;
};

/**
 * Find Local Maxima in raster
 * 
 * @param {type} params - Parameters
 * @param {TRaster} img - Input image to process
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - Image corresponding to the accumulator
 *
 * @author TODO
 */
const findMaxima = (kernel,height) => (raster,copy=true) => {
  // TODO
  // return an array of maxima containing the XY-coordinates and peak height.
  return [];
};

/**
 * Draw Lines from local maxima extracted from hough space
 * 
 * @param {array} peaks - Array of objects containing (theta, rho, px)
 * @return {array} - Array of XY-coordinates defining the various lines
 *
 * @author Théo Falgarone
 */
const getHoughLines = (peaks) => {

  for (let x=0 ; x<rast.length ; x++){
    for (let i=0 ; i<peaks.length ; i++){
      let y = Math.round((peaks[i].rho - x * Math.cos(lines[i].theta)) / Math.sin(peaks[i].theta),0);
      (y >= 0 && y < rast.width) ? rast.setPixel(x,y,125) : 0 ;
    }
  }

  // TODO
  // return an array of lines as a 4-component (vec4) containing XY-coordinates (x1,y1,x2,y2) from (0.0,0.0) to (1.0, 1.0).
  return rast;
}


export {findMaxima, houghLines,houghCircles};