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
 * From http://jsfiddle.net/ondras/hYfN3/
 * @author Ondřej Žára
 */
const renderTable = (win) => (csv,copy=true) => {
    let table = win.element;
    let rows = csv.split('\n');
    console.log('renderTable');
    // Fill in the table
    for (let i=0; i< rows.length; i++) {
        let row = table.insertRow(-1);
        let cells = row.split(',');
        for (let j=0; j< cells.length; j++) {
            let letter = String.fromCharCode("A".charCodeAt(0)+j-1);
            row.insertCell(-1).innerHTML = i&&j ? "<input id='"+ letter+i +"'/>" : i||letter;
        }
    }
    
    // Add events
/*
    var DATA={}, INPUTS=[].slice.call(document.querySelectorAll("input"));
    INPUTS.forEach(function(elm) {
        elm.onfocus = function(e) {
            e.target.value = localStorage[e.target.id] || "";
        };
        elm.onblur = function(e) {
            localStorage[e.target.id] = e.target.value;
            computeAll();
        };
        var getter = function() {
            var value = localStorage[elm.id] || "";
            if (value.charAt(0) == "=") {
                with (DATA) return eval(value.substring(1));
            } else { return isNaN(parseFloat(value)) ? value : parseFloat(value); }
        };
        Object.defineProperty(DATA, elm.id, {get:getter});
        Object.defineProperty(DATA, elm.id.toLowerCase(), {get:getter});
    });
    (window.computeAll = function() {
        INPUTS.forEach(function(elm) { try { elm.value = DATA[elm.id]; } catch(e) {} });
    })();
*/
};

// Exports
export {renderTable}; 

