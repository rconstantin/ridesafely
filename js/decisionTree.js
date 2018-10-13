'use strict';

// import {resetPosition, setSpeed} from './scene3d';
// import {createPaths, pathList} from './bikePaths';
import {pathList} from './bikePaths';
let decisionPoints = [];
let period = 2000; // periodic timer
let activeSegment = 0;
let position = 0;
let bikeSpeed = 1;
let list = pathList;
let previousActive = null;
let backup_timer = null;
let timer_id = null;

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
  decisionPoint[0] = new THREE.Vector3(-160, -165, 0);
  decisionPoint[1] = new THREE.Vector3(-160, 25, 0);
  decisionPoint[2] = new THREE.Vector3(-135, -165,0);
  decisionPoint[3] = new THREE.Vector3(-40,-165,0);
  decisionPoint[4] = new THREE.Vector3(-40,25,0);
  decisionPoint[5] = new THREE.Vector3(100,-165,0);
  decisionPoint[6] = new THREE.Vector3(100,25,0);
  decisionPoint[7] = new THREE.Vector3(-40,25,0);
}

function setBikeSpeed(s) {
   bikeSpeed = s;
}
function getBikeSpeed() {
    return bikeSpeed;
}

if (list !== null) {
  setTimeout(check, period);
}

function altCheck () {
    // setTimeout(altCheck, 5*period);
    if (previousActive === activeSegment) {
        if (timer_id === null) {
            timer_id = setTimeout(check, period);
        }
        backup_timer = null;
    }
    else if (timer_id === null) {
      backup_timer = setTimeout(altCheck, 5*period);
    }
}

function check() {

  timer_id = null;

  if (pathList === null) 
  {
    return;
  }
  if (activeSegment === null) {
    return;
  }
  
  
  // if (pathList[activeSegment] !== null && pathList[activeSegment].getPoint(position) === null) 
  if (pathList[activeSegment].getPoint(position) === null)
  {
     if (backup_timer === null) {
       backup_timer = setTimeout(altCheck, 5*period);
     }
     setBikeSpeed(1);
     
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
    timer_id = setTimeout(check, period);
  }

}


function decisionPoint1()
{
    let $textAndPic = $('<div></div>');
    // $textAndPic.append('What\'s this cycling sign stand for? <br />');
    $textAndPic.append('<img src="./images/right.png" />');
    // resetPosition();
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;
    BootstrapDialog.show({
        title: 'Guess sign',
        message: $textAndPic,
        backdrop: 'static',
        keyboard: false,
        buttons: [{
            label: 'Continue Straight',
            action: function(dialogRef){
                activeSegment = 1; // P2
                // position = 0;
                resetPosition(); 
                dialogRef.close();
                timer_id = setTimeout(check, period);
                clearTimeout(backup_timer);
                backup_timer = null;
            }
        }, {
            label: 'Turn Right',
            action: function(dialogRef){
                activeSegment = 3;  //P4
                resetPosition(); //position = 0;
                setBikeSpeed(10); //speed=10;
                dialogRef.close();
                timer_id = setTimeout(check, period);
                clearTimeout(backup_timer);
                backup_timer = null;
            }
        }]
    });

}      

function decisionPoint2()
{
    let $textAndPic = $('<div></div>');
    $textAndPic.append('What\'s this cycling sign stand for? <br />');
    $textAndPic.append('<img src="./images/stop.png" />');
    // $textAndPic.append('Cautious going straight: busy traffic road ahead! <br />');
    // $textAndPic.append('Cautious turning right: traffic violation - entering one-way road against traffic! <br />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;

    BootstrapDialog.show({
        title: 'Guess what this means',
        message: $textAndPic,
        backdrop: 'static',
        keyboard: false,
        buttons: [{
            label: 'Continue Straight',
            action: function(dialogRef){
                activeSegment = 2; // P3
                resetPosition(); //position = 0;
                setBikeSpeed(2); // speed=2;
                dialogRef.close();
                timer_id = setTimeout(check, period);
                clearTimeout(backup_timer);
                backup_timer = null;
            }
        }, {
            label: 'Turn Right',
            action: function(dialogRef){
                activeSegment = 4;  //P5
                resetPosition(); //position = 0;
                setBikeSpeed(2); // speed=2;
                dialogRef.close();
                timer_id = setTimeout(check, period);
                clearTimeout(backup_timer);
                backup_timer = null;
            }
        }]
    });
    
}

function decisionPoint3()
{
    let $textAndPic = $('<div></div>');
    // $textAndPic.append('Caution: don\'t crash into car door opening! <br />');
    $textAndPic.append('<img src="./images/dooring.png" />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;

    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        backdrop: 'static',
        keyboard: false,
        buttons: [{
            label: 'ride close',
            action: function(dialogRef){
                activeSegment = 6; // P7
                resetPosition(); //position = 0;
                dialogRef.close();
                timer_id = setTimeout(check, period);
                clearTimeout(backup_timer);
                backup_timer = null;
            }
        }, {
            label: 'steer away',
            action: function(dialogRef){
                activeSegment = 5;  //P6
                resetPosition(); //position = 0;
                dialogRef.close();
                timer_id = setTimeout(check, period);
                clearTimeout(backup_timer);
                backup_timer = null;
            }
        }]
    });
   
}

