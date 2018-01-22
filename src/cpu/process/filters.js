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

/**
 * @module filters
 */
 
const CPU_HARDWARE = 0;

const GPU_HARDWARE = 1;

const KERNEL_RECTANGLE = 0;

const KERNEL_CROSS = 1;

const KERNEL_DIAMOND = 2;

const KERNEL_CIRCLE = 4;

const BORDER_CLAMP_TO_EDGE = 0;

const BORDER_CLAMP_TO_BORDER = 1;

const BORDER_REPEAT = 2;

const BORDER_MIRROR = 4;

/*
 * Pre-calculate convolution kernel offsets 
 *
 * @author Jean-Christophe Taveau
 */
const getKernelOffsets = (hardware, type, w, h, weights, stepX = 1, stepY = 1) => {
  const getOffsetX = (i,w,h) => (cpu.getX(i,w) - Math.floor(w/2.0) ) * stepX; 
  const getOffsetY = (i,w,h) => (cpu.getY(i,w) - Math.floor(h/2.0) ) * stepY;

  let offsets;

  if (type === KERNEL_RECTANGLE) {
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
      
      if (x * x + y * y <= radius * radius) {
        accu.push({offsetX: x,offsetY: y,weight: weights[i]});
      }
      return accu;
    },[]);

  }
  // CPU: Array of objects [{offsetX, offsetY, weight},{offsetX, offsetY, weight}, ..]
  // GPU: Array of [offsetX, offsetY, weight,offsetX, offsetY, weight,..]
  // TODO let offsets.reduce( (flatten,cell) => flatten = [..flatten,...Object.keys(cell).map((k) => cell[k])],[]);
  return offsets;
}

/*
 * Kernel for convolution
 *
 *
 * @param {number} hardware
 * @param {number} type
 * @param {number} size  - size or radius if circular kernel
 * @param {Array[number]} weight - 1D Array containing the various weights. For circular kernel, the weights must be given as an array of length (size * size).
 * @param {boolean} normalize
 * 
 * @author Jean-Christophe Taveau
 */
const convolutionKernel = (hardware, type, width, height_or_radius, weights, normalize = true) => {
  // Precalculate weights and offsets
  let kernel = getKernelOffsets(hardware, type, width, height_or_radius,weights);

  // Compute the sum of kernel weight for normalization
  let sum = kernel.reduce ( (sum,v) => sum + v.weight, 0);
  
  return (normalize) ? kernel.map ( (v) => {v.weight /= sum; return v}) : kernel;
}

/*
 * Kernel for mean filter
 *
 * @author Jean-Christophe Taveau
 */
const meanKernel = (hardware, type, width, height_or_radius, normalize = true) => {
  // Precalculate weights and offsets
  let kernel = getKernelOffsets(hardware, type, width, height_or_radius, weights);
  // Compute the sum of kernel weight for normalization
  let sum = kernel.reduce ( (sum,v) => sum + v, 0);
  
  return (normalize) ? kernel.map ( (v) => v.weight /= sum) : kernel;
}

const gaussBlurKernel = (hardware, type, size, normalize = true) => {
  // Precalculate weights and offsets
  let kernel = getKernelOffsets(hardware, type, size, size, radius);
  // Compute the sum of kernel weight for normalization
  let sum = kernel.reduce ( (sum,v) => sum + v, 0);
  
  return (normalize) ? kernel.map ( (v) => v.weight /= sum) : kernel;
}


/**
 * Convolve operation
 *
 * @param {TRaster} kernel - Convolution mask
 * @param {TRaster} img - Input image to process
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - Filtered Image
 *
 * @author Jean-Christophe Taveau
 */
const convolve = (kernel, wrap = cpu.BORDER_CLAMP_TO_BORDER) => (raster,copy=true) => {
  // Manage clamp to border - outside: 0
  const clampBorder = (pixels,x,y,width,height) => {
    return (x >=0 && x < width && y >=0 && y < height) ? pixels[x + y * width] : 0;
  };
  
  // Manage clamp to edge - outside: value of the image edge
  const clampEdge = (pixels, x,y,width,height) => {
    let xx = Math.min(Math.max(x,0),width  - 1);
    let yy = Math.min(Math.max(y,0),height - 1);
    return pixels[xx + yy * width];
  };
  
  // Manage repeat - outside: value of the image tile (like OpenGL texture wrap mode)
  const repeat = (pixels, x,y,width,height) => {
    let xx = (width  + x ) % width;
    let yy = (height + y ) % height;
    return pixels[xx + yy * width];
  };
  
  // Manage mirror - outside: value of the image mirrored tile (like OpenGL texture wrap mode)
  // BUG
  const mirror = (pixels, x,y, width,height) => {
    let xx = ( 2 * (width  - 1)  - x ) % (width - 1);
    let yy = ( 2 * (height - 1)  - y ) % (height - 1);
    return pixels[xx + yy * width];
  };
  
  let border = (wrap === cpu.BORDER_CLAMP_TO_EDGE) ? clampEdge : ( (wrap === cpu.BORDER_REPEAT) ? repeat : ( (wrap === cpu.BORDER_MIRROR) ? mirror : clampBorder));
  console.log(border.name);
  let input = raster.pixelData;
  let output =  T.Raster.from(raster,false);
  // Main 
  let width = raster.width;
  let height = raster.height;
  output.pixelData = input.map( (px, index, pixels) => {
    return kernel.reduce( (sum,v) => {
      sum += border(
        pixels,
        cpu.getX(index,width) + v.offsetX, 
        cpu.getY(index,width) + v.offsetY,
        width,height
      ) * v.weight;
      return sum;
    },0.0);
  });
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
  let output =  TRaster.from(img,copy);
  // TODO
  return output;
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
  return convolve(kernel)(img,copy);
}

export {
  CPU_HARDWARE,GPU_HARDWARE,
  KERNEL_RECTANGLE, KERNEL_CROSS, KERNEL_DIAMOND,KERNEL_CIRCLE,
  BORDER_CLAMP_TO_EDGE, BORDER_CLAMP_TO_BORDER, BORDER_REPEAT,BORDER_MIRROR,
  convolve,convolutionKernel,mean,meanKernel
}


