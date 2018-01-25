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
 * This program is distributed in the hope that it will be useful,
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
 * @module rankFilters
 */
 
 
// Helper Function

// Compute Integral Image ?
const integral = (data) => {
    return data.reduce((sum,px,i,arr) => {
        let x = i % w;
        sum[x] += px;
        arr[i] = sum[x] + ((x == 0 ) ? 0.0 : arr[i-1]);
        return sum;
    },new Float32Array(w).fill(0.0));   
}

/**
 * Minimum filter
 *
 * @param {TRaster} kernel - Convolution mask
 * @param {TRaster} img - Input image to process
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - Filtered Image
 *
 * @author TODO
 */
const minimum = (kernel) => (img,copy=true) => {
  let ouput =  TRaster.from(img,copy);
  // TODO
  return output;
}


/**
 * Variance filter :  It will first compute the summed area table of 
 * all the pixels wihtin the first img and after compute the summed squared area 
 * table of all the pixels within the img2.
 * After this process the two img are then padded with 0 according to
 * the dimension of the convolution mask. 
 * Finally an algorithm based on Integral Image is applied to compute 
 * the variance.
 *
 * @param {TRaster} kernel - Convolution mask represented here by a default value = 2
   with this algorithm the kernel doesn't have to be squared.
 * @param {TRaster} img - Input image to process 
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - Filtered Image
 *
 * @author Franck Soubès - Jean-Christophe Taveau 
 */
const varianceFast = (kernel, wrap = cpu.BORDER_CLAMP_TO_BORDER) => (img,copy_mode = true) => {

  let output = T.Raster.from(img,copy_mode);
  let w= img.width;
  let h = img.height;
  let wk = kernel.width;
    let img2 = new T.Image(img.type,w,h);
    let squared = img.pixelData.map((x) => x * x );
    img2.setPixels(squared);
    let imgsqr= T.Raster.from(img2.raster,copy_mode);

     /*
     	Integral Image proposed by JC.Taveau
     */

    


    
    img2.raster.pixelData.reduce((sum1,px,i) => {
	let x = i%w;
	sum1[x] += px;
	img2.raster.pixelData[i] = sum1[x] + ((x == 0 ) ? 0.0 : img2.raster.pixelData[i-1])
	return sum1;},new Float32Array(w).fill(0.0));
    

    /*
    // another method not totally functionnal but way more faster with the use of forEach however it dsnt seem faster than the reduce
    let sum = 0;
     let arr= Array.from(Array(w), () => NaN);
    let width = arr.map((i,x) => x);
    let arr1 = Array.from(Array(h), () => NaN);
    let height = arr1.map((j,y)=>y);
    
    let firstintegral = width.forEach(x =>{
	sum = 0;
	height.forEach(y =>{
	    sum += pixels[x + y*w];
	    (x==0) ? img.pixelData[x+y*w] = sum:img.pixelData[x+y*w] = img.pixelData[(x-1)+y*w] + sum;
	});
    });

    let firstintegral2 = width.forEach(x =>{
	sum = 0;
	height.forEach(y =>{
	    sum += pixels[x + y*w];
	    (x==0) ? img2.raster.pixelData[x+y*w] = sum:img2.raster.pixelData[x+y*w] = img2.raster.pixelData[(x-1)+y*w] + sum;
	});
    });
   */
    
    getvar(padding(output,wk,w,h,false,true),padding(img2,wk,w,h,true,true),img.type,w,h,wk, true); 
 
    return output;
}

/**
 * Padding : Fill with 0 an image in function of the kernel radius.
 *
 * @param {TRaster} img - Input image to process.
 * @param {TRaster} k - Convolution mask represented by a single value (width*height).
 * @param {TRaster} w - width of the image.
 * @param {TRaster} h - height of the image.
 * @param {boolean} flag - if true it will take the raster from the img and the pixelData from the raster
 * if it is false just the pixelData from the raster.
 * @param {boolean} copy - Copy mode to manage memory usage
 * @return {TRaster} - Padded image with 0 and with computed coordinates.
 * 
 * @author Franck Soubès
 */
