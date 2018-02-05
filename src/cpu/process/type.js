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


/**
 * Split a raster into a 'uint8' raster
 *
 * @param {function} func - A function among:
 * <ul>
 * <li> red(px), green(px),blue(px),alpha(px),</li>
 * <li> hue(px),saturation(px),value(px),</li>
 * <li> cyan(px),magenta(px),yellow(px),</li>
 * <li> luminance(px), chrominance(px)</li>
 * </ul>
 * @param {Raster} color_img - A color raster
 * @param {boolean} copy - Useless here, only for compatibility with the other process functions
 * @return {Raster} Return a stack containing the channels of given colorspace channel
 * @see color.js
 */
const toUint8 = (func) => (raster,copy = true) => {
  if (raster.type === 'uint8') {
    // Do nothing
    return raster;
  }
  else {
    // Copy header only
    let output = T.Raster.from(raster,false);
    output.type = 'uint8';

    if (raster.type === 'uint16') {
      // Only rescale between 0 and 255
      // new_pix = pix / 65535 * 255 = pix / 257
      output.pixelData = raster.pixelData.reduce( (data,px,i) =>  {
          data[i] = (px + 1 + (px >> 8)) >> 8;
          return data;
        },
        new Uint8ClampedArray(output.width * output.height) 
      );      
    }
    else if (raster.type === 'float32') {
      // Only rescale between 0 and 255
      let dummy = cpu.statistics(raster);
      let min = raster.statistics.min;
      let max = raster.statistics.max;
      let delta = 255.0 / (max - min);
      output.pixelData = raster.pixelData.reduce( (data,px,i) =>  {
        data[i] = (px - min) * delta;
        return data;
      },
      new Uint8ClampedArray(output.width * output.height) 
    );      
  }
    else if (raster.type === 'rgba') {
      output.pixelData = raster.pixelData.map( (px) =>  func(px) );
    }
    return output;
  }
};
// Export
export {fromABGRtoUint8, toUint8};


