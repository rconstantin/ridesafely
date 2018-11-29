'use strict';

import Colors from './colors';


let pathList = [], decisionPoint = [];

let CarSegments = {
  redCar: 31,
  blueCar: 32
};

let PedSegments = {
  boy1: 41,
  robot1: 42
};

let DP = {
  DP1: 0,
  DP2: 1,
  DP3: 2,
  DP4: 3,
  DP5: 4,
  DP6: 5,
  DP7: 6,
  DP8: 7,
  DP9: 8,
  DP10: 9,
  DP11: 10,
  DP12: 11,
  DP13: 12
}


function createDecisionPoints() {
  decisionPoint[DP.DP1] = new THREE.Vector3(-160, -165, 0); // DP1
  decisionPoint[DP.DP2] = new THREE.Vector3(-160, 25, 0);   // DP2
  decisionPoint[DP.DP3] = new THREE.Vector3(-120, -165,0);  // DP3
  decisionPoint[DP.DP4] = new THREE.Vector3(-55,-165,0);    // DP4
  decisionPoint[DP.DP5] = new THREE.Vector3(-40,25,0);      // DP5
  decisionPoint[DP.DP6] = new THREE.Vector3(100,-165,0);    // DP6
  decisionPoint[DP.DP7] = new THREE.Vector3(100,25,0);      // DP7
  decisionPoint[DP.DP8] = new THREE.Vector3(-40,25,0);      // DP8
  decisionPoint[DP.DP9] = new THREE.Vector3(-160,178,0);    // DP9
  decisionPoint[DP.DP10] = new THREE.Vector3(-10, 240, 0);   // DP10
  decisionPoint[DP.DP11] = new THREE.Vector3(-5, 178, 0);   // DP11
  decisionPoint[DP.DP12] = new THREE.Vector3(150, -10, 0);  // DP12
  decisionPoint[DP.DP13] = new THREE.Vector3(-55, 178, 0);  // DP13
  
}

