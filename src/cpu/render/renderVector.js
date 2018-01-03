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
export {renderVector}; 

