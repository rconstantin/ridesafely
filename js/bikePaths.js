'use strict';

import Colors from './colors';

var pathList = [];

function createPath(pId, src, dst) {

  pathList[pId] = new THREE.Path();
  pathList[pId].moveTo(src.x, src.y);
  for (let i = 0; i < dst.length; i++) {
    pathList[pId].lineTo(dst[i].x, dst[i].y);
    // pathList[pId].quadraticCurveTo( dst[i].x-1, dst[i].y-1, dst[i].x, dst[i].y );
  }
  let line = new THREE.Line();
  line = drawPath(pId);
  return line;
}

function createPaths() {  

  // the pathList
  let destP = [], src;
  let lines = [];
  
  // P1 with 0 based indices
  
  src = new THREE.Vector3(-250,-240,0);
  destP[0] = new THREE.Vector3(-160,-240,0);
  destP[1] = new THREE.Vector3(-160,-185,0); 
  lines[0] = new THREE.Line();
  lines[0] = createPath(0, src, destP);

  // P2 with 0 based indices
  destP  = []; // reset destP array
  src = new THREE.Vector3(-160,-185,0);
  destP[0] = new THREE.Vector3(-160,35,0);
  lines[1] = new THREE.Line();
  lines[1] = createPath(1, src, destP);
  
  // P3
  src = new THREE.Vector3(-160,35,0);
  destP[0] = new THREE.Vector3(-160,185,0);
  destP[1] = new THREE.Vector3(250,185,0); 
  // 0 based indices
  lines[2] = new THREE.Line();
  lines[2] = createPath(2, src, destP);
 
  // P4
  destP  = []; // reset destP array
  src = new THREE.Vector3(-160,-185,0);
  destP[0] = new THREE.Vector3(-135,-185,0);
  // 0 based indices
  lines[3] = new THREE.Line();
  lines[3] = createPath(3, src, destP);
  
  // P5
  destP  = []; // reset destP array
  src = new THREE.Vector3(-160,35,0);
  destP[0] = new THREE.Vector3(-40,35,0);
  // 0 based indices
  lines[4] = new THREE.Line();
  lines[4] = createPath(4, src, destP);

  // P6
  destP  = []; // reset destP array
  src = new THREE.Vector3(-135,-185,0);
  destP[0] = new THREE.Vector3(-80,-150,0);
  destP[1] = new THREE.Vector3(-40,-185,0); 
  // 0 based indices
  lines[5] = new THREE.Line();
  lines[5] = createPath(5, src, destP);

  // P7
  destP  = []; // reset destP array
  src = new THREE.Vector3(-135,-185,0);
  destP[0] = new THREE.Vector3(-80,-170,0);
  destP[1] = new THREE.Vector3(-40,-185,0); 
  // 0 based indices
  lines[6] = new THREE.Line();
  lines[6] = createPath(6, src, destP);

  // P8
  destP  = []; // reset destP array
  src = new THREE.Vector3(-40,-185,0);
  destP[0] = new THREE.Vector3(110,-185,0);
  // 0 based indices
  lines[7] = new THREE.Line();
  lines[7] = createPath(7, src, destP);

  // P9
  destP  = []; // reset destP array
  src = new THREE.Vector3(-40,-185,0);
  destP[0] = new THREE.Vector3(-40,35,0); // 35 instead of 10 to reach DP5
  // 0 based indices
  lines[8] = new THREE.Line();
  lines[8] = createPath(8, src, destP);

  // P10
  destP  = []; // reset destP array
  src = new THREE.Vector3(-40,35,0);
  destP[0] = new THREE.Vector3(-10,35,0);
  destP[1] = new THREE.Vector3(-10,185,0);
  destP[2] = new THREE.Vector3(250,185,0); 
  // 0 based indices
  lines[9] = new THREE.Line();
  lines[9] = createPath(9, src, destP);
  
  // P11
  destP  = []; // reset destP array
  src = new THREE.Vector3(-40,35,0);
  destP[0] = new THREE.Vector3(110,35,0);
  // 0 based indices
  lines[10] = new THREE.Line();
  lines[10] = createPath(10, src, destP);

  // P12
  destP  = []; // reset destP array
  src = new THREE.Vector3(110,35,0);
  destP[0] = new THREE.Vector3(110,185,0);
  destP[1] = new THREE.Vector3(250,185,0); 
  // 0 based indices
  lines[11] = new THREE.Line();
  lines[11] = createPath(11, src, destP);

  // P13
  destP  = []; // reset destP array
  src = new THREE.Vector3(110,35,0);
  destP[0] = new THREE.Vector3(185,35,0);
  destP[1] = new THREE.Vector3(185,185,0); 
  destP[2] = new THREE.Vector3(250,185,0); 
  // 0 based indices
  lines[12] = new THREE.Line();
  lines[12] = createPath(12, src, destP);

  // P14
  destP  = []; // reset destP array
  src = new THREE.Vector3(110,-185,0);
  destP[0] = new THREE.Vector3(110,35,0);
  destP[1] = new THREE.Vector3(110,185,0); 
  destP[2] = new THREE.Vector3(250,185,0); 
  // 0 based indices
  lines[13] = new THREE.Line();
  lines[13] = createPath(13, src, destP);

  // P15
  destP  = []; // reset destP array
  src = new THREE.Vector3(110,-185,0);
  destP[0] = new THREE.Vector3(185,-185,0);
  destP[1] = new THREE.Vector3(185,185,0); 
  destP[2] = new THREE.Vector3(250,185,0); 
  // 0 based indices
  lines[14] = new THREE.Line();
  lines[14] = createPath(14, src, destP);
  
  return lines;
}


function drawPath( segment ) {
  let vertices = pathList[segment].getSpacedPoints(20);

  // Change 2D points to 3D points
  for (let i = 0; i < vertices.length; i++) {
    let point = vertices[i];
    vertices[i] = new THREE.Vector3(point.x, point.y, 0);
  }
  let lineGeometry = new THREE.Geometry();
  lineGeometry.vertices = vertices;
  let lineMaterial = new THREE.LineDashedMaterial({ linewidth: 1, color: Colors.red, dashSize: 3, gapSize: 3 });
 
  // let lineMaterial = new THREE.LineBasicMaterial({
  //   color: Colors.red
  // });
  let line = new THREE.Line(lineGeometry, lineMaterial);
  // Move this to calling function and back to scene3D
  //scene.add(line);
  // Start angle and point
  // previousAngle = getAngle( segment, position );
  // previousPoint = pathList[segment].getPoint( position );

  return line;

}

export {createPaths, pathList};
