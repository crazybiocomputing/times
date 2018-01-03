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
 * @module type
 */
 
/**
 * Convert a ABGR to a uint8 image
 *
 * @example <caption>Conversion of a color image to a luminance gray image.</caption>
 * let gray8_img = T.fromRGBAtoUint8(T.luminance)(img);
 *
 * @param {function} func - A converter function
 * @param {TRaster} img - Input image to process
 * @param {boolean} copy - Copy mode to manage memory usage
 * @returns {TRaster} - Uint8 Image (aka 8-bit image)
 *
 * @author TODO
 */
const fromABGRtoUint8 = (func) => (raster,copy=true) => {
  let output =  T.Raster.from(raster,false);
  output.pixelData = new Uint8ClampedArray(raster.length);
  output.type = 'uint8';
  raster.pixelData.forEach ( (px,i) => output.pixelData[i] = func(px));
  return output;
};

// Export
export {fromABGRtoUint8};


