'use strict';

// import {resetPosition, setSpeed} from './scene3d';
// import {createPaths, pathList} from './bikePaths';
import {pathList} from './bikePaths';
import {bike} from './bikeLoad';
import {setActiveCamera, hoveringCamera, trailingCamera} from './cameraControls';
import {setHLIntensity} from './createLights';
import {town} from './townLoad';

let decisionPoints = [];
let period = 2000; // periodic timer
let activeSegment = 0;
let position = 0;
let bikeSpeed = 1;
let list = pathList;
let previousActive = null;
let backup_timer = null;
let timer_id = null;


function resetSegment() {
  activeSegment = 0;
}
function resetPosition() {
  position = 0;
}
function getPosition() {
  return position;
}
function setPosition(pos) {
  position = pos;
}

// $('body').click(function(evt){    
//     if ((pathList[activeSegment].getPoint(position) === null) && (backup_timer === null) && (timer_id === null))
//     {
            
//        backup_timer = setTimeout(altCheck, 5*period);
//       //Do processing of click event here for every element except with id menu_content
//     }
// });

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
     // if (backup_timer === null) {
     //   backup_timer = setTimeout(altCheck, 5*period);
     // }
     setBikeSpeed(1);
     setHLIntensity(6);
     // bike.anim1.paused = true;
     bike.anim.paused = true;
     setActiveCamera(trailingCamera);
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
          decisionPoint9();
          break;
        case 9:
          decisionPoint11();
          break;
        case 15:
          decisionPoint13();
          break;
        case 14:
          decisionPoint12();
          break;
        case 16:
          decisionPoint10();
          break;
        case 11:
        case 12:
        case 13:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        default:
          journeyCompleted();
          break;
     }
     
  }
  else {
    timer_id = setTimeout(check, period);
  }

}

function restartCycling(dialogRef, segment, speed) {
    activeSegment = segment; // P2
    // position = 0;
    resetPosition(); 
    dialogRef.close();
    timer_id = setTimeout(check, period);
    clearTimeout(backup_timer);
    backup_timer = null;
    if (speed) {
     setBikeSpeed(speed);
    }
    bike.anim.paused = false;
    // setActiveCamera(trailingCamera);
    setHLIntensity(4.0);
}

function decisionPoint1()
{
    // let x = document.getElementsByClassName("modal-content");
    //$('.modal-content').css({left:'350px', top: '465px'});


    let $textAndPic = $('<div></div>');
    // $textAndPic.append('What\'s this cycling sign stand for? <br />');
    $textAndPic.append('<img src="./images/right.png" />');
    // resetPosition();
    // timer_id = setTimeout(check, period); {property:value, property:value, ...}

    previousActive = activeSegment;
    town.dp1Arrows.position.z = 1;
    let dialog = BootstrapDialog.show({
        title: 'Guess sign',
        cssClass: 'decisionPoint1',
        message: $textAndPic,
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue Straight',
            cssClass: 'btn-primary',
            action: function(dialogRef){
              restartCycling(dialogRef, 1)
              town.dp1Arrows.position.z = -1;
            }
        }, {
            label: 'Turn Right',
            cssClass: 'btn-danger',
            action: function(dialogRef){
  
                restartCycling(dialogRef, 3, 10);
                town.dp1Arrows.position.z = -1;
            }
        }]

    });

}      

function decisionPoint2()
{
    let $textAndPic = $('<div class="decisionPoint"></div>');
    $textAndPic.append('What\'s this cycling sign stand for? <br />');
    $textAndPic.append('<img src="./images/stop.png" />');
    // $textAndPic.append('Cautious going straight: busy traffic road ahead! <br />');
    // $textAndPic.append('Cautious turning right: traffic violation - entering one-way road against traffic! <br />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;
    town.dp2Arrows.position.z = 1;
    BootstrapDialog.show({
        title: 'Guess what this means',
        cssClass: 'decisionPoint1',
        message: $textAndPic,
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue Straight',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(dialogRef, 2, 2);
                town.dp2Arrows.position.z = -1;
            }
        }, {
            label: 'Turn Right',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(dialogRef, 4, 2);
                town.dp2Arrows.position.z = -1;
            }
        }]
    });
    
}

