var T =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return pipe; });
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

'use script';

/**
 * Extract alpha (transparency) component of RGBA pixel value
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
 * pipe(func1, func2, func3, ..., funcn)
 * From https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d
 *
 * @example pipe(func1,func2) returns func2(func1(x))
 *
 * @author Eric Elliott
 */
const pipe = (...fns) => (x,copy_mode=false) => fns.reduce((v, f,i) => {
  return f(v,copy_mode);
  }, x);



// Exports




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Raster__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Image__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stack__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Window__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__View__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__process_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__process_color__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__process_geometry__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__process_math__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__process_noise__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__render_view__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__render_render2D__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__render_renderVector__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Raster", function() { return __WEBPACK_IMPORTED_MODULE_0__Raster__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return __WEBPACK_IMPORTED_MODULE_1__Image__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Stack", function() { return __WEBPACK_IMPORTED_MODULE_2__Stack__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Window", function() { return __WEBPACK_IMPORTED_MODULE_3__Window__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return __WEBPACK_IMPORTED_MODULE_4__View__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return __WEBPACK_IMPORTED_MODULE_5__process_utils__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return __WEBPACK_IMPORTED_MODULE_5__process_utils__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "red", function() { return __WEBPACK_IMPORTED_MODULE_6__process_color__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "blue", function() { return __WEBPACK_IMPORTED_MODULE_6__process_color__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "green", function() { return __WEBPACK_IMPORTED_MODULE_6__process_color__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "alpha", function() { return __WEBPACK_IMPORTED_MODULE_6__process_color__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "luminance", function() { return __WEBPACK_IMPORTED_MODULE_6__process_color__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "chrominanceRed", function() { return __WEBPACK_IMPORTED_MODULE_6__process_color__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "chrominanceBlue", function() { return __WEBPACK_IMPORTED_MODULE_6__process_color__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "hue", function() { return __WEBPACK_IMPORTED_MODULE_6__process_color__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "saturation", function() { return __WEBPACK_IMPORTED_MODULE_6__process_color__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "value", function() { return __WEBPACK_IMPORTED_MODULE_6__process_color__["m"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "splitChannels", function() { return __WEBPACK_IMPORTED_MODULE_6__process_color__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "toABGR", function() { return __WEBPACK_IMPORTED_MODULE_6__process_color__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "toRGBA", function() { return __WEBPACK_IMPORTED_MODULE_6__process_color__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "crop", function() { return __WEBPACK_IMPORTED_MODULE_7__process_geometry__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fillColor", function() { return __WEBPACK_IMPORTED_MODULE_7__process_geometry__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fill", function() { return __WEBPACK_IMPORTED_MODULE_7__process_geometry__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "calc", function() { return __WEBPACK_IMPORTED_MODULE_8__process_math__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "saltAndPepper", function() { return __WEBPACK_IMPORTED_MODULE_9__process_noise__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "montage", function() { return __WEBPACK_IMPORTED_MODULE_10__render_view__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "view", function() { return __WEBPACK_IMPORTED_MODULE_10__render_view__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "renderUint8", function() { return __WEBPACK_IMPORTED_MODULE_11__render_render2D__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "renderRGBA", function() { return __WEBPACK_IMPORTED_MODULE_11__render_render2D__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "render2D", function() { return __WEBPACK_IMPORTED_MODULE_11__render_render2D__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "renderVector", function() { return __WEBPACK_IMPORTED_MODULE_12__render_renderVector__["a"]; });
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


/* Render/view */


/* Render */








/***/ }),
/* 2 */
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
  constructor(type,width,height,label='None') {
    /**
     * Width
     */
    this.width = width;
    
    /**
     * Height
     */
    this.height = height;
    
    /**
     * Label
     */
    this.label = label;
    
    /**
     * Length = width * height
     */
    this.length = this.width * this.height;
    
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
    case 'uint8': arr = new Uint8ClampedArray(length).fill(0);
    case 'uint16': arr = new Uint16Array(length).fill(0);
    case 'uint32': arr = new Uint32Array(length).fill(0);
    case 'float32': arr = new Float32Array(length).fill(0.0);
    case 'rgba': arr = new Uint32Array(length).fill(0);
    }
    return arr;
  }
  
  static MIN_VALUE() {
    return 0;
  }
  
  static fromWindow(win, copy = true) {
    let img = new TRaster(win.metadata.type,win.metadata.width,win.metadata.height);
    img.pixelData (copy === true) ? [...win.raster.pixelData] : win.raster.pixelData; // Copy pixels
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
    img.pixelData = (copy === true) ? [...other.pixelData] : other.pixelData; // Copy pixels
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
    return x % this.width;
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
    return Math.floor(x / this.width);
  }
  
  /**
   * Set pixel value at given index
   *
   * @author Jean-Christophe Taveau
   */
  set(index,value) {
    this.pixelData[index] = value;
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
/* 3 */
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
     * Type: uint8, uint16, uint32, float32,rgba
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
  constructor(title,type,width,height,nslices,pattern="black") {
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
        let pix = pixels[x + y * w];
        let message = `(${x},${y}): ${pix}`;
        if (the_view.layers[0].data.raster.type === 'rgba') {
          message = `(${x},${y}): #${pix.toString(16)} (${T.red(pix)},${T.green(pix)},${T.blue(pix)},${T.alpha(pix)})`;
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
        T.renderVector(win)(layer.data);
        break;
      case 'image':
        T.render2D(win)(layer.data);
        break;
      case 'table':
        T.renderTable(win)(layer.data);
        break;
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = View;



/***/ }),
/* 7 */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return toABGR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return toRGBA; });
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
 * Compute RGBA pixel value from gray uint8 value 
 * @param {number} gray8 - uint8 gray value 
 * @return {number} RGBA Pixel value 
 */