const padding = function(img,k,w,h,flag,copy_mode = true) {
    
    let ima ;
    if (flag){
	
	ima = img.getRaster();
	ima = ima.pixelData;
    }
    else{
	ima = img.pixelData;
    }

    let new_img = [];
    while(ima.length) new_img.push(ima.splice(0,w));
    let ker = ((k-1)/2) *2;
    let extremity = new Array(ker).fill(0);
    let leftrightpad = new_img => (extremity).concat(new_img).concat(extremity);
    let lenpad = new_img => Array.from(Array(new_img.length), () => 0);
    let updownpad = new_img => [lenpad(new_img[0])].concat(new_img).concat([lenpad(new_img[0])]);
    let balancedpad = new_img  => new_img.map(new_img => leftrightpad(new_img));
    let imagepadded = new_img => balancedpad(updownpad(new_img));
    let returned_image = imagepadded(new_img);
    
    for (let i =0 ; i<ker;i++ ){
	returned_image.push(returned_image[0]);
	returned_image.unshift(returned_image[0]);
    }
      
    img.pixelData = Getcoord(returned_image,w,h,k);
    return img;
}

/**
 * Getcoord : Compute the four coordinates of the main algorithm and treat the edges.
 *
 * @param {Array} img -  Convolution mask represented by a single value
 * width*height of the kernel.
 * @param {hight} w - height of the image.
 * @param {width} h - width of the image.
 * @param {kernel} k - Convolution mask represented by a single value.
 * @return {Array} - return an array of pixel wih computed pixels.
 *
 * @author Franck Soubès
 */
const Getcoord = function (img ,w,h,k,copy_mode=false){
  let img_returned =[];
    
for (let x = k-1  ;  x <= h + (k-2) ; x++){
    for(  let y = k-1  ; y <= w+(k-2) ; y++){
        
        // push black pixel for abberant coordinnates that'll falsify the results
        img[x-1][y-1] == 0 && img[x+k-1][y-1] == 0 ||// left
        img[x+k-1][y+k-1] == 0 && img[x+k-1][y-1]== 0 && img[x+k-1][y+k-1] == 0 || // down
        img[x-1][y-1] == 0 && img[x-1][y+k-1] == 0 ||// up
        img[x+k-1][y+k-1] == 0 && img[x-1][y+k-1] == 0 // right
        ? img_returned.push(0): img_returned.push(img[x-1][y-1]-img[x+k-1][y-1]-img[x-1][y+k-1]+img[x+k-1][y+k-1]);

    }
}
return img_returned; // 1d
}

/**
 * Variance filter : simply apply the variance formula. 
 *
 * @param {TRaster} img1 - Input image to process.
 * @param {TRaster} img2 - Input image to process.
 * @param {TRaster} w - width of the image.
 * @param {TRaster} h - height of the image.
 * @param {TRaster} type - Return the type of the raster (uint8, uint16, float32  or argb).
 * @param {TRaster} kernel -  Convolution mask represented by a single value
 * width*height of the kernel.
 * @return {TRaster} - return an array with computed variance.
 *
 * @author Franck Soubès
 * @author Jean-Christophe Taveau -Bug Fix
 */
const varianceFilter = (kernel, wrap = cpu.BORDER_CLAMP_TO_BORDER) => (raster,copy_mode = true) => {

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
    // BUG
    let xx = Math.trunc(x / width) * 2 * (width  - 1)  - x;
    let yy = Math.trunc(y / height) * 2 * (height  - 1)  - y;
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
    let [sum, sum2] =  kernel.reduce( (sum,v) => {
      // Get pixel value in kernel
      let pix = border(
        pixels,
        cpu.getX(index,width) + v.offsetX, 
        cpu.getY(index,width) + v.offsetY,
        width,height);
      // Sum
      sum[0] += pix;
      sum[1] += pix * pix;
      // Square Sum
      return sum;
    },[0.0,0.0]);
    return (sum2 - (sum * sum)/kernel.length)/(kernel.length - 1);
  });

  // Normalize image?
  cpu.statistics(output);
  console.log(output.statistics);
  return output;
}


export {varianceFilter};



