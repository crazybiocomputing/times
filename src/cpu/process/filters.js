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
 * @module filters
 */
 
const CPU_HARDWARE = 0;

const GPU_HARDWARE = 1;

const KERNEL_RECTANGLE = 0;

const KERNEL_CROSS = 1;

const KERNEL_DIAMOND = 2;

const KERNEL_CIRCLE = 4;

const KERNEL_SQUARE = 8;

const BORDER_CLAMP_TO_EDGE = 0;

const BORDER_CLAMP_TO_BORDER = 1;

const BORDER_REPEAT = 2;

const BORDER_MIRROR = 4;

/*
 * Pre-calculate convolution kernel offsets 
 *
 * @author Jean-Christophe Taveau
 */
const getKernelOffsets = (type, w, h, weights, stepX = 1, stepY = 1) => {
  const getOffsetX = (i,w,h) => (cpu.getX(i,w) - Math.floor(w/2.0) ) * stepX; 
  const getOffsetY = (i,w,h) => (cpu.getY(i,w) - Math.floor(h/2.0) ) * stepY;

  let offsets;

  if (type === KERNEL_RECTANGLE || type === KERNEL_SQUARE) {
    offsets = Array.from(
      {length: w * h}, 
      (v, i) => ({offsetX: getOffsetX(i,w,h), offsetY: getOffsetY(i,w,h), weight: weights[i]}) 
    );
  }
  else if (type === KERNEL_CIRCLE) {
    let radius = h;
    let series = Array.from({length: w * w}); 
    offsets = series.reduce( (accu, v, i) => {
      let x = getOffsetX(i,w,w);
      let y = getOffsetY(i,w,w);
      // Distance?
      if (x * x + y * y <= radius * radius) {
        accu.push({offsetX: x,offsetY: y,weight: weights[i]});
      }
      return accu;
    },[]);

  }
  return offsets;
}

/*
 * Kernel for convolution
 *
 * @param {number} type
 * @param {number} size  - size or radius if circular kernel
 * @param {Array[number]} weight - 1D Array containing the various weights. For circular kernel, the weights must be given as an array of length (size * size).
 * @param {boolean} normalize
 * 
 * @author Jean-Christophe Taveau
 */
const convolutionKernel = (type, width, height_or_radius, weights, normalize = true) => {
  // Precalculate weights and offsets
  // Array of objects [{offsetX, offsetY, weight},{offsetX, offsetY, weight}, ..]

  let kernel = getKernelOffsets(type, width, height_or_radius,weights);

  // Compute the sum of kernel weight for normalization
  let sum = kernel.reduce ( (sum,v) => sum + v.weight, 0);
  
  return (normalize) ? kernel.map ( (v) => {v.weight /= sum; return v}) : kernel;
}

/*
 * Kernel for mean filter
 *
 * @author Jean-Christophe Taveau
 */
const meanKernel = (type, width, height_or_radius, normalize = true) => {
  // Precalculate weights and offsets
  let kernel = getKernelOffsets(hardware, type, width, height_or_radius, weights);
  // Compute the sum of kernel weight for normalization
  let sum = kernel.reduce ( (sum,v) => sum + v, 0);
  
  return (normalize) ? kernel.map ( (v) => v.weight /= sum) : kernel;
}

const gaussBlurKernel = (type, size, normalize = true) => {
  // Precalculate weights and offsets
  let kernel = getKernelOffsets(hardware, type, size, size, radius);
  // Compute the sum of kernel weight for normalization
  let sum = kernel.reduce ( (sum,v) => sum + v, 0);
  
  return (normalize) ? kernel.map ( (v) => v.weight /= sum) : kernel;
}


/**
 * Convolve operation
 *
 * @param {[number]} kernel - Convolution mask
 * @param {Raster} raster - Input image to process
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {Raster} - Filtered Image
 *
 * @author Jean-Christophe Taveau
 */
const convolve = (kernel, wrap = cpu.BORDER_CLAMP_TO_BORDER) => (raster,copy=true) => {

  // Calc pixel value at position `index`in array `pixels` of size `width`x`height` with `kernel`
  const linearFunc = (index,pixels,width,height,kernel,borderFunc) => {
    return kernel.reduce( (sum,v) => {
      sum += borderFunc(
        pixels,
        cpu.getX(index,width) + v.offsetX, 
        cpu.getY(index,width) + v.offsetY,
        width,height
      ) * v.weight;
      return sum;
    },0.0);  
  };

  // Main 
  let border = (wrap === cpu.BORDER_CLAMP_TO_EDGE) ? fltr.clampEdge : ( (wrap === cpu.BORDER_REPEAT) ? fltr.repeat : ( (wrap === cpu.BORDER_MIRROR) ? mirror : fltr.clampBorder));
  console.log(border.name);

  let output =  T.Raster.from(raster,false);

  output.pixelData = fltr._convolve(raster.pixelData,raster.width,raster.height,kernel,border,linearFunc);

  return output;
}


/**
 * Convolve operation using separable kernels
 *
 * @param {array[number]} kernel1 - Convolution mask for first pass
 * @param {array[number]} kernel2 - Convolution mask for second pass
 * @param {number} wrap - Wrap mode for managing the raster border
 * @param {TRaster} img - Input image to process
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - Filtered Image
 *
 * @author Jean-Christophe Taveau
 */
const convolveSeparable = (kernel1, kernel2, wrap = cpu.BORDER_CLAMP_TO_BORDER) => (raster,copy=true) => {
  let output =  TRaster.from(img,copy);
  // TODO
  // First pass
  // Second pass
  
  return output;
}

/**
 * Gaussian Blur Filter
 *
 * @param {TRaster} kernel - Convolution mask
 * @param {TRaster} img - Input image to process
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - Filtered Image
 *
 * @author TODO
 */
const gaussBlur = (kernel) => (raster,copy=true) => {
  // TODO
  return convolve(kernel)(raster,copy);
}

/**
 * Gaussian Mean Filter
 *
 * @param {TRaster} kernel - Convolution mask
 * @param {TRaster} img - Input image to process
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - Filtered Image
 *
 * @author TODO
 */
const mean = (kernel) => (raster,copy=true) => {
  return convolve(kernel)(raster,copy);
}

export {
  KERNEL_RECTANGLE, KERNEL_CROSS, KERNEL_DIAMOND,KERNEL_CIRCLE,KERNEL_SQUARE,
  BORDER_CLAMP_TO_EDGE, BORDER_CLAMP_TO_BORDER, BORDER_REPEAT,BORDER_MIRROR,
  convolve,convolutionKernel,mean,meanKernel
}