const fromGray8 = (gray8) => gray8 << 24 | gray8 << 16 | gray8 << 8 | 0xff;

/**
 * Convert RGBA pixel value to an array with red, green, blue, and alpha uint8 values
 * @param {number} rgba - RGBA Pixel value 
 * @return {array} An array of red, green, blue, and alpha uint8 components
 */
const fromRGBA = (rgba) => [(rgba >> 24) & 0xff, (rgba >> 16) & 0xff, (rgba >> 8) & 0xff, rgba & 0xff];

const toRGBA = (r,g,b,a) => ( r << 24) | (g << 16) | (b << 8) | a;

// TODO
const fromABGR = (abgr) => ( abgr << 24) | (abgr << 16) | (abgr << 8) | abgr;

/**
 * Compute ABGR pixel value from four uint8 red, green, blue, and alpha components 
 * @param {number} red - uint8 red component 
 * @param {number} green - uint8 green component 
 * @param {number} blue - uint8 blue component 
 * @param {number} alpha - uint8 alpha component 
 * @return {number} ABGR Pixel value 
 */
const toABGR = (r,g,b,a) => ( a << 24) | (b << 16) | (g << 8) | r;

// TODO
const toabgr = (rgba) => ( (rgba & 0xff) << 24) | ( (rgba & 0x00ff00) << 8) | ( (rgba & 0xff0000) >> 8) | ( (rgba & 0xff000000) >> 24);

/**
 * Extract red component of RGBA pixel value
 * @param {number} rgba - RGBA Pixel value 
 * @return {number} uint8 value 
 */
const red = (rgba) => rgba >> 24 & 0xff;

/**
 * Extract green component of RGBA pixel value
 * @param {number} rgba - RGBA Pixel value 
 * @return {number} uint8 value 
 */
const green = (rgba) => rgba >> 16 & 0xff;

/**
 * Extract blue component of RGBA pixel value
 * @param {number} rgba - RGBA Pixel value 
 * @return {number} uint8 value 
 */
const blue = (rgba) => rgba >> 8 & 0xff;

/**
 * Extract alpha (transparency) component of RGBA pixel value
 * @param {number} rgba - RGBA Pixel value 
 * @return {number} - uint8 value 
 */
const alpha = (rgba) => rgba & 0xff;

/**
 * Compute Luminance gray value from RGBA pixel value
 * @param {number} rgba - RGBA Pixel value 
 * @return {number} Luminance uint8 value 
 */
const luminance = (rgba) => {
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
  
  let r = red(rgba);
  let g = green(rgba);
  let b = blue(rgba);
  return (r+r+r+b+g+g+g+g)>>3; 
};

/**
 * Extract chrominance red component of RGBA pixel value according to the YUV colorspace
 * @param {number} rgba - RGBA Pixel value 
 * @return {number} - uint8 value 
 */
const chrominanceRed = (rgba) => -0.168736 * red(rgba) - 0.331264 * green(rgba) + 0.500000 * blue(rgba) + 128;

/**
 * Extract chrominance blue component of RGBA pixel value according to the YUV colorspace
 * @param {number} rgba - RGBA Pixel value 
 * @return {number} - uint8 value 
 */
const chrominanceBlue = (rgba) => 0.500000 * red(rgba) - 0.418688 * green(rgba) - 0.081312 * blue(rgba) + 128;

/**
 * Convert RGBA pixel value to Average gray value
 * @param {number} rgba - RGBA Pixel value 
 * @return {number} uint8 value
 */
const average = (rgba) => Math.floor(red(rgba) + green(rgba) + blue(rgba) / 3.0);

/**
 * Extract hue component of RGBA pixel value according to HSV colorspace
 * @param {number} rgba - RGBA Pixel value 
 * @return {number} - uint8 value 
 */
