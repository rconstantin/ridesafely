'use strict';

// import {resetPosition, setSpeed} from './scene3d';
// import {createPaths, pathList} from './bikePaths';
import {pathList} from './bikePaths';
import {bike} from './bikeLoad';
import {setActiveCamera, hoveringCamera, trailingCamera, inspectCamera} from './cameraControls';
import {setHLIntensity} from './createLights';
import {town} from './townLoad';

let decisionPoints = [];
let period = 2000; // periodic timer
let activeSegment = 0;
let position = 0;
let bikeSpeed = 1;
let list = pathList;
let previousActive = null;
let timer_id = null;
let inspect_id = null, inspect_period = 500;
let choose_timer_id = null, choose_period = 10000;

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


function setBikeSpeed(s) {
   bikeSpeed = s;
}
function getBikeSpeed() {
    return bikeSpeed;
}

if (list !== null) {
  setTimeout(check, period);
}


function resetCamera() {
    setActiveCamera(trailingCamera);
    inspect_id = null;
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

function chooseForRider(segment1, segment2, arrowObj, speed1, speed2) {
    let choice = Math.random();
    if (choice <= 0.5) {
        restartCycling(segment1,  null, speed1, arrowObj);
    }
    else {
        restartCycling(segment2, null, speed2, arrowObj);
    }
    //delete dangling dialog(s)
    $.each(BootstrapDialog.dialogs, function(id, dialog){
                            dialog.close();
    });
}

function restartCycling(segment, dialogRef, speed, arrowObj) {
    activeSegment = segment; 
    // position = 0;
    resetPosition(); 
    if (dialogRef) {
        dialogRef.close();
    }
    timer_id = setTimeout(check, period);
    if (choose_timer_id) {
        clearTimeout(choose_timer_id);
        choose_timer_id = null;
    }
    if (speed) {
       setBikeSpeed(speed);
    }
    if (arrowObj) {
       arrowObj.position.z = -1; // hide directional arrows
    }
    
    bike.anim.paused = false;
    setActiveCamera(trailingCamera);
    setHLIntensity(4.0);
}

function decisionPoint1()
{

    choose_timer_id = setTimeout(chooseForRider, choose_period, 1, 3, town.dp1Arrows, null, 10);  // args: segment1, segment2, speed1, speed2

    let $textAndPic = $('<div></div>');

    $textAndPic.append('<img src="./images/right.png" />');

    previousActive = activeSegment;
    town.dp1Arrows.position.z = 1;
    let dialog = BootstrapDialog.show({
        title: 'DP-1: 5 seconds to choose a direction',
        cssClass: 'decisionPoint1',
        message: $textAndPic,
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue Straight',
            cssClass: 'btn-primary',
            action: function(dialogRef){
              restartCycling(1, dialogRef, null, town.dp1Arrows);
              //town.dp1Arrows.position.z = -1;
              // setActiveCamera(trailingCamera);
            }
        }, {
            label: 'Turn Right',
            cssClass: 'btn-danger',
            action: function(dialogRef){
  
                restartCycling(3, dialogRef, 10, town.dp1Arrows);
                // town.dp1Arrows.position.z = -1;
                // setActiveCamera(trailingCamera);
            }
        }, {
            label: 'Look Left',
            cssClass: 'btn-success',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = Math.PI;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-warning',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = 0;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }]

    });

}      

function decisionPoint2()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 2, 4, town.dp2Arrows, 2, 2);  // args: segment1, segment2, etc.
    let $textAndPic = $('<div class="decisionPoint"></div>');
    $textAndPic.append('<img src="./images/stop.png" />');
 
    previousActive = activeSegment;
    town.dp2Arrows.position.z = 1;
    BootstrapDialog.show({
        title: 'DP-2: 5 seconds to choose a direction',
        cssClass: 'decisionPoint1',
        message: $textAndPic,
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue Straight',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(2, dialogRef, 2, town.dp2Arrows);
                // town.dp2Arrows.position.z = -1;
                // setActiveCamera(trailingCamera);
            }
        }, {
            label: 'Turn Right',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(4, dialogRef, 2, town.dp2Arrows);
                // town.dp2Arrows.position.z = -1;
                // setActiveCamera(trailingCamera);
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-warning',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = 0;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }]
    });
    
}

