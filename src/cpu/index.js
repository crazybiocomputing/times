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
import {clamp,clampUint8,degrees,getX, getY, getIndex, pipe,radians} from './process/utils';

/* Process/color */
import {red,blue,green,alpha,luminance, chrominanceRed, chrominanceBlue,hue, saturation, value,splitChannels, toRGBA} from './process/color';

/* Process/geometry */
import {crop} from './process/geometry';

/* Process/edgeDetect */
import {canny,laplacian3x3,laplacian5x5,sobel3x3} from './process/edgeDetect';

/* Process/filters */
import {
  KERNEL_RECTANGLE, KERNEL_CROSS, KERNEL_DIAMOND,KERNEL_CIRCLE,KERNEL_SQUARE,
  BORDER_CLAMP_TO_EDGE, BORDER_CLAMP_TO_BORDER, BORDER_REPEAT,BORDER_MIRROR,
  convolve,convolutionKernel,mean,meanKernel} from './process/filters';

/* Process/hough */
import {findMaxima,getHoughLines,houghLines,houghCircles} from './process/hough';

/* Process/math */
import {black,calc,chessboard,fillColor,fill,math,ramp,spiral,white} from './process/math';

/* Process/noise */
import {noise,saltAndPepper} from './process/noise';

/* Process/rankFilters */
import {medianFilter,maximumFilter, minimumFilter, varianceFilter} from './process/rankFilters';

//* Process/statistics */
import {histogram,statistics} from './process/statistics';

//* Process/type */
import {otsu,threshold} from './process/threshold';

//* Process/type */
import {fromABGRtoUint8, toUint8} from './process/type';

/* Render/view */
import {montage,view} from './render/view';

/* Render */
import {renderUint8,renderUint16,renderFloat32,renderABGR,renderRGBA,render2D} from './render/render2D';
import {renderVector} from './render/renderVector';


export {
  clamp,clampUint8,degrees,getX, getY, getIndex,pipe,radians,
  red,blue,green,alpha,luminance, chrominanceRed, chrominanceBlue, hue, saturation, value,
  splitChannels,toGray8,toRGBA,
  crop,
  canny,laplacian3x3,laplacian5x5,sobel3x3,
  KERNEL_RECTANGLE, KERNEL_CROSS, KERNEL_DIAMOND,KERNEL_CIRCLE,KERNEL_SQUARE,
  BORDER_CLAMP_TO_EDGE, BORDER_CLAMP_TO_BORDER, BORDER_REPEAT,BORDER_MIRROR,
  houghLines, houghCircles,
  convolve,convolutionKernel,mean,meanKernel,
  black,calc,chessboard,fillColor,fill,math,ramp,spiral,white,
  noise,saltAndPepper,
  medianFilter,maximumFilter, minimumFilter, varianceFilter,
  histogram,statistics,
  otsu,threshold,
  fromABGRtoUint8,toUint8,
  montage,view,
  renderUint8,renderUint16,renderFloat32,renderABGR,renderRGBA,render2D,
  renderVector
};