const hue = (rgba) => {
  const ratio = (a,b,delta) => (a-b)/delta;
  
  let r = T.red(rgba) / 255.0, g = T.green(rgba) / 255.0, b = T.blue(rgba) / 255.0;
  let maxi = Math.max(r,Math.max(g,b));
  let mini = Math.min(r,Math.min(g,b));
  let delta = maxi - mini;
  let out = (maxi === 0 || mini === maxi) ? 0 :
    ( (maxi === r) ? (60 * ratio(g,b,delta) + 0) % 360 : 
      ( (maxi === g) ? 60 * ratio(b,r,delta) + 120 : 60 * ratio(r,g,delta) + 240 ) ); 
  return clampUint8(Math.floor(out / 360.0 * 255));
};

const hue2 = (rgba) => {
  let r = T.red(rgba), g = T.green(rgba), b = T.blue(rgba);
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
 * Extract saturation component of RGBA pixel value  according to HSV colorspace
 * @param {number} rgba - RGBA Pixel value 
 * @return {number} - uint8 value 
 */
const saturation = (rgba) => {
  let r = T.red(rgba), b = T.blue(rgba), g = T.green(rgba);
  let maxi = Math.max(r,Math.max(g,b));
  let mini = Math.min(r,Math.min(g,b));
  return (maxi === 0) ? 0 : (1.0 - mini/maxi) * 255;
};

/**
 * Extract `value` component of RGBA pixel value according to HSV colorspace
 * @param {number} rgba - RGBA Pixel value 
 * @return {number} - uint8 value 
 */
const value = (rgba) => Math.max(T.red(rgba),Math.max(T.green(rgba), T.blue(rgba)));


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
 * @param {Raster} color_img - A RGBA color image
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return crop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fillColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fill; });
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

'use script';

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
  output.pixelData = [...pixels];
  return output;
}
  
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
  * Fill raster with specific patterns
  *
  * @param {string} keyword - Pattern among: black, white, ramp, chessboard, noise
  * @param {Raster} raster - Input Raster
  * @param {boolean} copy_mode - Useless, here. Only for compatibility with other process functions
  *
  * @author Jean-Christophe Taveau
  */
const fillPattern = (keyword) => (raster,copy_mode=true) => {
  // TODO
}
  
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
  let cx = h / 2.0;
  let cy = h / 2.0;
  
  raster.pixelData.forEach ( (px,i,arr) => {
    let x = i % w;
    let y = Math.floor(i / w);
    let z = Math.floor( i / w / h);
    let d = Math.sqrt ((x-cx)**2 + (y -cy)**2);
    let a = Math.atan2(y,x);
    raster.pixelData[i] = func(px,i,x,y,z,w,h,a,d);
  });
  return raster;
};
  

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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return calc; });
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
const calc = (func) => (raster,copy_mode=true) => {
  let output = T.Raster.from(raster,copy_mode);
  let w = output.width;
  let h = output.height;
  let cx = h / 2.0;
  let cy = h / 2.0;
  
  output.pixelData.forEach ( (px,i,arr) => {
    let x = i % w;
    let y = Math.floor(i / w);
    let z = Math.floor( i / w / h);
    let d = Math.sqrt ((x-cx)**2 + (y -cy)**2);
    let a = Math.atan2(y,x);
    output.pixelData[i] = func(px,i,x,y,z,w,h,a,d);
  });
  return output;
};

/**
 * Add a constant value to all the raster pixels
 * 
 * @param {number} v - Constant value
 * @param {Raster} img - Input image
 * @param {boolean} copy_mode - Useless here, only for compatibility with the other processing functions
 * @return {object} - Returns an object containing min, max, mean, variance
 *
 * @author Jean-Christophe Taveau
 */
const addK = (v) => (img, copy_mode = true) => {
  let output = T.Raster.from(img,copy_mode);
  output.pixelData.forEach( (px) => px + v);
};


// EXport




/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return saltAndPepper; });
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




/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return renderUint8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return renderRGBA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render2D; });
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
  buf32.forEach( (px,i,arr) => arr[i] = T.toABGR(img8bit.pixelData[i],img8bit.pixelData[i],img8bit.pixelData[i],255) );

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
const renderRGBA = (win) => (img,copy=true) => {
  // Tutorial: https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
  let imgdata = win.ctx.createImageData(img.width, img.height);

  // New RGBA image buffer
  let buf = new ArrayBuffer(img.width * img.height * 4);
  let buf32 = new Uint32Array(buf);
  let buf8 = new Uint8Array(buf);
  // Fill with ABGR color values
  buf32.forEach( (px,i,arr) => arr[i] = T.toABGR(T.red(img.pixelData[i]),T.green(img.pixelData[i]),T.blue(img.pixelData[i]),T.alpha(img.pixelData[i]) ) );

  imgdata.data.set(buf8);
  win.ctx.putImageData(imgdata, 0, 0);
};

const render2D = (win) => (img,copy=true) => {
  console.log(win);
  switch (img.raster.type) {
  case 'uint8':
    T.renderUint8(win)(img.raster);
    break;
  case 'rgba':
    T.renderRGBA(win)(img.raster);
    break;
  }
};

// Exports
 



/***/ }),
/* 13 */
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
 



/***/ })
/******/ ]);