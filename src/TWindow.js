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

class TWindow {
  constructor(title,type,width,height,depth,pattern="Black",dimension=2) {
    this.title = title;
    this.width = width;
    this.height = height;
    this.metadata = {
      title : title,
      type: type,
      width : width,
      height : height,
      depth : depth,
      fill : pattern,
    };
    // Data content: image = 2; stack = 2.5; volume = 3; volume+t = 4??.
    this.metadata.dimension = (dimension === 1 && depth > 1) ? 2.5 : dimension;
    switch (this.metadata.dimension) {
      case 2  : 
        this.raster = new TImage(type, this.width, this.height);  
        break;
      case 2.5: 
        this.raster = new TStack(type,this.width,this.height,this.depth);
        break;
      case 3  : this.raster = new TVolume(type,this.width,this.height,this.depth); break;
      default:
        // ERROR...
    }
    this.raster.fillPattern(pattern);
    this.raster.setWindow(this);
  }

  getImage() {
    return (this.metadata.dimension === 2) ? this.raster : undefined;
  }


  getStack() {
    return (this.metadata.dimension === 2.5) ? this.raster : undefined;
  }


  getVolume () {
    return (this.metadata.dimension === 3) ? this.raster :  undefined;
  }

}