function getDP(dp) 
{
  // DP is 1 based: range DP1 tp DP12
  if (dp>= 1 && dp<=DP.DP13) {
    return decisionPoint[dp-1];
  }
  return null;
}


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
  let counter = 0;
  
  createDecisionPoints();

  // P1 with 0 based indices
  
  src = new THREE.Vector3(-155,-240,0);
  destP[0] = new THREE.Vector3(-155,-170,0); 
  lines[counter] = new THREE.Line();
  lines[counter] = createPath(0, src, destP);

  // P2 with 0 based indices
  destP  = []; // reset destP array
  src = new THREE.Vector3(-155,-170,0);
  destP[0] = new THREE.Vector3(-155,25,0);
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(1, src, destP);
  
  // P3 starts at DP2 and goes to DP9
  src = new THREE.Vector3(-155,25,0);
  destP[0] = new THREE.Vector3(-155,178,0);

  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(2, src, destP);
 
  // P4 DP1 to DP3
  destP  = []; // reset destP array
  src = new THREE.Vector3(-155,-170,0);
  destP[0] = new THREE.Vector3(-120,-170,0);
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(3, src, destP);
  
  // P5
  destP  = []; // reset destP array
  src = new THREE.Vector3(-155,25,0);
  destP[0] = new THREE.Vector3(-150,25,0);
  destP[1] = new THREE.Vector3(-150,40,0);
  destP[2] = new THREE.Vector3(-55,40,0);
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(4, src, destP);

  // P6 from DP3 to DP4
  destP  = []; // reset destP array
  src = new THREE.Vector3(-120,-170,0);
  destP[0] = new THREE.Vector3(-110,-160,0);
  destP[1] = new THREE.Vector3(-55,-170,0); 
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(5, src, destP);

  // P7 from DP3 to DP4
  destP  = []; // reset destP array
  src = new THREE.Vector3(-120,-170,0);
  // destP[0] = new THREE.Vector3(-80,-170,0);
  destP[0] = new THREE.Vector3(-55,-170,0); 
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(6, src, destP);

  // P8
  destP  = []; // reset destP array
  src = new THREE.Vector3(-55,-170,0);
  destP[0] = new THREE.Vector3(110,-170,0);
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(7, src, destP);

  // P9
  destP  = []; // reset destP array
  src = new THREE.Vector3(-55,-170,0);
  destP[0] = new THREE.Vector3(-30,-170,0); 
  destP[1] = new THREE.Vector3(-30,25,0); 
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(8, src, destP);

  // P10 starts at DP5 continue to DP11
  destP  = []; // reset destP array
  src = new THREE.Vector3(-55,25,0);
  destP[0] = new THREE.Vector3(-45,25,0);
  destP[1] = new THREE.Vector3(-10,25,0);
  destP[2] = new THREE.Vector3(-10,178,0);
  
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(9, src, destP);
  
  // P11
  destP  = []; // reset destP array
  src = new THREE.Vector3(-55,25,0);
  destP[0] = new THREE.Vector3(-45,25,0);
  destP[1] = new THREE.Vector3(110,25,0);
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(10, src, destP);

  // P12
  destP  = []; // reset destP array
  src = new THREE.Vector3(110,25,0);
  destP[0] = new THREE.Vector3(135,25,0);
  destP[1] = new THREE.Vector3(135,185,0);
  destP[2] = new THREE.Vector3(250,185,0); 
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(11, src, destP);

  // P13
  destP  = []; // reset destP array
  src = new THREE.Vector3(110,25,0);
  destP[0] = new THREE.Vector3(150,25,0);
  destP[1] = new THREE.Vector3(150,185,0); 
  destP[2] = new THREE.Vector3(250,185,0); 
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(12, src, destP);

  // P14
  destP  = []; // reset destP array
  src = new THREE.Vector3(100,-170,0);
  destP[0] = new THREE.Vector3(135,-170,0);
  destP[1] = new THREE.Vector3(135,25,0);
  destP[1] = new THREE.Vector3(135,178,0); 
  destP[2] = new THREE.Vector3(250,178,0); 
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(13, src, destP);

  // P15 starts at DP6 to DP12
  destP  = []; // reset destP array
  src = new THREE.Vector3(100,-170,0);
  destP[0] = new THREE.Vector3(150,-170,0);
  destP[1] = new THREE.Vector3(150,-15,0); 
  
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(14, src, destP);

  // P16 - starts at DP9 towards DP13
  destP  = []; // reset destP array
  src = new THREE.Vector3(-160,178,0);
  destP[0] = new THREE.Vector3(-55,178,0);
  
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(15, src, destP);
  
  // P17 - starts at DP9 towards DP10
  destP  = []; // reset destP array
  src = new THREE.Vector3(-160,178,0);
  destP[0] = new THREE.Vector3(-160, 240, 0);
  destP[1] = new THREE.Vector3(-5, 240, 0);
  
  
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(16, src, destP);

  // P18 - starts at DP10 towards endline
  destP  = []; // reset destP array
  src = new THREE.Vector3(-10, 240, 0);
  destP[0] = new THREE.Vector3(250, 240, 0);
  
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(17, src, destP);

  // P19 - starts at DP10 towards endline
  destP  = []; // reset destP array
  src = new THREE.Vector3(-10, 240,0);
  destP[0] = new THREE.Vector3(0, 178, 0);
  destP[1] = new THREE.Vector3(250, 178, 0);
  
  
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(18, src, destP);

   // P20 - starts at DP11 towards endline
  destP  = []; // reset destP array
  src = new THREE.Vector3(-5, 178,0);
  destP[0] = new THREE.Vector3(250, 178, 0);
  
  
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(19, src, destP);

  // P21 - starts at DP11 towards endline
  destP  = []; // reset destP array
  src = new THREE.Vector3(-5, 178, 0);
  destP[0] = new THREE.Vector3(-5, 240, 0);
  destP[1] = new THREE.Vector3(250, 240, 0);

  
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(20, src, destP);

  // P22 - starts at DP12 towards endline
  destP  = []; // reset destP array
  src = new THREE.Vector3(150, -10, 0);
  destP[0] = new THREE.Vector3(150, 178, 0);
  destP[1] = new THREE.Vector3(250, 178, 0);

  
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(21, src, destP);

  // P23 - starts at DP12 towards endline
  destP  = []; // reset destP array
  src = new THREE.Vector3(150, -10, 0);
  destP[0] = new THREE.Vector3(135, -20, 0);
  destP[1] = new THREE.Vector3(135, 178, 0);
  destP[2] = new THREE.Vector3(250, 178, 0);
  
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(22, src, destP);

  // P24 - starts at DP13 towards endline
  destP  = []; // reset destP array
  src = new THREE.Vector3(-55, 178, 0);
  destP[0] = new THREE.Vector3(250, 178, 0);
  
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(23, src, destP);

  // P25 - starts at DP13 towards endline
  destP  = []; // reset destP array
  src = new THREE.Vector3(-55, 178, 0);
  destP[0] = new THREE.Vector3(-55, 240, 0);
  destP[1] = new THREE.Vector3(250, 240, 0);
  
  // 0 based indices
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(24, src, destP);

  // Red Car Path
  // P31 === CarSegments.redCar
  destP = []; // reset destP array
  src = new THREE.Vector3(250,210,0);
  destP[0] = new THREE.Vector3(185, 210, 0);
  destP[1] = new THREE.Vector3(185, -165, 0);
  destP[2] = new THREE.Vector3(115, -165, 0);
  destP[3] = new THREE.Vector3(115, 60, 0);
  destP[4] = new THREE.Vector3(0, 60, 0);
  destP[5] = new THREE.Vector3(-10, 40, 0);
  destP[6] = new THREE.Vector3(-165, 40, 0);
  destP[7] = new THREE.Vector3(-165, 188, 0);
  destP[8] = new THREE.Vector3(-45, 188, 0);
  destP[9] = new THREE.Vector3(-45, 40, 0);
  destP[10] = new THREE.Vector3(125, 40, 0);
  destP[11] = new THREE.Vector3(125, 188, 0);
  destP[12] = new THREE.Vector3(250, 188, 0);
  
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(CarSegments.redCar, src, destP);

  // P32 === CarSegments.blackCar
  destP = []; // reset destP array
  src = new THREE.Vector3(-250,-160,0);
  destP[0] = new THREE.Vector3(128, -160, 0);
  destP[1] = new THREE.Vector3(128, 210, 0);
  destP[2] = new THREE.Vector3(-185, 210, 0);
  destP[3] = new THREE.Vector3(-185, -250, 0);

  
  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(CarSegments.blueCar, src, destP); 


  // Pedestrians on sidewalk1 startinh at P41
  let randPos = Math.random() * 10;
  destP = []; // reset destP array
  src = new THREE.Vector3(160-randPos,-130,0);
  destP[0] = new THREE.Vector3(160-randPos, 170, 0);
  destP[1] = new THREE.Vector3(159-randPos, 170, 0);
  destP[2] = new THREE.Vector3(159-randPos, -130, 0);
  destP[3] = new THREE.Vector3(160-randPos, -130, 0);

  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(PedSegments.boy1, src, destP);  

  destP = []; // reset destP array
  src = new THREE.Vector3(-150, 245-randPos,0);
  destP[0] = new THREE.Vector3(220, 245-randPos, 0);
  destP[1] = new THREE.Vector3(220, 244-randPos, 0);
  destP[2] = new THREE.Vector3(-150, 244-randPos, 0);
  destP[3] = new THREE.Vector3(-150, 245-randPos, 0);

  lines[counter++] = new THREE.Line();
  lines[counter] = createPath(PedSegments.robot1, src, destP);  

  return lines;
}


function drawPath( segment ) {
  let vertices = [], point;
  let mycolor = (segment < 30) ? Colors.red : Colors.blue;

  
  for (var i = 0; i < pathList[segment].curves.length; i++) {
    // Change 2D points to 3D points
    point = new THREE.Vector3(pathList[segment].curves[i].v1.x, 
                            pathList[segment].curves[i].v1.y, 0);
    vertices[i] = new THREE.Vector3(point.x, point.y, 0);
    
  }
  point = new THREE.Vector3(pathList[segment].curves[pathList[segment].curves.length-1].v2.x, 
                            pathList[segment].curves[pathList[segment].curves.length-1].v2.y, 0);
  vertices[pathList[segment].curves.length] = new THREE.Vector3(point.x, point.y, 0);
  let lineGeometry = new THREE.Geometry();
  lineGeometry.vertices = vertices;
  let lineMaterial = new THREE.LineDashedMaterial({ linewidth: 1, color: mycolor, dashSize: 3, gapSize: 3 });
 
  let line = new THREE.Line(lineGeometry, lineMaterial);

  return line;

}

export {createPaths, getDP, pathList, CarSegments, PedSegments};
