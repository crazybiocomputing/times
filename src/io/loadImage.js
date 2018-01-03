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

'use script';

/**
 * @module io
 */
 

/**
 * Sobel
 *
 * @param {type} params - Parameters
 * @param {TRaster} img - Input image
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - A filtered image
 *
 * @author TODO
 */
const loadImage = (data) => {
  
  return new Promise( resolve => {
    let img = new Image();
    img.onload = () => {
      // Image pixels are loaded as ABGR with ctx.getImageData().data
      // They are stored in UInt8ClampedArray
      let w = img.width;
      let h = img.height;
      // Create T.Image
      let timg = new T.Image('rgba', w, h);
      
      // Load image from canvas
      let canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0,img.width, img.height);
      let pixels = new Uint32Array(ctx.getImageData(0, 0, w, h).data.buffer); // ArrayBuffer with view Uint8ClampedArray
      
      timg.getRaster().pixelData = pixels;
      URL.revokeObjectURL(img.src);
      // document.getElementById('workspace').appendChild(canvas);
      // When it is done, accept the Promise
      resolve({image: timg, status: 'ok'});
    }
    img.onerror = () => resolve({data: data, status: 'error'});

    img.src = data;
    
    console.log('Load...');
  });
};

// Export 
export {loadImage};

