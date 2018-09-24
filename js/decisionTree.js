'use strict';

// import {resetPosition, setSpeed} from './scene3d';
// import {createPaths, pathList} from './bikePaths';
import {pathList} from './bikePaths';
let decisionPoints = [];
let period = 2000; // periodic timer
var activeSegment = 0;
var position = 0;
var speed = 1;
let list = pathList;

function resetPosition() {
  position = 0;
}
function getPosition() {
  return position;
}
function setPosition(pos) {
  position = pos;
}

function createDecisionPoints() {
  decisionPoint[0] = new THREE.Vector3(-160, -185, 0);
  decisionPoint[1] = new THREE.Vector3(-160,35, 0);
  decisionPoint[2] = new THREE.Vector3(-135, -185,0);
  decisionPoint[3] = new THREE.Vector3(-40,-185,0);
  decisionPoint[4] = new THREE.Vector3(-40,35,0);
  decisionPoint[5] = new THREE.Vector3(110,-185,0);
  decisionPoint[6] = new THREE.Vector3(110,35,0);
  decisionPoint[7] = new THREE.Vector3(-40,35,0);
}

function setSpeed(s) {
   speed = s;
}

if (list !== null) {
  setTimeout(check, period);
}

function check() {
  if (pathList === null) 
  {
    return;
  }
  if (activeSegment === null) {
    return;
  }
  // if (pathList.length === 0) {
  //   return;
  // }
  // if (pathList[activeSegment] !== null && pathList[activeSegment].getPoint(position) === null) 
  if (pathList[activeSegment].getPoint(position) === null)
  {
     speed = 1;
     switch (activeSegment) {
        case 0:
          decisionPoint1();
          break;
        case 1:
          decisionPoint2();
          break;
        case 3:
          decisionPoint3();
          break;
        case 4:
          decisionPoint8();
          break;
        case 8:
          decisionPoint5();
          break;
        case 5:
        case 6:
          decisionPoint4();
          break;
        case 7:
          decisionPoint6();
          break;
        case 10:
          decisionPoint7();
          break;
        case 2:
        case 9:
        case 11:
        case 12:
        case 13:
        case 14:
        default:
          break;
     }
     
  }
  else {
    setTimeout(check, period);
  }

}


function decisionPoint1()
{
    let $textAndPic = $('<div></div>');
    $textAndPic.append('What\'s this cycling sign stand for? <br />');
    $textAndPic.append('<img src="./images/right.png" />');
    
    BootstrapDialog.show({
        title: 'Guess what this means',
        message: $textAndPic,
        buttons: [{
            label: 'Continue Straight',
            action: function(dialogRef){
                activeSegment = 1; // P2
                // position = 0;
                resetPosition();
                dialogRef.close();
                setTimeout(check, period);
            }
        }, {
            label: 'Turn Right',
            action: function(dialogRef){
                activeSegment = 3;  //P4
                resetPosition(); //position = 0;
                setSpeed(10); //speed=10;
                dialogRef.close();
                setTimeout(check, period);
            }
        }]
    });
    
}      

function decisionPoint2()
{
    let $textAndPic = $('<div></div>');
    $textAndPic.append('What\'s this cycling sign stand for? <br />');
    $textAndPic.append('<img src="./images/stop1.png" />');
    $textAndPic.append('Cautious going straight: busy traffic road ahead! <br />');
    $textAndPic.append('Cautious turning right: traffic violation - entering one-way road against traffic! <br />');
    
    BootstrapDialog.show({
        title: 'Guess what this means',
        message: $textAndPic,
        buttons: [{
            label: 'Continue Straight',
            action: function(dialogRef){
                activeSegment = 2; // P3
                resetPosition(); //position = 0;
                setSpeed(2); // speed=2;
                dialogRef.close();
                setTimeout(check, period);
            }
        }, {
            label: 'Turn Right',
            action: function(dialogRef){
                activeSegment = 4;  //P5
                resetPosition(); //position = 0;
                setSpeed(2); // speed=2;
                dialogRef.close();
                setTimeout(check, period);
            }
        }]
    });
    
}

function decisionPoint3()
{
    let $textAndPic = $('<div></div>');
    $textAndPic.append('Caution: don\'t crash into car door opening! <br />');
    $textAndPic.append('<img src="./images/dooring.png" />');
    
    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        buttons: [{
            label: 'ride close',
            action: function(dialogRef){
                activeSegment = 6; // P7
                resetPosition(); //position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }, {
            label: 'steer away',
            action: function(dialogRef){
                activeSegment = 5;  //P6
                esetPosition(); //position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }]
    });
   
}

function decisionPoint4()
{
    let $textAndPic = $('<div></div>');
    $textAndPic.append('Caution: Obey Traffic signs - Stop and check for traffic! <br />');
    $textAndPic.append('<img src="./images/left.png" />');
    
    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        buttons: [{
            label: 'Full stop - turn left when clear',
            action: function(dialogRef){
                activeSegment = 8; // P9
                resetPosition(); //position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }, {
            label: 'Full stop - continue straight when clear',
            action: function(dialogRef){
                activeSegment = 7;  //P8
                resetPosition(); //position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }]
    });
   
}

function decisionPoint5()
{
    let $textAndPic = $('<div></div>');
    $textAndPic.append('Caution: Obey Traffic signs - Stop and check for traffic! <br />');
    $textAndPic.append('<img src="./images/right.png" />');
    
    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        buttons: [{
            label: 'Full stop - turn right when clear',
            action: function(dialogRef){
                activeSegment = 10; // P11
                resetPosition(); //position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }, {
            label: 'Full stop - continue straight when clear',
            action: function(dialogRef){
                activeSegment = 9;  //P10
                resetPosition(); //position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }]
    });
   
}

function decisionPoint6()
{
    let $textAndPic = $('<div></div>');
    $textAndPic.append('Caution: Obey Traffic signs - Avoid Riding on busy sidewalks! <br />');
    $textAndPic.append('<img src="./images/left.png" />');
    
    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        buttons: [{
            label: 'Full stop - turn left when clear',
            action: function(dialogRef){
                activeSegment = 13; // P14
                resetPosition(); //position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }, {
            label: 'Full stop - continue straight to sidewalk',
            action: function(dialogRef){
                activeSegment = 14;  //P15
                resetPosition(); //position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }]
    });
   
}

function decisionPoint7()
{
    let $textAndPic = $('<div></div>');
    $textAndPic.append('Caution: Obey Traffic laws - Avoid Riding on busy sidewalks! <br />');
    $textAndPic.append('<img src="./images/left.png" />');
    
    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        buttons: [{
            label: 'Full stop - turn left when clear',
            action: function(dialogRef){
                activeSegment = 11; // P12
                resetPosition(); //position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }, {
            label: 'Full stop - continue straight to sidewalk',
            action: function(dialogRef){
                activeSegment = 12;  //P13
                resetPosition(); //position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }]
    });
   
}

function decisionPoint8()
{
    let $textAndPic = $('<div></div>');
    $textAndPic.append('Caution: Obey Traffic laws - Get Back on Track! <br />');
    $textAndPic.append('<img src="./images/left.png" />');
    
    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        buttons: [{
            label: 'Full stop - turn left when clear',
            action: function(dialogRef){
                activeSegment = 9; // P10
                resetPosition(); //position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }, {
            label: 'Full stop - continue straight to sidewalk',
            action: function(dialogRef){
                activeSegment = 10;  //P11
                resetPosition(); //position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }]
    });
   
}

// function getActiveSegment(){
//     return activeSegment;
// }

export {activeSegment, speed, getPosition, setPosition};