function decisionPoint3()
{
    let $textAndPic = $('<div class="decisionPoint"></div>');
    $textAndPic.append('Caution: potential car door opening! <br />');
    // $textAndPic.append('<img src="./images/dooring.png" />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;
    town.dp3Arrows.position.z = 1;
    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        cssClass: 'decisionPoint1',
        message: $textAndPic,
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue Straight',
            cssClass: 'btn-danger',
            action: function(dialogRef){
               restartCycling(dialogRef, 6);
               town.dp3Arrows.position.z = -1;
            }
        }, {
            label: 'Steer Away',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(dialogRef, 5);
                town.dp3Arrows.position.z = -1;

            }
        }]
    });
   
}

function decisionPoint4()
{
    let $textAndPic = $('<div class="decisionPoint"></div>');
    // $textAndPic.append('Caution: Obey Traffic signs - Stop and check for traffic! <br />');
    $textAndPic.append('<img src="./images/left.png" />');
    
    previousActive = activeSegment;
    town.dp4Arrows.position.z = 1;
    // timer_id = setTimeout(check, period);
    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        cssClass: 'decisionPoint2',
        message: $textAndPic,
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Turn Left',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(dialogRef, 8);
                town.dp4Arrows.position.z = -1;
  
            }
        }, {
            label: 'Continue Straight',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(dialogRef, 7);
                town.dp4Arrows.position.z = -1;
            }
        }]
    });
   
}

function decisionPoint5()
{
    let $textAndPic = $('<div class="decisionPoint"></div>');
    // $textAndPic.append('Caution: Obey Traffic signs - Stop and check for traffic! <br />');
    $textAndPic.append('<img src="./images/right.png" />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;
    town.dp5Arrows.position.z = 1;
    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Turn Right',
            cssClass: 'btn-primary',
            action: function(dialogRef) {
                restartCycling(dialogRef, 10);
                town.dp5Arrows.position.z = -1;
    
            }
        }, {
            label: 'Continue Straight',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(dialogRef, 9);
                own.dp5Arrows.position.z = -1;
            }
        }]
    });
   
}

function decisionPoint6()
{
    let $textAndPic = $('<div class="decisionPoint"></div>');
    // $textAndPic.append('Caution: Obey Traffic signs - Avoid Riding on busy sidewalks! <br />');
    $textAndPic.append('<img src="./images/left.png" />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;
    town.dp6Arrows.position.z = 1;
    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Turn Left',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling (dialogRef, 13);
                town.dp6Arrows.position.z = -1;    
            }
        }, {
            label: 'Continue Straight',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(dialogRef, 14);
                town.dp6Arrows.position.z = -1; 
            }
        }]
    });
   
}

function decisionPoint7()
{
    let $textAndPic = $('<div class="decisionPoint"></div>');
    // $textAndPic.append('Caution: Obey Traffic laws - Avoid Riding on busy sidewalks! <br />');
    $textAndPic.append('<img src="./images/left.png" />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;
    town.dp7Arrows.position.z = 1; 

    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Turn Left',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(dialogRef, 11);
                town.dp7Arrows.position.z = -1; 
            }
        }, {
            label: 'Cross to Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(dialogRef, 12);
                town.dp7Arrows.position.z = -1; 

            }
        }]
    });
   
}

function decisionPoint8()
{
    let $textAndPic = $('<div class="decisionPoint"></div>');
    // $textAndPic.append('Caution: Obey Traffic laws - Get Back on Track! <br />');
    $textAndPic.append('<img src="./images/left.png" />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;
    town.dp8Arrows.position.z = 1; 
    BootstrapDialog.show({
        title: 'Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Turn Left',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(dialogRef, 9);
                town.dp8Arrows.position.z = -1; 
            }
        }, {
            label: 'Continue Straight to Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(dialogRef, 10);
                town.dp8Arrows.position.z = -1; 
            }
        }]
    });
   
}

