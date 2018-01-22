/*
 *  times: Tiny Image ECMAScript Application
 *  Copyright (C) 2017  Jean-Christophe Taveau.
 *
 *  This file is part of times
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
 *  along with times.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */

'use strict';

import {TIMES} from '../../core/TIMES';


/**
 * TODO
 */
const append = function (obj) {
  TIMES.storage.push(obj);
  return TIMES.storage;
}

/**
 * Clamp value between min and max
 *
 * @author Jean-Christophe Taveau
 */
const clamp = (min_value,max_value) => (value) => Math.max(min_value,Math.min(value,max_value));


/**
 * Clamp value between 0 and 255 (2^8 -1)
 *
 * @author Jean-Christophe Taveau
 */
const clampUint8 = clamp(0,255);


/**
 * Clamp value between 0 and 65535 (2^16 -1)
 *
 * @author Jean-Christophe Taveau
 */
const clampUint16 = clamp(0,65535);

/**
 * Convert radians to degrees
 *
 * @author Jean-Christophe Taveau
 */
const degrees = (radian_angle) => radian_angle * 180.0 / Math.PI;


/**
 * Convert degrees to radians
 *
 * @author Jean-Christophe Taveau
 */
const radians = (degree_angle) => degree_angle * Math.PI / 180.0;



/**
 * Check Endianness
 *
 * @author Jean-Christophe Taveau
 */
const isLittleEndian = () => {
  const checkEndianness = () => {
    // https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
    let buf = new ArrayBuffer(4);
    let buf8 = new Uint8ClampedArray(buf);
    let data = new Uint32Array(buf);
    
    // Determine whether Uint32 is little- or big-endian.
    data[0] = 0x0a0b0c0d;
    TIMES.cache.littleEndian = (buf8[0] === 0x0d);
    return TIMES.cache.littleEndian;
  };
  
  return (TIMES.cache.littleEndian !== undefined) ? TIMES.cache.littleEndian : checkEndianness();

};

/**
 * pipe(func1, func2, func3, ..., funcn)
 * From https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d
 *
 * @example pipe(func1,func2) returns func2(func1(x))
 *
 * @author Eric Elliott
 */
const pipe = (...fns) => (raster,copy_mode=false) => {
  let fullCopy = T.Raster.from(raster,true);
  return fns.reduce((v, f,i) => {
    return f(v,copy_mode);
    }, fullCopy);
}

/**
 * Computes basic stats: min, max, mean/average and standard deviation of the image.
 * Algorithm for variance found in <a href="https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Two-pass_algorithm">Wikipedia</a>
 * 
 * @param {Raster} img - Input raster
 * @param {boolean} copy_mode - Useless here, only for compatibility with the other processing functions
 * @return {Raster} - Returns a raster with updated statistics: min, max, mean, variance
 *
 * @author Jean-Christophe Taveau
 */
const statistics = (img, copy_mode = true) => {
  let tmp = img.pixelData.reduce ( (accu,px,i) => {
    accu.min = Math.min(accu.min,px);
    accu.max = Math.max(accu.max,px);
    accu.mean += px;
    accu.n++;
    let delta = px - accu.mean2;
    accu.mean2 += delta/accu.n;
    accu.variance += delta * delta;
    return accu;
  },
  {min: Number.MAX_SAFE_INTEGER, max: 0, mean: 0.0, mean2 : 0.0, n: 0, variance: 0.0}
  );

  // Update stats in this TRaster
  img.statistics = {
    min: tmp.min,
    max: tmp.max,
    count : img.pixelData.length,
    mean : tmp.mean / img.pixelData.length,
    stddev : Math.sqrt(tmp.variance / img.pixelData.length)
  };
  return img;
};

/**
 * Computes histogram of the image.
 * Algorithm for variance found in <a href="https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Two-pass_algorithm">Wikipedia</a>
 * 
 * @param {number} binNumber - Bin Number
 * @param {Raster} img - Input raster
 * @param {boolean} copy_mode - Useless here, only for compatibility with the other processing functions
 * @return {Raster} - Returns a raster with updated histogram
 *
 * @author Jean-Christophe Taveau
 */
const histogram = (binNumber) => (raster, copy_mode = true) => {
  // Update statistics
  let stats = T.statistics(raster);
  let delta = (raster.statistics.max - raster.statistics.min);
  raster.statistics.histogram = raster.pixelData.reduce ((bins,px,i) => {
    let index = T.clamp(0,binNumber)( Math.floor( (binNumber - 1) * (px - raster.statistics.min)/ delta));
    bins[index]++;
    return bins;
    },
    new Array(binNumber).fill(0)
  );
  return raster;
};

/**
 * Get index
 */
const getIndex = (x,y,width) => x + y * width;

/**
 *
 */
const getX = (index,width) => index % width;

/**
 *
 */
const getY = (index,width) => Math.floor(index / width);



// Exports
export {clamp,clampUint8,degrees,getX, getY, histogram,getIndex,isLittleEndian,pipe,radians,statistics};

