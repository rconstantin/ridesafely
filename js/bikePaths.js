// This is the most important file in this project. It creates the different paths for the bike,
// the cars and the pedestrians. it uses the THREE.js Path() functions to create paths (segments) from 
// a source 2D position to an end destination while going through intermediate points
//              SOURCE POINT (DECISION POINT x)
//                  |
//                  | (sub-segment 1)
//                  |             (sub-segment 2)
//                DEST 1 --------------------------DEST2
//                                                   |
//                                                   | (sub-segment 3)
//                                                   |
//                                                 DEST (DECISION POINT y)
//                        Path z: starting at DP x and ending at DPy
//
///////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

import Colors from './colors';


let pathList = [], decisionPoint = [];
let DEBUG = 0;
let segmentLevel2 = 49;
let counter = 0;
let lines = [];

let CarSegments = {
  redCar: 31,
  blueCar: 32,
  yellowCar: 33,
  yellowCar1: 34,
  greenCar: 35
};

let PedSegments = {
  boy1: 41,
  robot1: 42
};
// Level 1: DP1 to DP13
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
  DP13: 12,
  DP14: 13,   // Last DP from Level 1
  DP21: 21,   // start of level 2 decision points
  DP22: 22,   
  DP23: 23,
  DP24: 24,
  DP25: 25,
  DP26: 26,
  DP27: 27,
  DP28: 28,
  DP29: 29,
  DP30: 30,
  DP31: 31,
  DP32: 32, 
  DP33: 33,
  DP34: 34,
  DP35: 35,
  DP36: 36,
  DP37: 37,
  DP38: 38,
  DP39: 39,
  DP40: 40
}


function createDecisionPoints() {
  // Level 1: Decision Points creation
  decisionPoint[DP.DP1] = new THREE.Vector3(-160, -175, 0); // DP1
  decisionPoint[DP.DP2] = new THREE.Vector3(-160, 25, 0);   // DP2
  decisionPoint[DP.DP3] = new THREE.Vector3(-120, -170,0);  // DP3
  decisionPoint[DP.DP4] = new THREE.Vector3(-55,-170,0);    // DP4
  decisionPoint[DP.DP5] = new THREE.Vector3(-40,25,0);      // DP5
  decisionPoint[DP.DP6] = new THREE.Vector3(100,-170,0);    // DP6
  decisionPoint[DP.DP7] = new THREE.Vector3(100,25,0);      // DP7
  decisionPoint[DP.DP8] = new THREE.Vector3(-40,25,0);      // DP8
  decisionPoint[DP.DP9] = new THREE.Vector3(-160,178,0);    // DP9
  decisionPoint[DP.DP10] = new THREE.Vector3(-10, 240, 0);   // DP10
  decisionPoint[DP.DP11] = new THREE.Vector3(-5, 178, 0);   // DP11
  decisionPoint[DP.DP12] = new THREE.Vector3(150, -10, 0);  // DP12
  decisionPoint[DP.DP13] = new THREE.Vector3(-55, 178, 0);  // DP13
  decisionPoint[DP.DP14] = new THREE.Vector3(135,25, 0);  // DP14
  // Level 2: Decision Points creation starting at DP21
  decisionPoint[DP.DP21] = new THREE.Vector3(190, 220, 0); // DP21
  decisionPoint[DP.DP22] = new THREE.Vector3(-10, 220, 0); // DP22
  decisionPoint[DP.DP23] = new THREE.Vector3(-160, 220, 0); // DP23
  decisionPoint[DP.DP24] = new THREE.Vector3(-150, 20, 0); // DP24
  decisionPoint[DP.DP25] = new THREE.Vector3(-195, -170, 0); // DP25
  decisionPoint[DP.DP26] = new THREE.Vector3(135, 70, 0); // DP26
  decisionPoint[DP.DP27] = new THREE.Vector3(135, -170, 0); // DP27
  decisionPoint[DP.DP28] = new THREE.Vector3(0, 70, 0); // DP28
  decisionPoint[DP.DP29] = new THREE.Vector3(-25, -125, 0); // DP29
  decisionPoint[DP.DP30] = new THREE.Vector3(-50, 65, 0); // DP30
  decisionPoint[DP.DP31] = new THREE.Vector3(-148, -130, 0); // DP31
  decisionPoint[DP.DP32] = new THREE.Vector3(-195, 65, 0); // DP32
  decisionPoint[DP.DP33] = new THREE.Vector3(-55,-170,0); // DP33
  decisionPoint[DP.DP34] = new THREE.Vector3(100,-170,0); // DP34
  decisionPoint[DP.DP35] = new THREE.Vector3(-55,15,0); // DP35
  decisionPoint[DP.DP36] = new THREE.Vector3(-160,65,0); // DP36
  decisionPoint[DP.DP37] = new THREE.Vector3(-160,-125,0); // DP37
  decisionPoint[DP.DP38] = new THREE.Vector3(105,-125,0); // DP38
  decisionPoint[DP.DP39] = new THREE.Vector3(-148,50,0); // DP39
  decisionPoint[DP.DP40] = new THREE.Vector3(-195,-125,0); // DP40
  
  
}

