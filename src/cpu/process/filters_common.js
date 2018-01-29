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
// HACK: BUG
const mirror = (pixels, x,y, width,height) => {
  let xx = Math.trunc(x / width) * 2 * (width  - 1)  - x;
  let yy = Math.trunc(y / height) * 2 * (height  - 1)  - y;
  return pixels[xx + yy * width];
};
  
// Linear Filter: Calc pixel value at position `index`in array `pixels` of size `width`x`height` with `kernel`
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


/*
 * Convolve
 * data - pixels
 * @param {number} width
 * @param {number} height
 * kernel - kernel offsets
 * borderFunc - function handling borders
 * kernelFunc - function computing output pixel value
 */ 
const _convolve = (data,width,height,kernel,borderFunc,kernelFunc) => {
  return data.map( (px, index, pixels) => {
    return kernelFunc(index,pixels,width,height,kernel,borderFunc);
  });
};


export {_convolve,linearFunc,clampBorder,clampEdge,mirror,repeat};