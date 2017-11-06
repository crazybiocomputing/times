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
class TImage {
  constructor(type,width,height,offset=0) {
    const typelist = {uint8: 'Uint8ClampedArray', uint16: 'Uint16Array', uint32: 'Uint32Array', float32: 'Float32Array', rgba: 'Uint32Array', };
    
    this.width = width;
    this.height = height;
    this.offset = offset;
    this.length = this.width * this.height;
    
    // uint8, uint16, uint32, float32,rgba
    this.type = type;
    // 
    this.pixelData; // createPixels(this.type);
  
  }
  
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
    let img = new TImage(win.metadata.type,win.metadata.width,win.metadata.height);
    img.pixelData (copy === true) ? [...win.raster.pixelData] : win.raster.pixelData; // Copy pixels
    img.setWindow(win);
    return img;
  }
  
  static from(other, copy = true) {
    let img = new TImage(other.type,other.width, other.height);
    img.pixelData = (copy === true) ? [...other.pixelData] : other.pixelData; // Copy pixels
    return img;
  }
  
  fill(value) {
    this.pixelData.fill(value);
  }
  
  fillPattern(pattern) {
    if (this.pixelData === undefined) {
      this.pixelData = TImage.createPixels(this.type,this.length);
      console.log(`Create pixels of ${this.type}`);
    }
    if (pattern.toLowerCase() === 'black') {
      this.pixelData.fill(TImage.MIN_VALUE(this.type));
    }
    else if (pattern.toLowerCase() === 'white') {
      this.pixelData.fill(TImage.MAX_VALUE(this.type));
    }
    else if (pattern.toLowerCase() === 'ramp') {
      this.pixelData.map(x => TImage.MAX_VALUE()/ this.width * (i % this.width));
    }
  }
  /**
   * compose(func1, func2, func3, ..., funcn)
   * From https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d
   *
   * Ex: compose(func1,func2) returns func1(func2(x))
   *
   * @author: Eric Elliott
   */
  compose (...fns) {
    return x => fns.reduceRight((v, f) => f(v), x);
  }

  /**
   * pipe(func1, func2, func3, ..., funcn)
   * From https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d
   *
   * Ex: pipe(func1,func2) returns func2(func1(x))
   *
   * @author: Eric Elliott
   */
  pipe (...fns) {
    console.log('pipe');
    return fns.reduce((v, f) => f(v,false), this);
  }
  
  setPixels(data) {
    this.pixelData = data;
  }
  
  setWindow(win) {
    this.window = win;
  }
}
