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

'use strict';

import * as fltr from './filters_common.js';

/**
 * @module edgeDetect
 */
 

/**
 * Laplacian 3x3 Edge Detection Filter
 *    -1,-1,-1,
 *    -1, 8,-1,
 *    -1,-1,-1
 * @param {type} params - Parameters
 * @param {TRaster} img - Input image
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - A filtered image
 *
 * @author Jean-Christophe Taveau
 */
const laplacian3x3 = (wrap = cpu.BORDER_CLAMP_TO_BORDER) => (raster,copy=true) => {

  // Laplacian3x3 Filter: Calc pixel value at position `index`in array `pixels` of size `width`x`height` with `kernel`
  const laplaceFunc = (index,pixels,width,height,kernel,borderFunc) => {
    // All is hard-coded for speed
    // `kernel` is unused
    let x = cpu.getX(index,width);
    let y = cpu.getY(index,width);
    let p0 = borderFunc(pixels, x - 1,  y - 1,width,height);
    let p1 = borderFunc(pixels, x    ,  y - 1,width,height);
    let p2 = borderFunc(pixels, x + 1,  y - 1,width,height);
    let p3 = borderFunc(pixels, x - 1,  y    ,width,height);
    let p4 = borderFunc(pixels, x    ,  y    ,width,height);
    let p5 = borderFunc(pixels, x + 1,  y    ,width,height);
    let p6 = borderFunc(pixels, x - 1,  y + 1,width,height);
    let p7 = borderFunc(pixels, x    ,  y + 1,width,height);
    let p8 = borderFunc(pixels, x + 1,  y + 1,width,height);
   
    return -p0 - p1 - p2 - p3 + 8 * p4 - p5 - p6 - p7 - p8;
  };

  // Main
  let border = (wrap === cpu.BORDER_CLAMP_TO_EDGE) ? fltr.clampEdge : ( (wrap === cpu.BORDER_REPEAT) ? fltr.repeat : ( (wrap === cpu.BORDER_MIRROR) ? mirror : fltr.clampBorder));

  let output =  T.Raster.from(raster,false);

  // 1-pass filter 
  output.pixelData = fltr._convolve(raster.pixelData,raster.width,raster.height,null,border,laplaceFunc);

  // Normalize image?
  // cpu.statistics(output);

  return output;
}

/**
 * Laplacian 5x5 Edge Detection Filter
 *
 * @param {number} wrap - Wrap mode for border handling
 * @param {Raster} raster - Input raster
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {Raster} - A filtered image
 *
 * @author Jean-Christophe Taveau
 */
const laplacian5x5 = (wrap = cpu.BORDER_CLAMP_TO_BORDER) => (raster,copy=true) => {
  // Main
  let border = (wrap === cpu.BORDER_CLAMP_TO_EDGE) ? fltr.clampEdge : ( (wrap === cpu.BORDER_REPEAT) ? fltr.repeat : ( (wrap === cpu.BORDER_MIRROR) ? mirror : fltr.clampBorder));

  let output =  T.Raster.from(raster,false);

  // Must be hard-coded?
  let kernel = cpu.convolutionKernel(
    cpu.KERNEL_SQUARE, 5, 5,                        
    [
      0, 0,-1, 0, 0,
      0,-1,-2,-1, 0,
     -1,-2,16,-2,-1,
      0,-1,-2,-1, 0,
      0, 0,-1, 0, 0,

   ],
    false // No kernel normalization!!  
  );

  // 1-pass filter 
  output.pixelData = fltr._convolve(raster.pixelData,raster.width,raster.height,kernel,border,fltr.linearFunc);

  // Normalize image?
  // cpu.statistics(output);

  return output;
}

/**
 * Sobel 3x3 Edge Detection Filter
 *
 * @param {type} params - Parameters
 * @param {TRaster} img - Input image
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - A filtered image
 *
 * @author Jean-Christophe Taveau
 */