function decisionPoint3()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 6, 5, town.dp3Arrows, null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div class="decisionPoint"></div>');
    $textAndPic.append('Caution: potential car door opening! <br />');

    previousActive = activeSegment;
    town.dp3Arrows.position.z = 1;
    BootstrapDialog.show({
        title: 'DP-3: Defensive Riding: 5 seconds to choose a direction',
        cssClass: 'decisionPoint1',
        message: $textAndPic,
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue Straight',
            cssClass: 'btn-danger',
            action: function(dialogRef){
               restartCycling(6, dialogRef, null, town.dp3Arrows);
               // town.dp3Arrows.position.z = -1;
               // setActiveCamera(trailingCamera);
            }
        }, {
            label: 'Steer Away',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(5, dialogRef, null, town.dp3Arrows);
                // town.dp3Arrows.position.z = -1;
                // setActiveCamera(trailingCamera);

            }
        }, {
            label: 'Look Back',
            cssClass: 'btn-warning',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = -Math.PI;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }]
    });
   
}

function decisionPoint4()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 8, 7, town.dp4Arrows, null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div class="decisionPoint"></div>');
    $textAndPic.append('<img src="./images/left.png" />');
    
    previousActive = activeSegment;
    town.dp4Arrows.position.z = 1;
    BootstrapDialog.show({
        title: 'DP-4: Safe Riding: 5 seconds to choose a direction',
        cssClass: 'decisionPoint2',
        message: $textAndPic,
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Turn Left',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(8, dialogRef, null, town.dp4Arrows);
                // town.dp4Arrows.position.z = -1;
  
            }
        }, {
            label: 'Continue Straight',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(7, dialogRef, null, town.dp4Arrows);
                // town.dp4Arrows.position.z = -1;
            }
        }, {
            label: 'Look Left',
            cssClass: 'btn-success',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = Math.PI/2;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-warning',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = -Math.PI/2;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }    
        }]
    });
   
}

function decisionPoint5()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 10, 9, town.dp5Arrows, null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div class="decisionPoint"></div>');
    $textAndPic.append('<img src="./images/right.png" />');
    
    previousActive = activeSegment;
    town.dp5Arrows.position.z = 1;
    BootstrapDialog.show({
        title: 'DP-5: Don\'t Tempt Drivers: 5 seconds to choose a direction',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Turn Right',
            cssClass: 'btn-primary',
            action: function(dialogRef) {
                restartCycling(10, dialogRef, null, town.dp5Arrows);
                // town.dp5Arrows.position.z = -1;
    
            }
        }, {
            label: 'Continue Straight',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(9, dialogRef, null, town.dp5Arrows);
                // own.dp5Arrows.position.z = -1;
            }
                }, {
            label: 'Look Left',
            cssClass: 'btn-success',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = Math.PI;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-warning',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = 0;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }]
    });
   
}

function decisionPoint6()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 13, 14, town.dp6Arrows, null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div class="decisionPoint"></div>');
    $textAndPic.append('<img src="./images/left.png" />');
    
    previousActive = activeSegment;
    town.dp6Arrows.position.z = 1;
    BootstrapDialog.show({
        title: 'DP-6: Don\'t take chances: 5 seconds to choose a direction',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Turn Left',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling (13, dialogRef, null, town.dp6Arrows);
                // town.dp6Arrows.position.z = -1;    
            }
        }, {
            label: 'Continue Straight',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(14, dialogRef, null, town.dp6Arrows);
                // town.dp6Arrows.position.z = -1; 
            }
                }, {
            label: 'Look Left',
            cssClass: 'btn-success',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = Math.PI/2;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }, {
            label: 'Look Back',
            cssClass: 'btn-warning',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = Math.PI;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }]
    });
   
}

function decisionPoint7()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 11, 12, town.dp7Arrows, null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div class="decisionPoint"></div>');
    $textAndPic.append('<img src="./images/left.png" />');
    
    previousActive = activeSegment;
    town.dp7Arrows.position.z = 1; 

    BootstrapDialog.show({
        title: 'DP-7: Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Turn Left',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(11, dialogRef, null, town.dp7Arrows);
                // town.dp7Arrows.position.z = -1; 
            }
        }, {
            label: 'Cross to Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(12, dialogRef, null, town.dp7Arrows);
                // town.dp7Arrows.position.z = -1; 

            }
        }, {
            label: 'Look Left',
            cssClass: 'btn-success',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = Math.PI/2;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-warning',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = -Math.PI/2;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }]
    });
   
}

function decisionPoint8()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 9, 10, town.dp8Arrows, null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div class="decisionPoint"></div>');
    $textAndPic.append('<img src="./images/left.png" />');
    
    previousActive = activeSegment;
    town.dp8Arrows.position.z = 1; 
    BootstrapDialog.show({
        title: 'DP-8: Defensive Riding: Don\'t take chances',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Turn Left',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(9, dialogRef, null, town.dp8Arrows);
                // town.dp8Arrows.position.z = -1; 
            }
        }, {
            label: 'Continue Straight to Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(10, dialogRef, null, town.dp8Arrows);
                // town.dp8Arrows.position.z = -1; 
            }
                }, {
            label: 'Look Left',
            cssClass: 'btn-success',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = Math.PI/2;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-warning',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = -Math.PI/2;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }]
    });
   
}

