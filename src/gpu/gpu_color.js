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
 * Invert colors
 *
 * @author Jean-Christophe Taveau
 */
 
const invert = (raster,graphContext, copy_mode = true) => {

  let id='invert';
  
  let src_vs = `#version 300 es

  in vec2 a_vertex;
  in vec2 a_texCoord;
  
  uniform vec2 u_resolution;
  
  out vec2 v_texCoord;
  
  void main() {
    v_texCoord = a_texCoord;
    vec2 clipSpace = a_vertex * u_resolution * 2.0 - 1.0;
    gl_Position = vec4( clipSpace * vec2(1,-1), 0.0, 1.0);
  }`;

  const getFragmentSource = (samplerType,outVec) => {
    return `#version 300 es
    #pragma debug(on)

    precision mediump usampler2D;
    precision mediump float;
    
    in vec2 v_texCoord;
    const float maxUint16 = 65535.0;
    uniform ${samplerType} u_image;
    out vec4 outColor;
    
    void main() {
      outColor = vec4(${outVec}, 1.0); 
    }`;
  }
  

  // Step #1: Create - compile + link - shader program
  // Set up fragment shader source depending of raster type (uint8, uint16, float32,rgba)
  let samplerType = (raster.type === 'uint16') ? 'usampler2D' : 'sampler2D';
  let outColor;
  switch (raster.type) {
    case 'uint8': 
    case 'rgba' : outColor = `1.0 - texture(u_image, v_texCoord).rgb`; break; 
    case 'uint16': outColor = `vec3(1.0 - float(texture(u_image, v_texCoord).r) / maxUint16 )`; break; 
    case 'float32': outColor = `vec3(1.0 - texture(u_image, v_texCoord).r)`; break; 
  }

  let the_shader = gpu.createProgram(graphContext,src_vs,getFragmentSource(samplerType,outColor));

  console.log('programs done...');
    
  // Step #2: Create a gpu.Processor, and define geometry, attributes, texture, VAO, .., and run
  let gproc = gpu.createGPU(graphContext)
    .size(raster.width,raster.height)
    .geometry(gpu.rectangle(raster.width,raster.height))
    .attribute('a_vertex',2,'float', 16,0)      // X, Y
    .attribute('a_texCoord',2, 'float', 16, 8)  // S, T
    .texture(raster,0)
    .packWith(the_shader) // VAO
    .clearCanvas([0.0,1.0,1.0,1.0])
    .preprocess()
    .uniform('u_resolution',new Float32Array([1.0/raster.width,1.0/raster.height]))
    .uniform('u_image',0)
    .run();

  return raster;
}

export {invert};