const sobel3x3 = (wrap = cpu.BORDER_CLAMP_TO_BORDER) => (raster,copy=true) => {

  // Sobel Filter: Calc pixel value at position `index`in array `pixels` of size `width`x`height` with `kernel`
  const sobelFunc = (index,pixels,width,height,kernel,borderFunc) => {
    // All is hard-coded for speed
    // `kernel` is unused
    let x = cpu.getX(index,width);
    let y = cpu.getY(index,width);
    let p0 = borderFunc(pixels, x - 1,  y - 1,width,height);
    let p1 = borderFunc(pixels, x    ,  y - 1,width,height);
    let p2 = borderFunc(pixels, x + 1,  y - 1,width,height);
    let p3 = borderFunc(pixels, x - 1,  y    ,width,height);
    // p4 is always zero, here.
    let p5 = borderFunc(pixels, x + 1,  y    ,width,height);
    let p6 = borderFunc(pixels, x - 1,  y + 1,width,height);
    let p7 = borderFunc(pixels, x    ,  y + 1,width,height);
    let p8 = borderFunc(pixels, x + 1,  y + 1,width,height);

    let Gx = p0 - p2 + 2 * p3 - 2 * p5 + p6 -p8;
    let Gy = p0 + 2 * p1 + p2 - p6 - 2 * p7 - p8;
    
    return Math.sqrt(Gx * Gx + Gy * Gy);
  };

  // Main
  let border = (wrap === cpu.BORDER_CLAMP_TO_EDGE) ? fltr.clampEdge : ( (wrap === cpu.BORDER_REPEAT) ? fltr.repeat : ( (wrap === cpu.BORDER_MIRROR) ? mirror : fltr.clampBorder));

  let output =  T.Raster.from(raster,false);

  // convolution
  let tmp = fltr._convolve(new Float32Array(raster.pixelData),raster.width,raster.height,null,border,sobelFunc);

  /*
  // Define separable kernels
  let kernelX_pass1 = cpu.convolutionKernel(cpu.KERNEL_SQUARE, 3, 1, [-1,0,1],false);
  let kernelX_pass2 = cpu.convolutionKernel(cpu.KERNEL_SQUARE, 1, 3, [1,2,1],false);
  let kernelY_pass1 = cpu.convolutionKernel(cpu.KERNEL_SQUARE, 3, 1, [1,2,1],false);
  let kernelY_pass2 = cpu.convolutionKernel(cpu.KERNEL_SQUARE, 1, 3, [-1,0,1],false);
  
  let kernelX = cpu.convolutionKernel(
    cpu.KERNEL_SQUARE, 3, 3,                        
    [
       1,0,-1,
       2,0,-2,
       1,0,-1
    ],
    false // No kernel normalization!!  
  );

  let kernelY = cpu.convolutionKernel(
    cpu.KERNEL_SQUARE, 3, 3,                        
    [
       1, 2, 1,
       0, 0, 0,
      -1,-2,-1
    ],
    false // No kernel normalization!!  
  );
  
  // 2-pass filter 

  let tmp = fltr._convolve(raster.pixelData,raster.width,raster.height,kernelX_pass1,border,fltr.linearFunc);
  let gradientX = fltr._convolve(tmp,raster.width,raster.height,kernelX_pass2,border,fltr.linearFunc);
  tmp = fltr._convolve(raster.pixelData,raster.width,raster.height,kernelY_pass1,border,fltr.linearFunc);
  let gradientY = fltr._convolve(raster.pixelData,raster.width,raster.height,kernelY,border,fltr.linearFunc);

  // 1-pass filter 
  // For temporary computations, use Float32Array
  let gradientX = fltr._convolve(new Float32Array(raster.pixelData),raster.width,raster.height,kernelX,border,fltr.linearFunc);
  let gradientY = fltr._convolve(new Float32Array(raster.pixelData),raster.width,raster.height,kernelY,border,fltr.linearFunc);
  
  // Absolute values - faster
  // output.pixelData = gradientX.map( (px,i) => Math.abs(px) + Math.abs(gradientY[i]) );

  // square root
  let tmp = gradientX.map( (gx,i) => Math.trunc(Math.sqrt(gx * gx + gradientY[i] * gradientY[i])) );
 */
  // Normalize image?
  output.pixelData = (output.type === 'uint8' ? new Uint8ClampedArray(tmp) : (output.type === 'uint16' ? new Uint16Array(tmp) : tmp) );

  // cpu.statistics(output);
  return output;
}

// http://www.tomgibara.com/computer-vision/CannyEdgeDetector.java

export {laplacian3x3,laplacian5x5,sobel3x3};