function getDP(dp) 
{
  // DP is 1 based: range DP1 tp DP1
  if ((dp>= 1 && dp < DP.DP21))  {
    return decisionPoint[dp-1];
  }
  else  {
    return decisionPoint[dp];
  }
  return null;
}

// Level 1: Segment 1 to segment 24 for level 1 Bike paths from Start to Finish lines
// Level 2: Segment 50 to segment TBD for level 2 Bike paths from new Start to new Finish
// lines are only needed for DEBUG purposes. paths drawn by setting DEBUG = 1;


function createPath(pId, src, dst) {

  pathList[pId] = new THREE.Path();
  pathList[pId].moveTo(src[0], src[1]);
  for (let i = 0; i < dst.length; i++) {
    pathList[pId].lineTo(dst[i][0], dst[i][1]);
  
  }
  // let line = null;
  if (DEBUG) {
     // visible lines drawing the paths are only needed for debugging purposes
     lines[counter++] = drawPath(pId);
  }
  // return line;
}

function createPaths() {  

  // the pathList
  let destP = [], src = [];
  
  
  
  createDecisionPoints();

  // P1 with 0 based indices
  
  src = [-155,-240];
  destP = [[-155,-170]];
  createPath(0, src, destP);

  // P2 with 0 based indices
  destP  = []; // reset destP array
  src = [-155,-170];
  destP = [[-155,25]];
  createPath(1, src, destP);
  
  // P3 starts at DP2 and goes to DP9
  destP  = []; // reset destP array
  src = [-155,25];
  destP = [[-155,178]];
  // 0 based indices
  createPath(2, src, destP);
 
  // P4 DP1 to DP3
  destP  = []; // reset destP array
  src = [-155,-170];
  destP = [[-120,-170]];
  // 0 based indices
  createPath(3, src, destP);
  
  // P5
  destP  = []; // reset destP array
  src = [-155,25];
  destP = [[-150,25], [-150,40], [-55,40]];
  // 0 based indices
  createPath(4, src, destP);

  // P6 from DP3 to DP4
  destP  = []; // reset destP array
  src = [-120,-170];
  destP = [[-110,-160], [-55,-170]];
  // 0 based indices
  createPath(5, src, destP);

  // P7 from DP3 to DP4
  destP  = []; // reset destP array
  src = [-120,-170];
  destP = [[-55,-170]];
  // 0 based indices
  createPath(6, src, destP);

  // P8
  destP  = []; // reset destP array
  src = [-55,-170];
  destP = [[110,-170]];
  // 0 based indices
  createPath(7, src, destP);

  // P9
  destP  = []; // P9 starts at DP4
  src = [-55,-170];
  destP = [[-25,-170], [-25,25]];
  // 0 based indices
  createPath(8, src, destP);

  // P10 starts at DP5 continue to DP11
  destP  = []; // reset destP array
  src = [-55,25];
  destP = [[-45,25], [-10,25], [-10,178]];
  // 0 based indices
  createPath(9, src, destP);
  
  // P11
  destP  = []; // reset destP array
  src = [-55,25];
  destP = [[-45,25], [110,25]];
  // 0 based indices
  createPath(10, src, destP);

  // P12
  destP  = []; // reset destP array
  src = [110,25];
  destP = [[135,25], [135,185], [250,185]];
  // 0 based indices
  createPath(11, src, destP);

  // P13
  destP  = []; // reset destP array
  src = [110,25];
  destP = [[150,25], [150,185], [250,185]];
  // 0 based indices
  createPath(12, src, destP);

  // P14 from DP6 to DP14
  destP  = []; // reset destP array
  src = [100,-170];
  destP = [[135,-170], [135,25]]; 
  // 0 based indices
  createPath(13, src, destP);

  // P15 starts at DP6 to DP12
  destP  = []; // reset destP array
  src = [100,-170];
  destP = [[150,-170], [150,-15]];
  // 0 based indices
  createPath(14, src, destP);

  // P16 - starts at DP9 towards DP13
  destP  = []; // reset destP array
  src = [-160,178];
  destP = [[-55,178]];
  
  // 0 based indices
  createPath(15, src, destP);
  
  // P17 - starts at DP9 towards DP10
  destP  = []; // reset destP array
  src = [-160,178];
  destP = [[-160, 240], [-5, 240]];
  
  
  // 0 based indices
  createPath(16, src, destP);

  // P18 - starts at DP10 towards endline
  destP  = []; // reset destP array
  src = [-10, 240];
  destP = [[250, 240]];
  
  // 0 based indices
  createPath(17, src, destP);

  // P19 - starts at DP10 towards endline
  destP  = []; // reset destP array
  src = [-10, 240];
  destP = [[0, 178], [250, 178]];
  
  // 0 based indices
  createPath(18, src, destP);

   // P20 - starts at DP11 towards endline
  destP  = []; // reset destP array
  src = [-5, 178];
  destP = [[250, 178]];
  
  // 0 based indices
  createPath(19, src, destP);

  // P21 - starts at DP11 towards endline
  destP  = []; // reset destP array
  src = [-5, 178];
  destP = [[-5, 240], [250, 240]];
  
  // 0 based indices
  createPath(20, src, destP);

  // P22 - starts at DP12 towards endline
  destP  = []; // reset destP array
  src = [150, -10];
  destP = [[150, 178], [250, 178]];
  
  // 0 based indices
  createPath(21, src, destP);

  // P23 - starts at DP12 towards endline
  destP  = []; // reset destP array
  src = [150, -10];
  destP = [[135, -20], [135, 178], [250, 178]];
  
  // 0 based indices
  createPath(22, src, destP);

  // P24 - starts at DP13 towards endline
  destP  = []; // reset destP array
  src = [-55, 178];
  destP = [[250, 178]];
  // 0 based indices
  createPath(23, src, destP);

  // P25 - starts at DP13 towards endline
  destP  = []; // reset destP array
  src = [-55, 178];
  destP = [[-55, 240], [250, 240]];
  // 0 based indices
  createPath(24, src, destP);

  // P26 - starts at DP14 towards finish line
  destP  = []; // reset destP array
  src = [decisionPoint[DP.DP14].x, decisionPoint[DP.DP14].y];
  destP = [[135,178], [250,178]];
  // 0 based indices
  createPath(25, src, destP);

  // P27 - starts at DP14 towards finish line 135,25
  destP  = []; // reset destP array
  src = [decisionPoint[DP.DP14].x, decisionPoint[DP.DP14].y];
  destP = [[170,decisionPoint[DP.DP14].y], [170,178], [250, 178]];
  // 0 based indices
  createPath(26, src, destP);
  

  ///////////////////////////////////////////////
  // Cars Section
  // Red Car Path
  // P31 === CarSegments.redCar
  destP = []; // reset destP array
  src = [250,210];
  
  destP = [[185, 210], [185, -165], [115, -165], [115, 60], [0, 60], [-10, 40], [-165, 40], [-165, 188], [-40, 188], [-40, 40], [125, 40], [125, 188], [250, 188]];
  createPath(CarSegments.redCar, src, destP);

  // P32 === CarSegments.blueCar
  destP = []; // reset destP array
  
  src = [-250,-160];
  
  destP = [[128, -160], [128, 210], [-185, 210], [-185, -250]];

  
  createPath(CarSegments.blueCar, src, destP); 

// P33 === CarSegments.yellowCar1
  destP = []; // reset destP array
  src = [-250,-160];
  
  destP = [[-30, -160], [-30, 40], [-40, 40], [-165, 40], [-165, 250]];

  
  createPath(CarSegments.yellowCar1, src, destP); 

// P35 === CarSegments.greenCar
  destP = []; // reset destP array
  src = [-30,-250];
  destP = [[-30, 25], [-20, 210], [-200, 210]];
  
  
  createPath(CarSegments.greenCar, src, destP); 



  // Pedestrians on sidewalk1 starting at P41
  let randPos = Math.random() * 10;
  destP = []; // reset destP array
  src = [160-randPos,-130];
  destP = [[160-randPos, 170], [159-randPos, 170], [159-randPos, -130], [160-randPos, -130]];
  createPath(PedSegments.boy1, src, destP);  

  destP = []; // reset destP array
  src = [-150, 245-randPos];
  destP = [[220, 245-randPos], [220, 244-randPos], [-150, 244-randPos], [-150, 245-randPos]];
  createPath(PedSegments.robot1, src, destP);  
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  // Level 2 bike paths starting at segment P49
  //////////////////////////////////////////////
  destP = []; // reset destP array P49 start at previous FINISH LINE to DP21
  src = [250,decisionPoint[DP.DP21].y];
  destP = [[decisionPoint[DP.DP21].x, decisionPoint[DP.DP21].y]];
  createPath(segmentLevel2++, src, destP); 

 
  destP = []; // reset destP array P50 start at DP21  to DP27
  src = [decisionPoint[DP.DP21].x, decisionPoint[DP.DP21].y];
  destP = [[decisionPoint[DP.DP21].x, decisionPoint[DP.DP27].y], [decisionPoint[DP.DP27].x, decisionPoint[DP.DP27].y]];
  createPath(segmentLevel2++, src, destP); 


  destP = []; // reset destP array P51: starts DP21 to DP22
  src = [decisionPoint[DP.DP21].x, decisionPoint[DP.DP21].y];
  destP = [[decisionPoint[DP.DP22].x, decisionPoint[DP.DP22].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P52: starts DP27 to DP26
  src = [decisionPoint[DP.DP27].x, decisionPoint[DP.DP27].y];
  destP = [[decisionPoint[DP.DP26].x, decisionPoint[DP.DP26].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P53: starts DP27 to DP31
  src = [decisionPoint[DP.DP27].x, decisionPoint[DP.DP27].y];
  destP = [[decisionPoint[DP.DP31].x, decisionPoint[DP.DP31].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P54: starts DP22 to DP23
  src = [decisionPoint[DP.DP22].x, decisionPoint[DP.DP22].y];
  destP = [[decisionPoint[DP.DP23].x, decisionPoint[DP.DP23].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P55: starts DP22 to DP30
  src = [decisionPoint[DP.DP22].x, decisionPoint[DP.DP22].y];
  destP = [[decisionPoint[DP.DP30].x, decisionPoint[DP.DP22].y], [decisionPoint[DP.DP30].x, decisionPoint[DP.DP30].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P56: starts DP26 to DP38
  src = [decisionPoint[DP.DP26].x, decisionPoint[DP.DP26].y];
  destP = [[decisionPoint[DP.DP38].x, decisionPoint[DP.DP26].y], [decisionPoint[DP.DP38].x, decisionPoint[DP.DP38].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P57: starts DP26 to DP28
  src = [decisionPoint[DP.DP26].x, decisionPoint[DP.DP26].y];
  destP = [[decisionPoint[DP.DP28].x, decisionPoint[DP.DP28].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P58: starts DP28 to DP24
  src = [decisionPoint[DP.DP28].x, decisionPoint[DP.DP28].y];
  destP = [[decisionPoint[DP.DP30].x, decisionPoint[DP.DP24].y], [decisionPoint[DP.DP24].x, decisionPoint[DP.DP24].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P59: starts DP28 to DP29
  src = [decisionPoint[DP.DP28].x, decisionPoint[DP.DP28].y];
  destP = [[decisionPoint[DP.DP29].x, decisionPoint[DP.DP28].y], [decisionPoint[DP.DP29].x, decisionPoint[DP.DP29].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P60: starts DP29 to DP35
  src = [decisionPoint[DP.DP29].x, decisionPoint[DP.DP29].y];
  destP = [[decisionPoint[DP.DP35].x, decisionPoint[DP.DP35].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P61: starts DP29 to DP31
  src = [decisionPoint[DP.DP29].x, decisionPoint[DP.DP29].y];
  destP = [[decisionPoint[DP.DP31].x, decisionPoint[DP.DP31].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P62: starts DP30 to DP24
  src = [decisionPoint[DP.DP30].x, decisionPoint[DP.DP30].y];
  destP = [[decisionPoint[DP.DP30].x, decisionPoint[DP.DP24].y],[decisionPoint[DP.DP24].x, decisionPoint[DP.DP24].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P63: starts DP30 to DP39
  src = [decisionPoint[DP.DP30].x, decisionPoint[DP.DP30].y];
  destP = [[decisionPoint[DP.DP30].x, decisionPoint[DP.DP39].y],[decisionPoint[DP.DP39].x, decisionPoint[DP.DP39].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P64: starts DP24 to DP40
  src = [decisionPoint[DP.DP24].x, decisionPoint[DP.DP24].y];
  destP = [[decisionPoint[DP.DP40].x, decisionPoint[DP.DP24].y], [decisionPoint[DP.DP40].x, decisionPoint[DP.DP40].y]];
  createPath(segmentLevel2++, src, destP); 


  destP = []; // reset destP array P65: starts DP24 to DP37
  src = [decisionPoint[DP.DP24].x, decisionPoint[DP.DP24].y];
  destP = [[decisionPoint[DP.DP37].x, decisionPoint[DP.DP24].y], [decisionPoint[DP.DP37].x, decisionPoint[DP.DP37].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P66: starts DP25 to DP33
  src = [decisionPoint[DP.DP25].x, decisionPoint[DP.DP25].y];
  destP = [[decisionPoint[DP.DP33].x, decisionPoint[DP.DP33].y]]; //, [decisionPoint[DP.DP33].x, decisionPoint[DP.DP33].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P67: starts DP25 to FINISH LINE
  src = [decisionPoint[DP.DP25].x, decisionPoint[DP.DP25].y];
  destP = [[decisionPoint[DP.DP25].x,-250]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P68: starts DP23 to DP36
  src = [decisionPoint[DP.DP23].x, decisionPoint[DP.DP23].y];
  destP = [[decisionPoint[DP.DP36].x, decisionPoint[DP.DP36].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P69: starts DP23 to DP32
  src = [decisionPoint[DP.DP23].x, decisionPoint[DP.DP23].y];
  destP = [[decisionPoint[DP.DP32].x, decisionPoint[DP.DP23].y], [decisionPoint[DP.DP32].x, decisionPoint[DP.DP32].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P70: starts DP31 to FINISH
  src = [decisionPoint[DP.DP31].x, decisionPoint[DP.DP31].y];
  destP = [[-155,-250]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P71: starts DP31 to DP25
  src = [decisionPoint[DP.DP31].x, decisionPoint[DP.DP31].y];
  destP = [[decisionPoint[DP.DP25].x, decisionPoint[DP.DP25].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P72: starts DP32 to DP40
  src = [decisionPoint[DP.DP32].x, decisionPoint[DP.DP32].y];
  destP = [[decisionPoint[DP.DP40].x, decisionPoint[DP.DP40].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P73: starts DP32 to DP37 
  src = [decisionPoint[DP.DP32].x, decisionPoint[DP.DP32].y];
  // removed intermediate: decisionPoint[DP.DP24].y], [decisionPoint[DP.DP37].x,
  destP = [[decisionPoint[DP.DP24].x,  decisionPoint[DP.DP37].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P74: starts DP33 to DP34
  src = [decisionPoint[DP.DP33].x, decisionPoint[DP.DP33].y];
  destP = [[decisionPoint[DP.DP34].x, decisionPoint[DP.DP34].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P75: starts DP33 to DP35
  src = [decisionPoint[DP.DP33].x, decisionPoint[DP.DP33].y];
  destP = [[decisionPoint[DP.DP33].x, decisionPoint[DP.DP35].y], [decisionPoint[DP.DP35].x, decisionPoint[DP.DP35].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P76: starts DP34 to DP26
  src = [decisionPoint[DP.DP34].x, decisionPoint[DP.DP34].y];
  destP = [[decisionPoint[DP.DP26].x, decisionPoint[DP.DP34].y], [decisionPoint[DP.DP26].x, decisionPoint[DP.DP26].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P77: starts DP34 to DP27
  src = [decisionPoint[DP.DP34].x, decisionPoint[DP.DP34].y];
  destP = [[decisionPoint[DP.DP27].x,decisionPoint[DP.DP34].y], [decisionPoint[DP.DP27].x, decisionPoint[DP.DP27].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P78: starts DP35 to DP24
  src = [decisionPoint[DP.DP35].x, decisionPoint[DP.DP35].y];
  destP = [[decisionPoint[DP.DP24].x, decisionPoint[DP.DP24].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P79: starts DP35 to DP39
  src = [decisionPoint[DP.DP35].x, decisionPoint[DP.DP35].y];
  destP = [[decisionPoint[DP.DP39].x, decisionPoint[DP.DP39].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P80: starts DP36 to DP37
  src = [decisionPoint[DP.DP36].x, decisionPoint[DP.DP36].y];
  destP = [[decisionPoint[DP.DP37].x, decisionPoint[DP.DP37].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P81: starts DP36 to DP40
  src = [decisionPoint[DP.DP36].x, decisionPoint[DP.DP36].y];
  destP = [[decisionPoint[DP.DP40].x, decisionPoint[DP.DP36].y], [decisionPoint[DP.DP40].x, decisionPoint[DP.DP40].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P82: starts DP37 to FINISH
  src = [decisionPoint[DP.DP37].x, decisionPoint[DP.DP37].y];
  destP = [[decisionPoint[DP.DP37].x,-250]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P83: starts DP37 to DP40
  src = [decisionPoint[DP.DP37].x, decisionPoint[DP.DP37].y];
  destP = [[decisionPoint[DP.DP40].x, decisionPoint[DP.DP40].y]];
  createPath(segmentLevel2++, src, destP); 

  
  destP = []; // reset destP array P84: starts DP38 to 31
  src = [decisionPoint[DP.DP38].x, decisionPoint[DP.DP38].y];
  destP = [[decisionPoint[DP.DP38].x, decisionPoint[DP.DP31].y],[decisionPoint[DP.DP31].x, decisionPoint[DP.DP31].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P85: starts DP38 to DP27
  src = [decisionPoint[DP.DP38].x, decisionPoint[DP.DP38].y];
  destP = [[decisionPoint[DP.DP27].x, decisionPoint[DP.DP27].y]];
  createPath(segmentLevel2++, src, destP); 


  destP = []; // reset destP array P86: starts DP39 to 24
  src = [decisionPoint[DP.DP39].x, decisionPoint[DP.DP39].y];
  destP = [[decisionPoint[DP.DP24].x, decisionPoint[DP.DP24].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P87: starts DP39 to DP40
  src = [decisionPoint[DP.DP39].x, decisionPoint[DP.DP39].y];
  destP = [[decisionPoint[DP.DP40].x, decisionPoint[DP.DP39].y], [decisionPoint[DP.DP40].x, decisionPoint[DP.DP40].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P88: starts DP40 to DP25
  src = [decisionPoint[DP.DP40].x, decisionPoint[DP.DP40].y];
  destP = [[decisionPoint[DP.DP25].x, decisionPoint[DP.DP25].y]];
  createPath(segmentLevel2++, src, destP); 

  destP = []; // reset destP array P89: starts DP40 to Finish
  src = [decisionPoint[DP.DP40].x, decisionPoint[DP.DP40].y];
  destP = [[decisionPoint[DP.DP40].x, -250]];
  createPath(segmentLevel2++, src, destP); 

  // return lines;
}

// This is mainly a debug function for paths accuracy verification. It draws colors lines denoting
// the paths created. It has potential for special effects but that could be an enhancement.
function drawPath( segment ) {
  let vertices = [], point;
  let mycolor = (segment < 30) ? Colors.red : ((segment > 48) ? Colors.green : Colors.blue);

  
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

export {createPaths, lines, getDP, pathList, CarSegments, PedSegments};