function decisionPoint4()
{
    let $textAndPic = $('<div></div>');
    // $textAndPic.append('Caution: Obey Traffic signs - Stop and check for traffic! <br />');
    $textAndPic.append('<img src="./images/left.png" />');
    
    previousActive = activeSegment;
    // timer_id = setTimeout(check, period);
    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        backdrop: 'static',
        keyboard: false,
        buttons: [{
            label: 'Full stop - turn left when clear',
            action: function(dialogRef){
                activeSegment = 8; // P9
                resetPosition(); //position = 0;
                dialogRef.close();
                timer_id = setTimeout(check, period);
                clearTimeout(backup_timer);
                backup_timer = null;
            }
        }, {
            label: 'Full stop - continue straight when clear',
            action: function(dialogRef){
                activeSegment = 7;  //P8
                resetPosition(); //position = 0;
                dialogRef.close();
                timer_id = setTimeout(check, period);
                clearTimeout(backup_timer);
                backup_timer = null;
            }
        }]
    });
   
}

function decisionPoint5()
{
    let $textAndPic = $('<div></div>');
    // $textAndPic.append('Caution: Obey Traffic signs - Stop and check for traffic! <br />');
    $textAndPic.append('<img src="./images/right.png" />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;

    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        backdrop: 'static',
        keyboard: false,
        buttons: [{
            label: 'Full stop - turn right when clear',
            action: function(dialogRef) {
                activeSegment = 10; // P11
                resetPosition(); //position = 0;
                dialogRef.close();
                timer_id = setTimeout(check, period);
                clearTimeout(backup_timer);
                backup_timer = null;
            }
        }, {
            label: 'Full stop - continue straight when clear',
            action: function(dialogRef){
                activeSegment = 9;  //P10
                resetPosition(); //position = 0;
                dialogRef.close();
                timer_id = setTimeout(check, period);
                clearTimeout(backup_timer);
                backup_timer = null;
            }
        }]
    });
   
}

function decisionPoint6()
{
    let $textAndPic = $('<div></div>');
    // $textAndPic.append('Caution: Obey Traffic signs - Avoid Riding on busy sidewalks! <br />');
    $textAndPic.append('<img src="./images/left.png" />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;

    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        backdrop: 'static',
        keyboard: false,
        buttons: [{
            label: 'Full stop - turn left when clear',
            action: function(dialogRef){
                activeSegment = 13; // P14
                resetPosition(); //position = 0;
                dialogRef.close();
                timer_id = setTimeout(check, period);
                clearTimeout(backup_timer);
                backup_timer = null;
            }
        }, {
            label: 'Full stop - continue straight to sidewalk',
            action: function(dialogRef){
                activeSegment = 14;  //P15
                resetPosition(); //position = 0;
                dialogRef.close();
                timer_id = setTimeout(check, period);
                clearTimeout(backup_timer);
                backup_timer = null;
            }
        }]
    });
   
}

function decisionPoint7()
{
    let $textAndPic = $('<div></div>');
    // $textAndPic.append('Caution: Obey Traffic laws - Avoid Riding on busy sidewalks! <br />');
    $textAndPic.append('<img src="./images/left.png" />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;


    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        backdrop: 'static',
        keyboard: false,
        buttons: [{
            label: 'Full stop - turn left when clear',
            action: function(dialogRef){
                activeSegment = 11; // P12
                resetPosition(); //position = 0;
                dialogRef.close();
                timer_id = setTimeout(check, period);
                clearTimeout(backup_timer);
                backup_timer = null;
            }
        }, {
            label: 'Full stop - continue straight to sidewalk',
            action: function(dialogRef){
                activeSegment = 12;  //P13
                resetPosition(); //position = 0;
                dialogRef.close();
                timer_id = setTimeout(check, period);
                clearTimeout(backup_timer);
                backup_timer = null;
            }
        }]
    });
   
}

function decisionPoint8()
{
    let $textAndPic = $('<div></div>');
    // $textAndPic.append('Caution: Obey Traffic laws - Get Back on Track! <br />');
    $textAndPic.append('<img src="./images/left.png" />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;

    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        backdrop: 'static',
        keyboard: 'false',
        buttons: [{
            label: 'Full stop - turn left when clear',
            action: function(dialogRef){
                activeSegment = 9; // P10
                resetPosition(); //position = 0;
                dialogRef.close();
                timer_id = setTimeout(check, period);
                clearTimeout(backup_timer);
                backup_timer = null;
            }
        }, {
            label: 'Full stop - continue straight to sidewalk',
            action: function(dialogRef){
                activeSegment = 10;  //P11
                resetPosition(); //position = 0;
                dialogRef.close();
                timer_id = setTimeout(check, period);
                clearTimeout(backup_timer);
                backup_timer = null;
            }
        }]
    });
   
}

// function getActiveSegment(){
//     return activeSegment;
// }

export {activeSegment, getBikeSpeed, getPosition, setPosition};