function decisionPoint9()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 15, 16, town.dp9Arrows, null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div class="decisionPoint"></div>');
    previousActive = activeSegment;
    town.dp9Arrows.position.z = 1; 
    BootstrapDialog.show({
        title: 'DP-9: Defensive Riding: Heavy Traffic Alert!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue on Road',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(15, dialogRef, null, town.dp9Arrows);
                // town.dp9Arrows.position.z = -1; 
            }
        }, {
            label: 'Cross to Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(16, dialogRef, null, town.dp9Arrows);    
                // town.dp9Arrows.position.z = -1; 
            }
        }, {
            label: 'Look Back',
            cssClass: 'btn-warning',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = -Math.PI/2;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-success',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = 0;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }]
    });
   
}

function decisionPoint10()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 17, 18, town.dp10Arrows, null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div class="decisionPoint"></div>');
 
    previousActive = activeSegment;
    town.dp10Arrows.position.z = 1; 

    BootstrapDialog.show({
        title: 'DP-10: Pedestrians Alert VS Heavy Traffic Alert!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue on Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(17, dialogRef, null, town.dp10Arrows);
                // town.dp10Arrows.position.z = -1;
            }
        }, {
            label: 'Cross to Roadside',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(18, dialogRef, null, town.dp10Arrows);
                // town.dp10Arrows.position.z = -1;
            }
        }, {
            label: 'Look Back',
            cssClass: 'btn-warning',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = -Math.PI;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }]
    });
   
}

function decisionPoint11()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 19, 20, town.dp11Arrows, null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div class="decisionPoint"></div>');
 
    previousActive = activeSegment;
    town.dp11Arrows.position.z = 1;
    BootstrapDialog.show({
        title: 'DP-11: Pedestrians Alert VS Heavy Traffic Alert!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue on Roadside',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(19, dialogRef, null, town.dp11Arrows);
                // town.dp11Arrows.position.z = -1;
            }
        }, {
            label: 'Cross to Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(20, dialogRef, null, town.dp11Arrows);
                // town.dp11Arrows.position.z = -1;
            }
        }, {
            label: 'Look Left',
            cssClass: 'btn-success',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = Math.PI;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-warning',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = 0;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }]
    });
   
}

function decisionPoint12()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 21, 22, town.dp12Arrows, null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div class="decisionPoint"></div>');
 
    previousActive = activeSegment;
    town.dp12Arrows.position.z = 1;
    BootstrapDialog.show({
        title: 'DP-12: Pedestrians Alert VS Heavy Traffic Alert!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue on Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(21, dialogRef, null, town.dp12Arrows);
                // town.dp12Arrows.position.z = -1;
            }
        }, {
            label: 'Cross to Roadside',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(22, dialogRef, null, town.dp12Arrows);
                // town.dp12Arrows.position.z = -1;
            }
        }, {
            label: 'Look Back',
            cssClass: 'btn-warning',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = -Math.PI/2;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }]
    });
   
}

function decisionPoint13()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 23, 24, town.dp13Arrows, null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div class="decisionPoint"></div>');

    previousActive = activeSegment;
    town.dp13Arrows.position.z = 1;
    BootstrapDialog.show({
        title: 'DP-13: Pedestrians Alert VS Heavy Traffic Alert!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue on Roadside',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(23, dialogRef, null, town.dp13Arrows);
                // town.dp13Arrows.position.z = -1;
            }
        }, {
            label: 'Cross to Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(24, dialogRef, null, town.dp13Arrows);
                // town.dp13Arrows.position.z = -1;
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-success',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = -Math.PI/2;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }, {
            label: 'Look Back',
            cssClass: 'btn-warning',
            action: function(dialogRef){
                setActiveCamera(inspectCamera);
                let temp =  new THREE.Vector3;
                temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
                inspectCamera.position.lerp(temp, 0.2);
                inspectCamera.lookAt( bike.mesh.position );
                inspectCamera.rotation.x = 0;
                inspectCamera.rotation.y = -Math.PI;
                inspectCamera.rotation.z = 0;
                inspect_id = setTimeout(resetCamera, inspect_period);
            }
        }]
    });
   
}

function journeyCompleted() {

    let $textAndPic = $('<div class="decisionPoint"></div>');
 
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
                restartCycling(0,dialogRef);
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



export {activeSegment, resetSegment, resetPosition, getBikeSpeed, getPosition, setPosition};
