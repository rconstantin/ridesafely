/*
  Add a left hand cartesian system with RED x-axis, GREEN y-axis and BLUE z-axis
*/

'use strict';

// let THREE =  require('three');

// alternative syntax from es6
// import * as THREE from 'three';
// const scene = new THREE.Scene();

function build3dAxes(length) {
	length = length || 200; // 200 default if length not provided
	let  axes3d = new THREE.Object3D();
	// build solid lines for positive axes and dashed for neg
	axes3d.add( setupAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X red
	axes3d.add( setupAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X red dashed
	axes3d.add( setupAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y green
	axes3d.add( setupAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y green dashed
	axes3d.add( setupAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z blue
	axes3d.add( setupAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z blue dashed

  return axes3d;
}


function setupAxis( src, dst, colorHex, dashed ) {
  let geometry = new THREE.Geometry(),
    material;

  if(dashed) {
    material = new THREE.LineDashedMaterial({ color: colorHex, dashSize: 3, gapSize: 3 });
  } else {
    material = new THREE.LineBasicMaterial({ color: colorHex });
  }

  geometry.vertices.push( src.clone() );
  geometry.vertices.push( dst.clone() );
  // geometry.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

  let axis = new THREE.Line( geometry, material, THREE.LineSegments );
  axis.computeLineDistances();
  return axis;
}

export default build3dAxes;