function decisionPoint9()
{
    let $textAndPic = $('<div class="decisionPoint"></div>');
    // $textAndPic.append('Caution: Obey Traffic laws - Get Back on Track! <br />');
    // $textAndPic.append('<img src="./images/left.png" />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;
    town.dp9Arrows.position.z = 1; 
    BootstrapDialog.show({
        title: 'Defensive Riding: Heavy Traffic Alert!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue on Road',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(dialogRef, 15);
                town.dp9Arrows.position.z = -1; 
            }
        }, {
            label: 'Cross to Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(dialogRef, 16);    
                town.dp9Arrows.position.z = -1; 
            }
        }]
    });
   
}

function decisionPoint10()
{
    let $textAndPic = $('<div class="decisionPoint"></div>');
    // $textAndPic.append('Caution: Obey Traffic laws - Get Back on Track! <br />');
    // $textAndPic.append('<img src="./images/left.png" />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;
    town.dp10Arrows.position.z = 1; 

    BootstrapDialog.show({
        title: 'Pedestrians Alert VS Heavy Traffic Alert!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue on Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(dialogRef, 17);
                town.dp10Arrows.position.z = -1;
            }
        }, {
            label: 'Cross to Roadside',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(dialogRef, 18);
                town.dp10Arrows.position.z = -1;
            }
        }]
    });
   
}

function decisionPoint11()
{
    let $textAndPic = $('<div class="decisionPoint"></div>');
    // $textAndPic.append('Caution: Obey Traffic laws - Get Back on Track! <br />');
    // $textAndPic.append('<img src="./images/left.png" />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;
    town.dp11Arrows.position.z = 1;
    BootstrapDialog.show({
        title: 'Pedestrians Alert VS Heavy Traffic Alert!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue on Roadside',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(dialogRef, 19);
                town.dp11Arrows.position.z = -1;
            }
        }, {
            label: 'Cross to Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(dialogRef, 20);
                town.dp11Arrows.position.z = -1;
            }
        }]
    });
   
}

function decisionPoint12()
{
    let $textAndPic = $('<div class="decisionPoint"></div>');
    // $textAndPic.append('Caution: Obey Traffic laws - Get Back on Track! <br />');
    // $textAndPic.append('<img src="./images/left.png" />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;
    town.dp12Arrows.position.z = 1;
    BootstrapDialog.show({
        title: 'Pedestrians Alert VS Heavy Traffic Alert!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue on Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(dialogRef, 21);
                town.dp12Arrows.position.z = -1;
            }
        }, {
            label: 'Cross to Roadside',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(dialogRef, 22);
                town.dp12Arrows.position.z = -1;
            }
        }]
    });
   
}

function decisionPoint13()
{
    let $textAndPic = $('<div class="decisionPoint"></div>');
    // $textAndPic.append('Caution: Obey Traffic laws - Get Back on Track! <br />');
    // $textAndPic.append('<img src="./images/left.png" />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;
    town.dp13Arrows.position.z = 1;
    BootstrapDialog.show({
        title: 'Pedestrians Alert VS Heavy Traffic Alert!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue on Roadside',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(dialogRef, 23);
                town.dp13Arrows.position.z = -1;
            }
        }, {
            label: 'Cross to Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(dialogRef, 24);
                town.dp13Arrows.position.z = -1;
            }
        }]
    });
   
}

function journeyCompleted() {
    let $textAndPic = $('<div class="decisionPoint"></div>');
    // $textAndPic.append('Caution: Obey Traffic laws - Get Back on Track! <br />');
    // $textAndPic.append('<img src="./images/left.png" />');
    
    // timer_id = setTimeout(check, period);
    previousActive = activeSegment;

    BootstrapDialog.show({
        title: 'Successful Completion!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Restart Cycling Journey',
            cssClass: 'btn-success',
            action: function(dialogRef){
                restartCycling(dialogRef, 0);
            }
        }, {
            label: 'Leave Game',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                dialogRef.close();
                return;
            }
        }]
    });
}

// function getActiveSegment(){
//     return activeSegment;
// }

export {activeSegment, resetSegment, resetPosition, getBikeSpeed, getPosition, setPosition};
