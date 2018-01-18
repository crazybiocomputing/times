(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return clampUint8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return degrees; });
/* unused harmony export histogram */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isLittleEndian; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return pipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return radians; });
/* unused harmony export statistics */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_TIMES__ = __webpack_require__(1);
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






/**
 * TODO
 */
const append = function (obj) {
  __WEBPACK_IMPORTED_MODULE_0__core_TIMES__["a" /* TIMES */].storage.push(obj);
  return __WEBPACK_IMPORTED_MODULE_0__core_TIMES__["a" /* TIMES */].storage;
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
    __WEBPACK_IMPORTED_MODULE_0__core_TIMES__["a" /* TIMES */].cache.littleEndian = (buf8[0] === 0x0d);
    return __WEBPACK_IMPORTED_MODULE_0__core_TIMES__["a" /* TIMES */].cache.littleEndian;
  };
  
  return (__WEBPACK_IMPORTED_MODULE_0__core_TIMES__["a" /* TIMES */].cache.littleEndian !== undefined) ? __WEBPACK_IMPORTED_MODULE_0__core_TIMES__["a" /* TIMES */].cache.littleEndian : checkEndianness();

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


// Exports




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TIMES; });
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
 
const TIMES = {
  storage: [],
  cache : {}
};

TIMES.initStorage = () => TIMES.storage = [];




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_index_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__io_loadImage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cpu_index_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gpu_index_js__ = __webpack_require__(21);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "T", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index_js__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "io", function() { return __WEBPACK_IMPORTED_MODULE_1__io_loadImage__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "cpu", function() { return __WEBPACK_IMPORTED_MODULE_2__cpu_index_js__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "gpu", function() { return __WEBPACK_IMPORTED_MODULE_3__gpu_index_js__; });
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
 

/* core classes */


/* io/loadImage */


/* cpu/ */


/* gpu/ */








/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TIMES__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Raster__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Image__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stack__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Volume__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Window__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__View__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Raster", function() { return __WEBPACK_IMPORTED_MODULE_1__Raster__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return __WEBPACK_IMPORTED_MODULE_2__Image__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Stack", function() { return __WEBPACK_IMPORTED_MODULE_3__Stack__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Volume", function() { return __WEBPACK_IMPORTED_MODULE_4__Volume__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Window", function() { return __WEBPACK_IMPORTED_MODULE_5__Window__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return __WEBPACK_IMPORTED_MODULE_6__View__["a"]; });
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
 
















/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
 * Class for Raster
 *
 * @alias T.Raster
 */
 
class Raster {
  /**
   * Create an empty TRaster.
   * 
   * @param {string} type - One of these: uint8, uint16, float32, rgba
   * @param {number} width - Image Width
   * @param {number} height - Image Height
   * @param {number} offset - Offset
   */
  constructor(type,width,height,depth=1) {
    /**
     * Width
     */
    this.width = width;
    
    /**
     * Height
     */
    this.height = height;
    
    /**
     * Depth Only for 3D data
     */
    this.depth = depth;
    
    /**
     * Label
     */
    this.label = 'None';
    
    /**
     * Length = width * height
     */
    this.length = this.width * this.height * this.depth;
    
    /**
     * Type: uint8, uint16, uint32, float32,rgba
     */
    this.type = type;
    
    /**
     * Pixels array
     */
    this.pixelData; 
    
    /**
     * Image, Stack or Volume parent
     */
    this.parent; 
  }
  
  /*
   * Create the Pixels Array filled in black (value = 0)
   *
   * @alias T.Raster.createPixels
   * @param {string} type - uint8, uint16, uint32, float32,rgba
   */
  static createPixels(type,length) {
    let arr;
    switch (type) {
    case 'uint8': arr = new Uint8ClampedArray(length).fill(0); break;
    case 'uint16': arr = new Uint16Array(length).fill(0);break;
    case 'uint32': arr = new Uint32Array(length).fill(0);break;
    case 'float32': arr = new Float32Array(length).fill(0.0);break;
    case 'abgr':
    case 'rgba': arr = new Uint32Array(length).fill(0);break;
    }
    return arr;
  }
  
  static MIN_VALUE() {
    return 0;
  }
  
  static fromWindow(win, copy = true) {
    let img = new TRaster(win.metadata.type,win.metadata.width,win.metadata.height);
    img.pixelData = (copy === true) ? [...win.raster.pixelData] : win.raster.pixelData; // Copy pixels
    img.setWindow(win);
    return img;
  }
  
  /**
   * Create a new Raster from another Raster
   *
   * @alias T.Raster.from
   * @param {TRaster} other - uint8, uint16, uint32, float32,rgba
   */
  static from(other, copy = true) {
    let img = new T.Raster(other.type,other.width, other.height);
    img.parent = other.parent;
    if (copy === true) {
      img.setPixelData(other.pixelData); // Copy pixels
    }
    else {
      img.pixelData = other.pixelData;  // No copy
    }
    
    return img;
  }
  
  fill(value) {
    this.pixelData.fill(value);
  }
  
    
  /**
   * compose(func1, func2, func3, ..., funcn)
   * From https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d
   *
   * @alias T.Raster.compose
   * @example compose(func1,func2) returns func1(func2(x))
   *
   * @author Eric Elliott
   */
  compose (...fns) {
    return fns.reduceRight((v, f) => f(v,false), this);
  }

  /**
   * pipe(func1, func2, func3, ..., funcn)
   * From https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d
   *
   * @example pipe(func1,func2) returns func2(func1(x))
   *
   * @author Eric Elliott
   */
  pipe (...fns) {
    return fns.reduce((v, f) => f(v,false), this);
  }
  
  /**
   * Get pixel value at given index
   *
   * @alias T.Raster~get
   * @param {number} index - Index
   * @returns {number}  Pixel Value
   *
   * @author: Jean-Christophe Taveau
   */
  get(index) {
    return this.pixelData[index];
  }
  
  /**
   * Get pixel value at given X,Y-coordinates
   *
   * @alias T.Raster~getPixel
   * @param {number} x - X-coordinate
   * @param {number} y - Y-coordinate
   * @returns {number}  Pixel Value
   *
   * @author: Jean-Christophe Taveau
   */
  getPixel(x,y) {
    let index = x + y * this.width;
    return this.pixelData[index];
  }
  
  /**
   * Get X,Y-coordinate from index
   *
   * @alias T.Raster~xy
   * @param {number} index - Index
   * @returns {array}  X- and Y-coordinates
   *
   * @author: Jean-Christophe Taveau
   */
  xy(index) {
    return [this.x(index), this.y(index)];
  }
  
  /**
   * Get X-coordinate from index
   *
   * @alias T.Raster~x
   * @param {number} index - Index
   * @returns {number}  X-coordinate
   *
   * @author: Jean-Christophe Taveau
   */
  x(index) {
    return index % this.width;
  }
  
  /**
   * Get Y-coordinate from index
   *
   * @alias T.Raster~y
   * @param {number} index - Index
   * @returns {number}  Y-coordinate
   *
   * @author: Jean-Christophe Taveau
   */
  y(index) {
    return Math.floor(index / this.width);
  }
  
  /**
   * Set pixel value at given index
   *
   * @param {number} index - Pixel index
   * @param {number} value - Pixel value
   * @author Jean-Christophe Taveau
   */
  set(index,value) {
    this.pixelData[index] = value;
  }

  /**
   * Set Raster Dimension
   *
   * @param {number} new_width - New Raster Width
   * @param {number} new_height - New Raster Height
   *
   * @author Jean-Christophe Taveau
   */
  setDimension(new_width,new_height) {
    this.width = new_width;
    this.height = new_height;
    this.length = new_width * new_height;
  }

  /**
   * Set pixel value at given X,Y-coordinates
   *
   * @param {number} x - Pixel X-coordinate
   * @param {number} y - Pixel Y-coordinate
   * @param {number} value - Pixel value
   * @author Jean-Christophe Taveau
   */
  setPixel(x,y,value) {
    this.pixelData[x + y * this.width] = value;
  }

  /**
   * Set pixels 
   *
   * @param {TypedArray} array - Pixel value
   * @author Jean-Christophe Taveau
   */
  setPixelData(array) {
    const table = {uint8: Uint8ClampedArray, uint16: Uint16Array, float32: Float32Array, rgba: Uint32Array };
    // check if correct 
    if (array instanceof table[this.type]) {
      this.pixelData  = array;
    }
    else {
      // Need a conversion
      switch (this.type) {
      case 'uint8': this.pixelData = new Uint8ClampedArray(array); break;
      case 'uint16': this.pixelData = new Uint16Array(array);break;
      case 'uint32': this.pixelData = new Uint32Array(array);break;
      case 'float32': this.pixelData = new Float32Array(array);break;
      case 'abgr':
      case 'rgba': this.pixelData = new Uint32Array(array);break;
      }
    }

  }

  /**
   * Pad a smaller raster within this raster
   *
   * @author Jean-Christophe Taveau
   */
  pad(topleft_x,topleft_y,small_img) {
    for (let y = 0; y < small_img.height; y++) {
      let chunk = small_img.pixelData.slice(y * small_img.width, (y+1) * small_img.width);
      chunk.forEach ( (px, index) => this.pixelData[topleft_x + index + (topleft_y + y)* this.width] = px, this);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Raster;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
 * Class for Image
 *
 * @alias T.Image
 */
 
class Image {
  /**
   * Create an empty Image.
   * 
   * @param {string} type - One of these: uint8, uint16, float32, rgba
   * @param {number} width - Image Width
   * @param {number} height - Image Height
   * @param {number} offset - Offset
   */
  constructor(type,width,height, pattern="black") {
    
    /**
     * Width
     */
    this.width = width;
    
    /**
     * Height
     */
    this.height = height;
    
    
    /**
     * Length = width * height
     */
    this.length = this.width * this.height;
    
    /**
     * Type: uint8, uint16, uint32, float32,abgr, rgba
     */
    this.type = type;

    /**
     * Metadata containing annotations, information,etc.
     */
    this.metadata = {
      dimension : 2,
      type: type,
      width : width,
      height : height,
      depth : 1,
      fill : pattern
    };
    
    /**
     * Raster containing the pixels
     */
    this.raster = new T.Raster(type,width,height); 
    this.raster.parent = this;
    this.fillPattern(pattern);
  }
  
  
  fillPattern(pattern) {
    let raster = this.raster;
    if (raster.pixelData === undefined) {
      raster.pixelData = T.Raster.createPixels(this.type,this.length);
      console.log(`Create pixels of ${this.type}`);
    }
    if (pattern.toLowerCase() === 'black') {
      raster.pixelData.fill(T.Raster.MIN_VALUE(this.type));
    }
    else if (pattern.toLowerCase() === 'white') {
      raster.pixelData.fill(T.Raster.MAX_VALUE(this.type));
    }
    else if (pattern.toLowerCase() === 'ramp') {
      raster.pixelData.map(x => T.Raster.MAX_VALUE()/ this.width * (i % this.width));
    }
  }
  

  /**
   * Get raster
   *
   * @alias T.Image~getRaster
   * @return {Raster} Returns the raster
   *
   * @author Jean-Christophe Taveau
   */
  getRaster() {
    return this.raster;
  }

  /**
   * Set raster
   *
   * @alias T.Image~setRaster
   * @param {Raster} a_raster - A raster image
   *
   * @author Jean-Christophe Taveau
   */
  setRaster(a_raster) {
    this.raster = a_raster;
  }

  /**
   * Set pixels
   *
   * @alias T.Image~setPixels
   * @param {array} data - Array of pixel values (numbers)
   * @author Jean-Christophe Taveau
   */
  setPixels(data) {
    this.raster.pixelData = data;
  }
  
  setWindow(win) {
    this.window = win;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Image;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
 * @namespace T
 */
 
 
/**
 * Class for Stack
 *
 * @alias T.Stack
 */

class Stack {
  /**
   * Create an empty Stack
   * @param {string} type - Pixel type number: uint8, uint16, float32, rgba
   * @param {number} width - Width
   * @param {number} height - Height
   * @param {number} nslices - Slice number in the stack
   */
  constructor(type,width,height,nslices,pattern="black") {
    
    /**
     * Width
     */
    this.width = width;
    
    /**
     * Height
     */
    this.height = height;
    
    /**
     * Type: uint8, uint16, uint32, float32,rgba
     */
    this.type = type;
    
    /**
     * Pixels array
     */
    this.pixelData; 
    
    /**
     * Slice number
     */
    this.nslices = nslices;
    
    /**
     * Length = width * height * nslices
     */
    this.length = this.width * this.height * this.nslices;

    /**
     * Metadata containing annotations, information,etc.
     */
    this.metadata = {
      dimension : 2.5,
      title : title,
      type: type,
      width : width,
      height : height,
      nslices : nslices,
      fill : pattern,
    };
    
    /**
     * Array of slices Raster
     */
    this.slices = Array.from({length: nslices}, (x,i) => new T.Raster(type,width,height,i.toString()));
  }

  /**
   * Set pixels
   * 
   * @alias T.Stack~setPixels
   * @author Jean-Christophe Taveau
   */
  setPixels(data) {
    this.slices.forEach( (sli,i) => sli.pixelData = data.slice(i*sli.length, i*sli.length + sli.length) );
  }


  /**
   * Execute function for each slice in this stack
   *
   * @param {function} func - Function run for each slice of the stack
   *
   * @author Jean-Christophe Taveau
   */
  forEach(func) {
    this.slices.forEach( (x,i) => func(x,false));
  }
  
  /**
   * Execute function for each slice in this stack
   *
   * @param {function} func - Function run for each slice of the stack
   * @return {array} - returns an array of objects
   *
   * @author Jean-Christophe Taveau
   */
  map(func) {
    return this.slices.map( (x,i) => func(x,true));
  }
  
  /**
   * Extract one slice at given index 
   *
   * @param {number} index - Slice index must be comprised between 0 and length - 1
   * @return {TRaster} 
   * @author Jean-Christophe Taveau
   */
   slice(index) {
    return this.slices[index];
   }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Stack;




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
 * Class for Volume
 *
 * @alias T.Volume
 */
 
class Volume {
  /**
   * Create an empty Volume
   *
   * @param {string} type - Pixel type number: uint8, uint16, float32, rgba
   * @param {number} width - Width
   * @param {number} height - Height
   * @param {number} depth - Depth
   */
  constructor(type,width,height,depth,pattern="black") {
    
    /**
     * Width
     */
    this.width = width;
    
    /**
     * Height
     */
    this.height = height;
    
    /**
     * Depth
     */
    this.depth = depth;
    
    /**
     * Length = width * height * depth
     */
    this.length = this.width * this.height * this.depth;
    
    /**
     * Type: uint8, uint16, uint32, float32,rgba
     */
    this.type = type;

    /**
     * Metadata containing annotations, information,etc.
     */
    this.metadata = {
      dimension : 3,
      type: type,
      width : width,
      height : height,
      depth : 1,
      fill : pattern
    };
    
    /**
     * Raster containing the pixels
     */
    this.raster = new T.Raster(type,width,height,depth); 
    this.raster.parent = this;
    this.raster.pixelData = T.Raster.createPixels(this.type,this.length);
  }
  
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Volume;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
 * Class for Window
 * @alias T.Window
 */
 
class Window {
  /**
   * Create an empty Window.
   * 
   * @param {string} title - Window Title
   * @param {number} width - Window Width
   * @param {number} height - Window Height
   * @param {boolean} forceCPU - By default, all the processing is done in CPU and not in GPU
   *
   * @author Jean-Christophe Taveau
   */
  constructor(title,forceCPU=true) {
    /**
     * Title
     */
    this.title = title;
    
    
    // Build HTML5 elements
    this.root = document.createElement('article');
    this.root.className = "twindow";
    this.root.name = this.title;
    this.root.id = this.title.toLowerCase(); //  + '-' + wm.windows.length;
    this.root.style.left = `${Math.random()*1200}px`;
    this.root.style.top = `${Math.random()*400}px`;
    let header = document.createElement('header');
    header.className = 'theader';
    header.innerHTML = `<label>${title}</label>`;
    this.root.appendChild(header);
    let body = document.createElement('content');
    let footer = document.createElement('footer');
    footer.className = 'tfooter';
    this.root.appendChild(header);
    this.root.appendChild(body);
    this.root.appendChild(footer);

    // Move by click & drag 
    let offset = [];
    const move = (e) => {
      header.parentNode.style.top  = (e.clientY + offset[1]) + 'px';
      header.parentNode.style.left = (e.clientX + offset[0]) + 'px';
    };
    const mouseUp = (e) => {
      e.target.parentNode.style.zIndex = 1;
      window.removeEventListener('mousemove', move, true);
    }
    const mouseDown = (e) => {
      e.target.parentNode.style.zIndex = 99;
      offset = [this.root.offsetLeft - e.clientX, this.root.offsetTop - e.clientY];
      window.addEventListener('mousemove', move, true);
    }
    header.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

    this.element;
    


    // Try to get HW Acceleration
    this.useGPU = !forceCPU;
    /*
    if (!forceCPU) {
      // Get WEBLG 2 context
      this.ctx = this.canvas.getContext("webgl2");
      // no webgl2 for you!
      this.useGPU = (!this.ctx) ? false : true;
    }
    if (!this.useGPU) {
      this.ctx = this.canvas.getContext('2d');
      this.useGPU = false;
    }
    */
  }

  /**
   * Add a view to this window
   *
   * @alias T.Window~addView
   * @param {View} a_view - View
   *
   * @author Jean-Christophe Taveau
   */
  addView(a_view) {
    /*
     * Create an empty canvas
     */
    const createCanvas = (layerData) => {
      let canvas = document.createElement('canvas');
      canvas.layerData = layerData;
      this.element = canvas;
      
      if (!this.useGPU) {
        this.ctx = this.element.getContext('2d');
      }
      // HACK console.log(`${layerData.width} x ${layerData.height} `);
      canvas.width = layerData.width;
      canvas.height = layerData.height;
      this.root.childNodes[1].appendChild(canvas);
      let info = document.createElement('p'); 
      info.className = 'tstatus';
      info.id = this.root.id + '_status';
      info.appendChild(document.createTextNode('') );
      this.root.childNodes[2].appendChild(info);

      // Add events
      // TODO - What about CSS geometric transforms?
      // See https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
      canvas.addEventListener('mousemove', function(evt) {
        let canvas = evt.target;
        let the_view = evt.target.parentNode.parentNode.tview;
        let rect = canvas.getBoundingClientRect();
        let x = Math.floor(evt.clientX - rect.left);
        let y = Math.floor(evt.clientY - rect.top);
        let pixels = canvas.layerData.raster.pixelData;
        let w = canvas.layerData.raster.width;
        let pix = (the_view.layers[0].data.raster.type === 'float32') ? pixels[x + y * w] : pixels[x + y * w] >>>0;
        let message = `(${x},${y}): ${pix}`;
        if (the_view.layers[0].data.raster.type === 'rgba' || the_view.layers[0].data.raster.type === 'abgr') {
          message = `(${x},${y}): rgba(${cpu.red(pix)},${cpu.green(pix)},${cpu.blue(pix)},${cpu.alpha(pix)})`;
        }
        let info = canvas.parentNode.nextSibling;
        info.innerHTML = message;
      });
      // TODO Zoom in/out
      // TODO http://phrogz.net/tmp/canvas_zoom_to_cursor.html
      // TODO this.ctx.scale(2.0,2.0);
      // TODO Translate canvas
      // TODO this.ctx.translate(10.0,20.0)
      // TODO this.ctx.drawImage(win.canvas,0,0);
    };

    /* 
     * Create an empty table
     */
    const createTable = () => {
      this.element = document.createElement('table');
      this.root.childNodes[1].appendChild(this.element);
    };
  
    // M A I N
    this.root.tview = a_view;
    // Create all the HTML5 stuff...
    for (let layer of a_view.layers) {
      switch (layer.type) {
        case 'image':
        createCanvas(layer.data);
        break;
      case 'table': 
        createTable(layer.data);
        break;
      default: // Unknown
        // TODO
      }
    }
  }
  
  /**
   * Add this window to DOM and display its contents
   *
   * @alias T.Window~addToDOM
   * @author Jean-Christophe Taveau
   */
   addToDOM(parent) {
    this.root.tview.render(this);
    // show() - Add canvas to the workspace in DOM
    document.getElementById(parent).appendChild(this.root);
   }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Window;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

class View {
  constructor(title,type,width,height) {
    /**
     * Title
     */
    this.title = title;
    
    /**
     * Width
     */
    this.width = width;
    
    /**
     * Height
     */
    this.height = height;
    
    
    /**
     * Length = width * height
     */
    this.length = this.width * this.height;
    
    /**
     * Type: uint8, uint16, uint32, float32,rgba
     */
    this.type = type;

    /**
     * Array of Layers
     */
    this.layers = [];
  }
  
  appendLayer(a_layer) {
    this.layers.push(a_layer);
  }
  
  render(win) {
    console.log('render');
    for (let layer of this.layers) {
      switch (layer.type) {
      case '3D':
        render3D(win)(layer.data);
        break;
      case 'graphics':
        cpu.renderVector(win)(layer.data);
        break;
      case 'image':
        cpu.render2D(win)(layer.data);
        break;
      case 'table':
        cpu.renderTable(win)(layer.data);
        break;
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = View;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadImage", function() { return loadImage; });
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




/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__process_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__process_color__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__process_geometry__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__process_math__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__process_noise__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__process_statistics__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__process_type__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__render_view__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__render_render2D__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__render_renderVector__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return __WEBPACK_IMPORTED_MODULE_0__process_utils__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "clampUint8", function() { return __WEBPACK_IMPORTED_MODULE_0__process_utils__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "degrees", function() { return __WEBPACK_IMPORTED_MODULE_0__process_utils__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return __WEBPACK_IMPORTED_MODULE_0__process_utils__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "radians", function() { return __WEBPACK_IMPORTED_MODULE_0__process_utils__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "red", function() { return __WEBPACK_IMPORTED_MODULE_1__process_color__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "blue", function() { return __WEBPACK_IMPORTED_MODULE_1__process_color__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "green", function() { return __WEBPACK_IMPORTED_MODULE_1__process_color__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "alpha", function() { return __WEBPACK_IMPORTED_MODULE_1__process_color__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "luminance", function() { return __WEBPACK_IMPORTED_MODULE_1__process_color__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "chrominanceRed", function() { return __WEBPACK_IMPORTED_MODULE_1__process_color__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "chrominanceBlue", function() { return __WEBPACK_IMPORTED_MODULE_1__process_color__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "hue", function() { return __WEBPACK_IMPORTED_MODULE_1__process_color__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "saturation", function() { return __WEBPACK_IMPORTED_MODULE_1__process_color__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "value", function() { return __WEBPACK_IMPORTED_MODULE_1__process_color__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "splitChannels", function() { return __WEBPACK_IMPORTED_MODULE_1__process_color__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "toRGBA", function() { return __WEBPACK_IMPORTED_MODULE_1__process_color__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "crop", function() { return __WEBPACK_IMPORTED_MODULE_2__process_geometry__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "black", function() { return __WEBPACK_IMPORTED_MODULE_3__process_math__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "calc", function() { return __WEBPACK_IMPORTED_MODULE_3__process_math__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "chessboard", function() { return __WEBPACK_IMPORTED_MODULE_3__process_math__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fillColor", function() { return __WEBPACK_IMPORTED_MODULE_3__process_math__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fill", function() { return __WEBPACK_IMPORTED_MODULE_3__process_math__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "math", function() { return __WEBPACK_IMPORTED_MODULE_3__process_math__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ramp", function() { return __WEBPACK_IMPORTED_MODULE_3__process_math__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "spiral", function() { return __WEBPACK_IMPORTED_MODULE_3__process_math__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "white", function() { return __WEBPACK_IMPORTED_MODULE_3__process_math__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "noise", function() { return __WEBPACK_IMPORTED_MODULE_4__process_noise__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "saltAndPepper", function() { return __WEBPACK_IMPORTED_MODULE_4__process_noise__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "histogram", function() { return __WEBPACK_IMPORTED_MODULE_5__process_statistics__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "statistics", function() { return __WEBPACK_IMPORTED_MODULE_5__process_statistics__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fromABGRtoUint8", function() { return __WEBPACK_IMPORTED_MODULE_6__process_type__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "montage", function() { return __WEBPACK_IMPORTED_MODULE_7__render_view__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "view", function() { return __WEBPACK_IMPORTED_MODULE_7__render_view__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "renderUint8", function() { return __WEBPACK_IMPORTED_MODULE_8__render_render2D__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "renderUint16", function() { return __WEBPACK_IMPORTED_MODULE_8__render_render2D__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "renderFloat32", function() { return __WEBPACK_IMPORTED_MODULE_8__render_render2D__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "renderABGR", function() { return __WEBPACK_IMPORTED_MODULE_8__render_render2D__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "renderRGBA", function() { return __WEBPACK_IMPORTED_MODULE_8__render_render2D__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "render2D", function() { return __WEBPACK_IMPORTED_MODULE_8__render_render2D__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "renderVector", function() { return __WEBPACK_IMPORTED_MODULE_9__render_renderVector__["a"]; });
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
 
 
 /* Process/utils */


/* Process/color */


/* Process/geometry */


/* Process/math */


/* Process/noise */


//* Process/statistics */


//* Process/type */


/* Render/view */


/* Render */








/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return red; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return green; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return blue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return alpha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return luminance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return chrominanceRed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return chrominanceBlue; });
/* unused harmony export average */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return hue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return saturation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return toRGBA; });
/* unused harmony export tocolor */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return splitChannels; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
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
 * @module color
 */
 

/*
 * Clamp value between 0 and 255 (2^8 -1)
 *
 * @author Jean-Christophe Taveau
 */
const clampUint8 = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* clamp */])(0,255);
 
/**
 * Compute color pixel value from gray uint8 value 
 * @param {number} gray8 - uint8 gray value 
 * @return {number} color Pixel value 
 */
const fromGray8 = (gray8) => Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* isLittleEndian */])() ? 0xff000000 | gray8 << 16 | gray8 << 8 | gray8 & 0xff : gray8 << 24 | gray8 << 16 | gray8 << 8 | 0xff;

/**
 * Convert color pixel value to an array with red, green, blue, and alpha uint8 values
 * @param {number} color - color Pixel value 
 * @return {array} An array of red, green, blue, and alpha uint8 components
 */
const fromcolor = (color) => [(color >> 24) & 0xff, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff];

const tocolor = (r,g,b,a) => ( r << 24) | (g << 16) | (b << 8) | a;

// TODO
const fromABGR = (abgr) => ( abgr << 24) | (abgr << 16) | (abgr << 8) | abgr;

/**
 * Compute RGBA pixel value from four uint8 red, green, blue, and alpha components 
 * @param {number} red - uint8 red component 
 * @param {number} green - uint8 green component 
 * @param {number} blue - uint8 blue component 
 * @param {number} alpha - uint8 alpha component 
 * @return {number} ABGR Pixel value 
 */
const toRGBA = (r,g,b,a) => (Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* isLittleEndian */])() ? (( a << 24) | (b << 16) | (g << 8) | r) : (( r << 24) | (g << 16) | b << 8) | a);

// TODO
const toabgr = (color) => ( (color & 0xff) << 24) | ( (color & 0x00ff00) << 8) | ( (color & 0xff0000) >> 8) | ( (color & 0xff000000) >> 24);

/**
 * Extract red component of color pixel value
 * @param {number} color - color Pixel value 
 * @return {number} uint8 value 
 */
const alpha = (color) => Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* isLittleEndian */])() ? color >> 24 & 0xff : color & 0xff;

/**
 * Extract green component of color pixel value
 * @param {number} color - color Pixel value 
 * @return {number} uint8 value 
 */
const blue = (color) => Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* isLittleEndian */])() ? color >> 16 & 0xff : color >> 8 & 0xff;

/**
 * Extract blue component of color pixel value
 * @param {number} color - color Pixel value 
 * @return {number} uint8 value 
 */
const green = (color) => Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* isLittleEndian */])() ? color >> 8 & 0xff : color >> 16 & 0xff;

/**
 * Extract alpha (transparency) component of color pixel value
 * @param {number} color - color Pixel value 
 * @return {number} - uint8 value 
 */
const red = (color) => Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* isLittleEndian */])() ? color & 0xff : color >> 24 & 0xff;

/**
 * Compute Luminance gray value from color pixel value
 * @param {number} color - color Pixel value 
 * @return {number} Luminance uint8 value 
 */
const luminance = (color) => {
  /*
  Franci Penov and Glenn Slayden
  From https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color
  Photometric/digital ITU BT.709: Y = 0.2126 R + 0.7152 G + 0.0722 B
  Digital ITU BT.601 (gives more weight to the R and B components): Y = 0.299 R + 0.587 G + 0.114 B
  Approximation #1: Y = 0.33 R + 0.5 G + 0.16 B
  Approximation #2: Y = 0.375 R + 0.5 G + 0.125 B
  Fast: Y = (R+R+B+G+G+G)/6
  Fast: Y = (R+R+R+B+G+G+G+G)>>3
  */
  
  let r = red(color);
  let g = green(color);
  let b = blue(color);
  return (r+r+r+b+g+g+g+g)>>3; 
};

/**
 * Extract chrominance red component of color pixel value according to the YUV colorspace
 * @param {number} color - Color Pixel value 
 * @return {number} - uint8 value 
 */
const chrominanceRed = (color) => -0.168736 * red(color) - 0.331264 * green(color) + 0.500000 * blue(color) + 128;

/**
 * Extract chrominance blue component of color pixel value according to the YUV colorspace
 * @param {number} color - color Pixel value 
 * @return {number} - uint8 value 
 */
const chrominanceBlue = (color) => 0.500000 * red(color) - 0.418688 * green(color) - 0.081312 * blue(color) + 128;

/**
 * Convert color pixel value to Average gray value
 * @param {number} color - color Pixel value 
 * @return {number} uint8 value
 */
const average = (color) => Math.floor(red(color) + green(color) + blue(color) / 3.0);

/**
 * Extract hue component of color pixel value according to HSV colorspace
 * @param {number} color - color Pixel value 
 * @return {number} - uint8 value 
 */
const hue = (color) => {
  const ratio = (a,b,delta) => (a-b)/delta;
  
  let r = T.red(color) / 255.0, g = T.green(color) / 255.0, b = T.blue(color) / 255.0;
  let maxi = Math.max(r,Math.max(g,b));
  let mini = Math.min(r,Math.min(g,b));
  let delta = maxi - mini;
  let out = (maxi === 0 || mini === maxi) ? 0 :
    ( (maxi === r) ? (60 * ratio(g,b,delta) + 0) % 360 : 
      ( (maxi === g) ? 60 * ratio(b,r,delta) + 120 : 60 * ratio(r,g,delta) + 240 ) ); 
  return clampUint8(Math.floor(out / 360.0 * 255));
};

const hue2 = (color) => {
  let r = T.red(color), g = T.green(color), b = T.blue(color);
  let maxi = Math.max(r,Math.max(g,b));
  let mini = Math.min(r,Math.min(g,b));

  if (maxi === 0 || maxi === mini) {
    return 0;
  }
  
  if (maxi === r) {
    return  Math.max(0,Math.min(Math.floor(0 + 43 * (g - b) / (maxi - mini),255)));
  }
  else if (maxi === g) {
    return Math.max(0,Math.min(85 + 43 * (b - r) / (maxi - mini)));
  }
  else {
    return Math.max(0,Math.min(171 + 43 * (r - g) / (maxi - mini)));
  }
}

/**
 * Extract saturation component of color pixel value  according to HSV colorspace
 * @param {number} color - color Pixel value 
 * @return {number} - uint8 value 
 */
const saturation = (color) => {
  let r = T.red(color), b = T.blue(color), g = T.green(color);
  let maxi = Math.max(r,Math.max(g,b));
  let mini = Math.min(r,Math.min(g,b));
  return (maxi === 0) ? 0 : (1.0 - mini/maxi) * 255;
};

/**
 * Extract `value` component of color pixel value according to HSV colorspace
 * @param {number} color - color Pixel value 
 * @return {number} - uint8 value 
 */
const value = (color) => Math.max(T.red(color),Math.max(T.green(color), T.blue(color)));


/**
 * Split channels of color Raster according to various colorspaces
 *
 * @param {function} fns - A series of functions among:
 * <ul>
 * <li> red(px), green(px),blue(px),alpha(px),</li>
 * <li> hue(px),saturation(px),value(px),</li>
 * <li> cyan(px),magenta(px),yellow(px),</li>
 * <li> luminance(px), chrominance(px)</li>
 * </ul>
 * @param {Raster} color_img - A color image
 * @param {boolean} copy - Useless here, only for compatibility with the other process functions
 * @return {Stack} Return a stack containing the channels of various colorspaces
 * @see color.js
 */
const splitChannels = (...fns) => (color_img,copy = true) => {
  let stack = new T.Stack("Split Channels","uint8",color_img.width,color_img.height,fns.length);
  stack.slices.forEach( (sli) => sli.pixelData = T.Raster.createPixels('uint8',color_img.length) );
  stack.slices.forEach( (sli,i) => {
    sli.label = fns[i].name;
    sli.pixelData.forEach( (px,j,pixels) => pixels[j] = fns[i](color_img.pixelData[j]));
  });
  return stack;
};


// Exports
 
 
 



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return crop; });
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



/**
 * @module geometry
 */

/**
  * Crop raster 
  * @param {number} topleft_x - X-coordinate of the top left corner
  * @param {number} topleft_y - Y-coordinate of the top left corner
  * @param {number} new_width - Width of the cropped raster
  * @param {number} new_height - Height of the cropped raster
  * @param {Raster} raster - Input Raster
  * @param {boolean} copy_mode - Useless, here. Only for compatibility with other process functions
  *
  * @author Jean-Christophe Taveau
  */
const crop = (top_left_x, top_left_y,new_width,new_height) => (raster,copy_mode=true) => {
  let output = T.Raster.from(raster,false);
  let pixels = Array.from({length: new_height}, (v,i) => top_left_x + (top_left_y + i) * raster.width)
    .reduce( (accu,xy) => {
      let chunk = raster.pixelData.slice( xy, xy + new_width);
      return [...accu, ...chunk];
    },[]);
  output.width = new_width;
  output.height = new_height;
  output.setPixelData(pixels);
  return output;
}
  

/**
  * Flip vertically
  */
const flipV = (angle) => (raster,copy_mode=true) => console.log('TODO: flipV');

/**
  * Flip horizontally
  */
const flipH = (angle) => (raster,copy_mode=true) => console.log('TODO: flipH');

/**
  * Pad - <strong>TODO</strong>
  * 
  */
const pad = (topleft_x,topleft_y,new_width, new_height,value) => (img,copy_mode=true) => {
  let output = new T.Raster(img.type,new_width,new_height);
  output.pixelData = T.Raster.createPixels(output.type,output.length);
  for (let y = 0; y < img.height; y++) {
    let chunk = img.pixelData.slice(y * img.width, (y+1) * img.width);
    chunk.forEach ( (px, index) => ouput.pixelData[topleft_x + index + topleft_y * img.width] = px);
  }
  return output;
};
  
/**
  * Rotate
  */
const rotate = (angle) => (raster,copy_mode=true) => console.log('TODO: rotate');

/**
  * Scale
  */
const scale = (scalex, scaley) => (raster,copy_mode=true) => console.log('TODO: scale');

/**
  * Translate
  */
const translate = (angle) => (raster,copy_mode=true) => console.log('TODO: translate');


// Exports



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return black; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return calc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return chessboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return fill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return fillColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return math; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ramp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return spiral; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return white; });
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
 * @module math
 */
 

/**
  * Fill with the pixel gray or color value depending of the raster type
  * @param {number} value - A gray or color value
  * @param {Raster} raster - Input Raster
  * @param {boolean} copy_mode - Useless, here. Only for compatibility with other process functions
  *
  * @author Jean-Christophe Taveau
  */
const fillColor = (value) => (raster,copy_mode=true) => {
  raster.pixelData.fill(value);
  return raster;
}

/**
  * Pattern `chessboard`. Must be used with T.fill(..)
  *
  * @example
  * let output = T.fill(T.chessboard)(raster)
  *
  * @author Jean-Christophe Taveau
  */
const chessboard = (px,i,x,y) => ( (Math.floor(x/16) + Math.floor(y/16)) % 2 === 0) ? 255 : 0;

/**
  * Pattern `ramp`. Must be used with T.fill(..)
  *
  * @example
  * let output = T.fill(T.ramp)(raster)
  *
  * @author Jean-Christophe Taveau
  */
const ramp = (px,i,x,y,z,w,h) => x / w * 255;

/**
  * Pattern `spiral`. Must be used with T.fill(..)
  *
  * @example
  * let output = T.fill(T.spiral)(raster)
  *
  * @author Jean-Christophe Taveau
  */
const spiral = (px,i,x,y,z,w,h,a,d) => 128 * (Math.sin(d / 10 + cpu.radians(a))+1);

/**
  * Pattern `black`. Must be used with T.fill(..)
  *
  * @example
  * let output = T.fill(T.black)(raster)
  *
  * @author Jean-Christophe Taveau
  */
const black = (px) => 0;

/**
  * Pattern `white`. Must be used with T.fill(..)
  *
  * @example
  * let output = T.fill(T.white)(raster)
  *
  * @author Jean-Christophe Taveau
  */
const white = (px) => 255;

  
/**
  * Fill with values calculated from a function
  *
  * @param {function} func - A function
  * <p>The function may take a maximum of nine arguments:</p>
  * <ul>
  * <li>pix - Pixel value</li>
  * <li>index - Index corresponding to pix. A raster is a 1D pixels array</li>
  * <li>x - X-coordinate of pix</li>
  * <li>y - Y-coordinate of pix</li>
  * <li>z - Z-coordinate of pix if raster is in 3D</li>
  * <li>w - Width of raster</li>
  * <li>h - Height of raster</li>
  * <li>a - Angle calculated as atan2(y/x)</li>
  * <li>d - Distance to the center</li>
  * </ul>
  * @example <caption>Fill with a spiral</caption>
  * const DEG = Math.PI / 180;
  * const spiral = (pix,i,x,y,z,w,h,a,d) => 128 * (Math.sin(d / 10+ a * DEG)+1);
  * let raster = T.fill(spiral)(img.getRaster() );
  * @param {Raster} raster - Input Raster
  * @param {boolean} copy_mode - Useless, here. Only for compatibility with other process functions
  *
  * @author Jean-Christophe Taveau
  */
const fill = (func) => (raster,copy_mode=true) => {
  let w = raster.width;
  let h = raster.height;
  let nz = raster.depth || raster.nslices || 0;
  let cx = w / 2.0;
  let cy = h / 2.0;
  let cz = nz / 2.0;
  
  raster.pixelData.forEach ( (px,i,arr) => {
    let x = i % w;
    let y = Math.floor(i / w);
    let z = Math.floor( i / w / h);
    let d = Math.sqrt ((x - cx)**2 + (y - cy)**2 + (z - cz)**2);
    let a = Math.atan2(y,x);
    arr[i] = func(px,i,x,y,z,w,h,a,d);
  });
  return raster;
};
  

/**
  * Fill with values calculated from a function
  *
  * @param {function} func - A function
  * <p>The function may take a maximum of nine arguments:</p>
  * <ul>
  * <li>pix - Pixel value</li>
  * <li>index - Index corresponding to pix. A raster is a 1D pixels array</li>
  * <li>x - X-coordinate of pix</li>
  * <li>y - Y-coordinate of pix</li>
  * <li>z - Z-coordinate of pix if raster is in 3D</li>
  * <li>w - Width of raster</li>
  * <li>h - Height of raster</li>
  * <li>a - Angle calculated as atan2(y/x)</li>
  * <li>d - Distance to the center</li>
  * </ul>
  * @example <caption>Fill with a spiral</caption>
  * const DEG = Math.PI / 180;
  * const spiral = (pix,i,x,y,z,w,h,a,d) => 128 * (Math.sin(d / 10+ a * DEG)+1);
  * let raster = T.fill(spiral)(img.getRaster() );
  * @param {Raster} raster - Input Raster
  * @param {boolean} copy_mode - Useless, here. Only for compatibility with other process functions
  *
  * @author Jean-Christophe Taveau
  */
const math = (func) => (raster,copy_mode=true) => cpu.fill(func)(T.Raster.from(raster,copy_mode),copy_mode);

/**
 * Image Calculator. Combine two images by operation
 *
 * @param {Raster} raster - Input Raster
 * @param {function} func - Function for computation
 * @param {Raster} raster - Input Raster
 * @param {boolean} copy_mode - Copy mode to manage memory usage.
 * @example <caption>Addition of two uint8 rasters with clamping</caption>
 * let raster3 = T.calc(raster1, (px1,px2) => T.clampUint8(px1 + px2) )(raster2)
 *
 * @author Jean-Christophe Taveau
 */
const calc = (other,func) => (raster,copy_mode=true) => {
  // TODO Assume two raster have same dimension
  let output = T.Raster.from(raster, copy_mode);
  output.pixelData.forEach( (px2,i,arr) => {
    let w = raster.width;
    let x = i % w;
    let y = Math.floor(i / w);
    let px1 = other.pixelData[i];
    output.pixelData[i] = func(px1,px2,i,x,y);
  });
  return output;
};

// Export




/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return noise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return saltAndPepper; });
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
 * Add Salt and Pepper Noise
 *
 * @param {number} percent - percentage of noise added to the image
 * @param {Raster} raster - Input image
 * @param {boolean} copy_mode - Used to control the copy (or not) of the image pixels
 * @usage saltAndPepper(0.05)(my_image)
 *
 * @author Jean-Christophe Taveau
 */
const saltAndPepper = (percent=0.05) => (raster,copy_mode = true) => {
  let output = T.Raster.from(raster,copy_mode);
  let pixels = output.pixelData;
  Array.from({length: Math.floor(raster.length * percent)}, x => Math.floor(Math.random() * raster.length) )
    .forEach( (x,i) => pixels[x] = (i%2==0) ? 255 : 0 );
  return output;
};


/** 
 * Adds pseudorandom, Gaussian ("normally") distributed values, with
 * mean 0.0 and the specified standard deviation, to this image or ROI. 
 * Adapted from ImageJ code (Wayne Rasband)
 */
const noise = (standardDeviation = 25.0) => (raster,copy_mode = true) => {
  // Private functions
  const inRange = (x,a_min,a_max) => (x >= a_min && x <= a_max);
  
  // Standard Normal variate using Box-Muller transform.
  const rand_bm = (variance) => {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) * variance) * Math.cos( 2.0 * Math.PI * v );
  };

  let dummy = T.statistics(raster);
  let output = T.Raster.from(raster,copy_mode);
  let pixels = output.pixelData;
  let variance = standardDeviation**2;
  raster.pixelData.forEach( (px,i) => {
    do {
      pixels[i] = Math.floor(px + rand_bm(variance));
    } while (!inRange(pixels[i],0,255))
  } );
  return output;
};



    



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return histogram; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return statistics; });
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
 * @module statistics
 */
 
/**
 * Computes basic stats: min, max, mean/average and standard deviation of the image.
 * Algorithm for variance found in <a href="https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Two-pass_algorithm">Wikipedia</a>
 * 
 * @param {Raster} img - Input raster
 * @param {boolean} copy_mode - Useless here, only for compatibility with the other processing functions
 * @return {object} - Returns an object containing min, max, mean, variance
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

const histogram = (binNumber) => (raster, copy_mode = true) => {
  // Update statistics
  let stats = T.statistics(raster);
  let delta = (raster.statistics.max - raster.statistics.min);
  raster.statistics.binSize = binNumber / delta;
  raster.statistics.histogram = raster.pixelData.reduce ((bins,px,i) => {
    let index = T.clamp(0,binNumber)( Math.floor( (binNumber - 1) * (px - raster.statistics.min)/ delta));
    bins[index]++;
    return bins;
    },
    new Array(binNumber).fill(0)
  );
  return raster;
};

// Exports





/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fromABGRtoUint8; });
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





/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return montage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return view; });
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
 * @module view
 */
 
/**
 * Rectangular view of a single image 
 *
 * @param {number} x - X-coord of the top-left corner of the rectangle
 * @param {number} y - Y-coord of the top-left corner of the rectangle
 * @param {number} w - Width of the rectangle. A value of -1 corresponds to the input width.
 * @param {number} h - Height rectangle.  A value of -1 corresponds to the input height.
 * @param {TRaster} img - Input Image
 * @param {boolean} copy - Copy mode to manage memory usage. Useless, here just for compatibility. 
 * @returns {TView} Returns a view for rendering
 *
 * @author Jean-Christophe Taveau 
 */
const view = (raster,copy_mode=true) => {
  // Update raster in parent (Image, Stack or Volume?))
  raster.parent.setRaster(raster);
  raster.parent.width = raster.width;
  raster.parent.height = raster.height;
  raster.parent.type = raster.type;
  // HACK let img = new T.Image('view',raster.type,raster.width, raster.height);
  let a_view = new T.View('view',raster.type,raster.width, raster.height);
  a_view.appendLayer({type: 'image', data: raster.parent});
  return a_view;
};

/**
 * Montage - Convert a stack in a view for rendering
 *
 * @param {number} row - Row number
 * @param {number} column - Column number
 * @param {number} scale - Scaling of the resulting image
 * @param {number} border - Border
 * @param {TStack} stack - Input Stack
 * @param {boolean} copy - Copy mode to manage memory usage. Useless, here just for compatibility. 
 * @returns {TView} Returns a view for rendering
 *
 * @author Jean-Christophe Taveau
 */
const montage = (row,column,scale=1.0,border=0) => (stack,copy_mode=true) => {
  let view = new T.View('montage',stack.type,stack.width * column, stack.height * row);
  // Create Image
  let output = new T.Image(stack.type,stack.width * column, stack.height * row);
  stack.slices.forEach( (sli,index) => output.raster.pad( (index % column) * stack.width, Math.floor(index/ column) * stack.height,sli) );
  view.appendLayer({type: 'image',data: output});
  // Create Labels
  let labels = [{type: 'text',x:0,y:0,content: 'Test'}];
  view.appendLayer({type: 'graphics',data: labels});
  return view;
};


// Exports



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return renderUint8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return renderUint16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return renderFloat32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return renderABGR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return renderRGBA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render2D; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__process_utils__ = __webpack_require__(0);
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
 * Functions used to render image in a HTML5 web page
 * @module render2D
 */
 
/**
 * Display uint8 image
 *
 * @param {TWindow} win - Window used to display the image in the HTML5 page
 * @param {TImage} uint8 - Image containing uint8 pixels data
 * @param {boolean} copy - Useless. Just here for compatibility with other process/render functions.
 *
 * @author Jean-Christophe Taveau
 */
const renderUint8 = (win) => (img8bit,copy=true) => {
  // Tutorial: https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
  let imgdata = win.ctx.createImageData(img8bit.width, img8bit.height);

  // New RGBA image buffer
  let buf = new ArrayBuffer(img8bit.width * img8bit.height * 4);
  let buf32 = new Uint32Array(buf);
  let buf8 = new Uint8Array(buf);
  // Fill with ABGR color values
  buf32.forEach( (px,i,arr) => arr[i] = cpu.toRGBA(img8bit.pixelData[i],img8bit.pixelData[i],img8bit.pixelData[i],255) );

  imgdata.data.set(buf8);
  win.ctx.putImageData(imgdata, 0, 0);
};


/**
 * Display uint16 image
 *
 * @param {TWindow} win - Window used to display the image in the HTML5 page
 * @param {TImage} uint8 - Image containing uint8 pixels data
 * @param {boolean} copy - Useless. Just here for compatibility with other process/render functions.
 *
 * @author Jean-Christophe Taveau
 */
const renderUint16 = (win) => (img16bit,copy=true) => {
  // Tutorial: https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
  let imgdata = win.ctx.createImageData(img16bit.width, img16bit.height);

  // New RGBA image buffer
  let buf = new ArrayBuffer(img16bit.width * img16bit.height * 4);
  let buf32 = new Uint32Array(buf);
  let buf8 = new Uint8Array(buf);
  // Fill with ABGR color values
  buf32.forEach( (px,i,arr) => arr[i] = cpu.toRGBA(img16bit.pixelData[i] >> 8,img16bit.pixelData[i] >> 8,img16bit.pixelData[i] >> 8,255) );

  imgdata.data.set(buf8);
  win.ctx.putImageData(imgdata, 0, 0);
};


/**
 * Display float32 image
 *
 * @param {TWindow} win - Window used to display the image in the HTML5 page
 * @param {TImage} uint8 - Image containing uint8 pixels data
 * @param {boolean} copy - Useless. Just here for compatibility with other process/render functions.
 *
 * @author Jean-Christophe Taveau
 */
const renderFloat32 = (win) => (imgf32,copy=true) => {
  // Tutorial: https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
  let imgdata = win.ctx.createImageData(imgf32.width, imgf32.height);
  
  // Update statistics
  let dummy = cpu.statistics(imgf32); 
  
  // New RGBA image buffer
  let buf = new ArrayBuffer(imgf32.length * 4);
  let buf32 = new Uint32Array(buf);
  let buf8 = new Uint8Array(buf);
  // Fill with ABGR color values
  let delta = 255.0 / (imgf32.statistics.max - imgf32.statistics.min) ;
  buf32.forEach( (px,i,arr) => {
    let pix = Math.floor((imgf32.pixelData[i] - imgf32.statistics.min) * delta );
    arr[i] = cpu.toRGBA(pix,pix,pix,255);
  });

  imgdata.data.set(buf8);
  win.ctx.putImageData(imgdata, 0, 0);
};


/**
 * Display RGBA image
 *
 * @param {TWindow} win - Window used to display the image in the HTML5 page
 * @param {TImage} img - Image containing RGBA pixels data
 * @param {boolean} copy - Useless. Just here for compatibility with other process/render functions.
 *
 * @author Jean-Christophe Taveau
 */
const renderRGBA = (win) => (raster,copy=true) => {
  // Tutorial: https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
  let imgdata = win.ctx.createImageData(raster.width, raster.height);

  // New RGBA image buffer
  // let buf = new ArrayBuffer(img.width * img.height * 4);
  // let buf32 = new Uint32Array(buf);
  let buf8 = new Uint8Array(raster.pixelData.buffer);
  // Fill with ABGR color values
  // buf32.forEach( (px,i,arr) => arr[i] = img.pixelData[i]);
  // T.toRGBA(T.red(img.pixelData[i]),T.green(img.pixelData[i]),T.blue(img.pixelData[i]),T.alpha(img.pixelData[i]) ) );

  imgdata.data.set(buf8);
  win.ctx.putImageData(imgdata, 0, 0);
};


const render2D = (win) => (img,copy=true) => {
  console.log(win);
  switch (img.raster.type) {
  case 'uint8':
    renderUint8(win)(img.raster);
    break;
  case 'uint16':
    renderUint16(win)(img.raster);
    break;
  case 'float32':
    renderFloat32(win)(img.raster);
    break;
  case 'rgba':
  case 'abgr':
    renderRGBA(win)(img.raster);
    // (isLittleEndian()) ? T.renderABGR(win)(img.raster) : T.renderRGBA(win)(img.raster);
    break;
  }
};

// Exports
 



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return renderVector; });
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
 * Functions used to render vectorial data in a HTML5 web page
 * @module renderVector
 */
 
/**
 * Display Vectorial Data
 *
 * @param {TWindow} win - Window used to display the image in the HTML5 page
 * @param {TImage} uint8 - Image containing uint8 pixels data
 * @param {boolean} copy - Useless. Just here for compatibility with other process/render functions.
 *
 * @author Jean-Christophe Taveau
 */
const renderVector = (win) => (obj,copy=true) => {
  console.log('renderVector');
};

// Exports
 



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gpu_utils__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Processor__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gpu_math__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createGPU", function() { return __WEBPACK_IMPORTED_MODULE_0__gpu_utils__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createProgram", function() { return __WEBPACK_IMPORTED_MODULE_0__gpu_utils__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getGraphicsContext", function() { return __WEBPACK_IMPORTED_MODULE_0__gpu_utils__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Processor", function() { return __WEBPACK_IMPORTED_MODULE_1__Processor__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fill", function() { return __WEBPACK_IMPORTED_MODULE_2__gpu_math__["a"]; });
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
 

/* gpu/gpu_utils */


/* gpu/Processor*/


/* gpu/math*/








/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createGPU; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getGraphicsContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createProgram; });
/* unused harmony export rectangle */
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
 * Toolbox for GPU
 *
 */

/**
 * Create a GPU Processor
 *
 * @author Jean-Christophe Taveau
 */
const createGPU = (graphics,width=-1,height=-1) => new gpu.Processor(graphics.context,graphics.canvas,width,height);
  

/**
 *
 * Init WebGL2
 *
 */
const getGraphicsContext = (elementID='preview') => {
  let _canvas = document.getElementById(elementID);
  let gl2;
  try {
    gl2 = _canvas.getContext("webgl2");
    
    const ext = gl2.getExtension("EXT_color_buffer_float");
    if (!ext) {
      alert("need EXT_color_buffer_float");
    }
  } catch (e) {
  }
  if (!gl2) {
      alert("Could not initialise WebGL2, sorry :-(");
  }
  return {canvas: _canvas, context: gl2};
};


/**
 *
 * Create Shader Program
 *
 */
const createProgram = (gpuEnv,src_vs,src_fs) => {

  // Compile shader
  const compileShader = (gl, source,type) => {
    let str = source;

    let shader;
    if (type == "fragment") {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (type == "vertex") {
      shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
      return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(` ${type}: ${gl.getShaderInfoLog(shader)}`);
      return null;
    }

    return shader;
  };

  /**** MAIN ****/
  
  let shader = {
    program: null,
    attributes: {},
    uniforms: {}
  };

  let gl = gpuEnv.context;
  
  //1- Check in source(s) where are the attributes (keyword`in `)
  let re = /in\s*(\w+)\s(\w+)/gm;
  let result;
  while ((result = re.exec(src_vs)) !== null) {
    // console.log(re.exec(src_vs));
    shader.attributes[result[2]] = {type: result[1],name: result[2],location: null};
  }
  // Check in source(s) where are the uniforms (keyword: `uniform`)
  re = /uniform\s*(\w+)\s+(\w+)\s*(\[)*/gm;
  while ((result = re.exec(src_vs)) !== null) {
    // console.log(re.exec(src_vs));
    shader.uniforms[result[2]] = {type: result[1]+(result[3]?'[]':''),name: result[2],location: null};
  }
  while ((result = re.exec(src_fs)) !== null) {
    // console.log(re.exec(src_vs));
    shader.uniforms[result[2]] = {type: result[1]+(result[3]?'[]':''),name: result[2],location: null};
  }
  console.log(shader);

  // 2- Create Shader Program with link step.
  shader.program = gl.createProgram();
  
  gl.attachShader(shader.program, compileShader(gl,src_vs,'vertex'));
  gl.attachShader(shader.program, compileShader(gl,src_fs,'fragment'));
  gl.linkProgram(shader.program);

  if (!gl.getProgramParameter(shader.program, gl.LINK_STATUS)) {
    alert("Could not initialise shaders");
  }
  
  // 3- Get Attribute and Uniform locations
  Object.values(shader.attributes).forEach( (attr) => attr.location =  gl.getAttribLocation(shader.program, attr.name) );
  Object.values(shader.uniforms).forEach( (uniform) => uniform.location =  gl.getUniformLocation(shader.program, uniform.name) );
  return shader;
}

/**
 * Create a rectangle for gpu.Processor.geometry(..) function
 *
 * @author Jean-Christophe Taveau
 */

const rectangle = (w,h) => ({
    type: 'TRIANGLE_STRIP', 
    num: 4,
    vertices: new Float32Array(
      [
        0.0,0.0,0.0,0.0,
        0.0,h  ,0.0,1.0,
        w  ,0.0,1.0,0.0,
        w  ,h  ,1.0,1.0
      ]
    )
  });

// Export





/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
 



class Processor {
  constructor(context,canvas,width=-1,height=-1) {
    this.context = context; 
    this.canvas = canvas;
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.geometries = {};
    this.textures = [];
    this.attributes= {};
    this.uniforms = {};
    this.framebuffers = {};
  }

  attribute(a_name,a_num,a_type,a_stride,a_offset) {
    this.attributes[a_name] = {
      name: a_name,
      num : a_num,
      type: a_type, 
      stride: a_stride,
      offset: a_offset,
      location: null
    };
    return this;
  }

  clearCanvas(color = [0.1,0.1,0.1,1.0]) {
    let gl = this.context;
    
    // Define viewport
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(color[0],color[1],color[2],color[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    return this;
  }
  
  /**
   *
   * primitives:
   * - type: TRIANGLE_STRIP, POINTS, TRIANGLES, LINES
   * - vertices: Float32Array([])
   */
  geometry(obj) {
    let gl = this.context;
    const glConstants = {
      'TRIANGLE_STRIP' : gl.TRIANGLE_STRIP
    };
    
    // Create vertices for rectangle
    this.geometries.type = obj.type;
    this.geometries.glType = glConstants[obj.type];
    this.geometries.buffer = gl.createBuffer();
    this.geometries.numVertices = obj.num;
    gl.bindBuffer(gl.ARRAY_BUFFER,this.geometries.buffer);
    gl.bufferData(gl.ARRAY_BUFFER,obj.vertices,gl.STATIC_DRAW);

    // Unbind buffer(s)
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    return this;
  }
  
  /**
   *
   */
   packWith(shaderProgram) {
      let gl = this.context;
      
      this.shader = shaderProgram;
      
      // 1- Get Attribute and Uniform locations
      Object.values(this.attributes).forEach( (attr) => {
        attr.location =  shaderProgram.attributes[attr.name].location;
        attr.component =  shaderProgram.attributes[attr.name].type;
      });
      
      console.log(this.attributes);
      
      // 2- Create a VAO
      this.vao = gl.createVertexArray();
      gl.bindVertexArray(this.vao);
      // 3- Bind the position buffer containing the vertices
      gl.bindBuffer(gl.ARRAY_BUFFER, this.geometries.buffer);
      // 4- Attributes
      Object.values(this.attributes).forEach( (a) => {
        console.log(a);
        gl.enableVertexAttribArray(this.attributes[a.name].location);
        gl.vertexAttribPointer(
          this.attributes[a.name].location, 
          this.attributes[a.name].num, 
          gl.FLOAT, 
          false, 
          this.attributes[a.name].stride, 
          this.attributes[a.name].offset
        );
        }
      );
      // Unbind buffers
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindVertexArray(null);
      return this;
   }
   
  /**
   * Render in a Frame Buffer
   */
  redirectTo(fbo_name,type='uint8',attachment=0) {
    let gl = this.context;
    
    // Be sure no active framebuffer somewhere
    // gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,null);
    
    if (this.framebuffers[fbo_name] === undefined) {
      console.log('CREATE FBO');
      let fbo = gl.createFramebuffer();

      let internalFormat = gl.RGBA;
      let srcType = gl.UNSIGNED_BYTE;
      
      if (type == 'uint16' || type === 'float32') {
        internalFormat = gl.RGBA32F;
        srcType = gl.FLOAT; 
      }

      let texture = this._createTexture(
        gl,
        null,
        this.width,
        this.height,
        internalFormat,
        gl.RGBA,
        srcType,
        gl.CLAMP_TO_EDGE,
        gl.NEAREST,
        gl.NEAREST
      );
        
      gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0 + attachment,
        gl.TEXTURE_2D,
        texture,
        0
      );
      
      this.framebuffers[fbo_name] = {
        id: 'framebuffer',
        name: fbo_name,
        buffer: fbo,
        texture: texture
      };
    }
    else {
      gl.bindFramebuffer(gl.FRAMEBUFFER,this.framebuffers[fbo_name].buffer);
    }
    
    gl.bindTexture(gl.TEXTURE_2D, this.framebuffers[fbo_name].texture);
    gl.viewport(0,0,this.width, this.height);
    
    return this;
  }
  
  /**
   * Update canvas size
   */
  size(w,h) {
    this.canvas.width = w;
    this.canvas.height = h;
    this.width = w;
    this.height = h;
    return this;
  }
  
  /*
   * Pseudo-private - for Internal use, only
   */
  _createTexture (context,data,w,h,iformat,format,type, wrap,mini, mag) {
    let gl = context;
    
    let texture = gl.createTexture();

    // Bind it to texture unit 0' 2D bind point
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the parameters so we don't need mips and so we're not filtering
    // and we don't repeat
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mini);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, mag);
    // Upload the image into the texture.
    let mipLevel = 0;              // the largest mip
    let internalFormat = iformat;   // format we want in the texture
    let srcFormat = format;        // format of data we are supplying
    let srcType = type;            // type of data we are supplying
    
    gl.texImage2D(
      gl.TEXTURE_2D,
      mipLevel,
      internalFormat,
      w,
      h,
      0, // Border
      srcFormat,
      srcType,
      data
    );

    // Job finished: Unbind texture
    gl.bindTexture(gl.TEXTURE_2D, null);
    
    return texture;
  };

  /**
 *
 */
  texture(raster,unit=0, wrap='clamp',mini='nearest', mag= 'nearest') {
  
    console.log('RASTER ? ...');
    if (raster.id !== undefined && raster.id === 'framebuffer') {
      console.log('No, FBO...');
      this.textures[0] = {texture: raster.texture, unit: unit};
      return this;
    }
    console.log('Yes, Raster!');
    console.log(raster);
    
    let gl = this.context;
    
    const glConstants = {
      'clamp' : gl.CLAMP_TO_EDGE,
      'repeat' : gl.REPEAT,
      'mirror' : gl.MIRRORED_REPEAT,
      'nearest' : gl.NEAREST,
      'uint8': gl.UNSIGNED_BYTE,
      'uint16': gl.UNSIGNED_SHORT,
      'float32': gl.FLOAT,
      'rgba' : gl.UNSIGNED_BYTE,
      'gray' : gl.LUMINANCE,
      'color': gl.RGBA
    }
  
     
    this.width = raster.width;
    this.height = raster.height;
    
    let texture = this._createTexture(
      gl,
      raster.pixelData,
      raster.width,
      raster.height,
      (raster.type === 'uint8' || raster.type === 'uint16' || raster.type === 'float32') ? gl.LUMINANCE : gl.RGBA,
      (raster.type === 'uint8' || raster.type === 'uint16' || raster.type === 'float32') ? gl.LUMINANCE : gl.RGBA,
      glConstants[raster.type],
      glConstants[wrap],
      glConstants[mini],
      glConstants[mag]
    );
    

    this.textures.push({texture: texture, unit: unit});
    
    return this;
  }

  /**
   *
   */
  preprocess() {
    return this.use();
  }
  
  /**
   *
   */
  process() {
    return this.run();
  }
  
  /**
   *
   */
  use() {
    let gl = this.context;
    
    gl.useProgram(this.shader.program);
    
    return this;
  }
  
  /**
   *
   */
  run() {
    let gl = this.context;
    
    // Bind the position buffer containing the vertices (ie rectangle)
    gl.bindVertexArray(this.vao);

    this.textures.forEach( (tex) => {
      gl.activeTexture(gl.TEXTURE0 + tex.unit);
      gl.bindTexture(gl.TEXTURE_2D, tex.texture);
    });

    gl.drawArrays(this.geometries.glType,0,this.geometries.numVertices);
    
    // Clean up
    // TODO
    gl.bindTexture(gl.TEXTURE_2D,null);
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER,null);
    
    return this;
  }


  /**
   *
   */
  uniform(u_name,u_value) {
    let gl = this.context;
    
    let u = this.shader.uniforms[u_name];

    switch (u.type) {
      case 'float': gl.uniform1f(u.location, u_value);break;
      case 'int': gl.uniform1i(u.location, u_value);break;
      case 'uint': gl.uniform1ui(u.location, u_value);break;
      case 'int[]': gl.uniform1iv(u.location, u_value);break;
      case 'float[]': gl.uniform1fv(u.location, u_value);break;
      case 'mat2': gl.uniformMatrix2fv(u.location, u_value);break;
      case 'mat3': gl.uniformMatrix3fv(u.location, u_value);break;
      case 'mat4': gl.uniformMatrix4fv(u.location, u_value);break;
      case 'sampler2D': gl.uniform1i(u.location, u_value);break;
      case 'vec2': gl.uniform2fv(u.location, u_value);break;
      case 'vec3': gl.uniform3fv(u.location, u_value);break;
      case 'vec4': gl.uniform4fv(u.location, u_value);break;
    };
    return this;
   }
   
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Processor;






/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fill; });
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
 * @module math
 */
 

  
/**
  * Fill with values calculated from a function
  *
  * @param {function} func - A function
  * <p>The function may take a maximum of nine arguments:</p>
  * <ul>
  * <li>pix - Pixel value</li>
  * <li>index - Index corresponding to pix. A raster is a 1D pixels array</li>
  * <li>x - X-coordinate of pix</li>
  * <li>y - Y-coordinate of pix</li>
  * <li>z - Z-coordinate of pix if raster is in 3D</li>
  * <li>w - Width of raster</li>
  * <li>h - Height of raster</li>
  * <li>a - Angle calculated as atan2(y/x)</li>
  * <li>d - Distance to the center</li>
  * </ul>
  * @example <caption>Fill with a spiral</caption>
  * const DEG = Math.PI / 180;
  * const spiral = (pix,i,x,y,z,w,h,a,d) => 128 * (Math.sin(d / 10+ a * DEG)+1);
  * let raster = T.fill(spiral)(img.getRaster() );
  * @param {Raster} raster - Input Raster
  * @param {boolean} copy_mode - Useless, here. Only for compatibility with other process functions
  *
  * @author Jean-Christophe Taveau
  */
const fill = (func) => (raster,copy_mode=true) => {
  let src_vs = `#version 300 es

  in vec2 a_vertex;
  
  void main() {
    gl_Position = vec4(a_vertex * 2.0 - 1.0, 0.0, 1.0);
  }`;

  /*
    Private function
   */
  function parse(src) {
    
    // Parse
    // 1- Search the arguments between parentheses `(..)`
    let re = /\(([^)]+)\)/g;
    let args = re.exec(src)[1].split(',');
    if (args.length !== 9) {
      const default_args = ['pix','index','x','y','z','rasterWidth','rasterHeight','angle','distance'];
      args = [...args,...default_args.slice(args.length,default_args.length) ];
    }
    // 2- Search the core between curly brackets {..}` or between arrow `=>` and semi-column `;` or EOL
    //=> { }
    let func_body = '';
    if (/\{(.*)\}/g.exec(src) === undefined) {
      func_body = /\{(.*)\}/g.exec(src)[1];
    }
    else {
      func_body = /=>(.*)$/g.exec(src)[1];
    }
    // 2- Clean code like removing `Math.`, changed variable names, etc.
    // Python replace(/(?<![\d.])[0-9]+(?![\d.])/,'$1.0');
    func_body = func_body.replace(/Math\./g,'').replace(/cpu\./g,'').replace(/([\d.]+)/g,'$1.0').replace(/(\.\d+).0/g,'$1');
    
    // Build the code
    let func_code = `vec4 fill(float ${args[0]}) {
        float ${args[2]} = gl_FragCoord.x; 
        float ${args[3]} = gl_FragCoord.y;
        // float ${args[4]} = gl_FragCoord.z;
        float ${args[5]} = u_rasterSize.x;
        float ${args[6]} = u_rasterSize.y;
        int ${args[1]} = int(${args[2]} + ${args[5]} * ${args[3]});
        float halfw = ${args[5]} / 2.0;
        float halfh = ${args[6]} / 2.0;
        vec2 point = vec2((${args[2]} - halfw), (${args[3]} - halfh));
        float ${args[8]} = sqrt( dot(point,point) );
        float ${args[7]} = atan(${args[3]}/${args[2]});
        float value = ${func_body};
        return vec4(vec3(value / 255.0),1.0);
      }`; 
    // 2- if pixel used, define a sampler...

    let template = `#version 300 es
      precision highp float;
      
      // we need to declare an output for the fragment shader
      out vec4 outColor;
      uniform vec2 u_rasterSize;

      ${func_code}
      
      void main() {
        outColor = vec4(fill(0.0)); 
      }`;
    
    // DEBUG - 
    console.log(template);
    
    return template;
  } 
  
  // Step #2: Parse `func` to create fragment source
  let src_fs = parse(func.toString());

  // Step #2: Create - compile + link - shader program
  let the_shader = gpu.createProgram(gpuEnv,src_vs,src_fs);
  
  // Step #3: Create the rectangle WITHOUT texture 
  let gproc = gpu.createGPU(gpuEnv,raster.width,raster.height)
    .geometry({
      type: 'TRIANGLE_STRIP',
      num: 4,
      vertices: new Float32Array([
        0.0,0.0,
        0.0,1.0,
        1.0,0.0,
        1.0,1.0,
        ])
    })
    .attribute('a_vertex',2,'float', 2 * 4,0)
    .packWith(the_shader) 
    .clearCanvas([0.0,1.0,1.0,1.0])
    .preprocess()
    .uniform('u_rasterSize',new Float32Array([raster.width,raster.height]) )
    .run();
    
  return raster;
};
  

/**
  * Fill with values calculated from a function
  *
  * @param {function} func - A function
  * <p>The function may take a maximum of nine arguments:</p>
  * <ul>
  * <li>pix - Pixel value</li>
  * <li>index - Index corresponding to pix. A raster is a 1D pixels array</li>
  * <li>x - X-coordinate of pix</li>
  * <li>y - Y-coordinate of pix</li>
  * <li>z - Z-coordinate of pix if raster is in 3D</li>
  * <li>w - Width of raster</li>
  * <li>h - Height of raster</li>
  * <li>a - Angle calculated as atan2(y/x)</li>
  * <li>d - Distance to the center</li>
  * </ul>
  * @example <caption>Fill with a spiral</caption>
  * const DEG = Math.PI / 180;
  * const spiral = (pix,i,x,y,z,w,h,a,d) => 128 * (Math.sin(d / 10+ a * DEG)+1);
  * let raster = T.fill(spiral)(img.getRaster() );
  * @param {Raster} raster - Input Raster
  * @param {boolean} copy_mode - Useless, here. Only for compatibility with other process functions
  *
  * @author Jean-Christophe Taveau
  */
const math = (func) => (raster,copy_mode=true) => {
  // TODO
  // cpu.fill(func)(T.Raster.from(raster,copy_mode),copy_mode);
};

/**
 * Image Calculator. Combine two images by operation
 *
 * @param {Raster} raster - Input Raster
 * @param {function} func - Function for computation
 * @param {Raster} raster - Input Raster
 * @param {boolean} copy_mode - Copy mode to manage memory usage.
 * @example <caption>Addition of two uint8 rasters with clamping</caption>
 * let raster3 = T.calc(raster1, (px1,px2) => T.clampUint8(px1 + px2) )(raster2)
 *
 * @author Jean-Christophe Taveau
 */
const calc = (other,func) => (raster,copy_mode=true) => {
  // TODO Assume two raster have same dimension

  return output;
};

// Export




/***/ })
/******/ ]);
});