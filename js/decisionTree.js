'use strict';

// import {resetPosition, setSpeed} from './scene3d';
// import {createPaths, pathList} from './bikePaths';
import {pathList} from './bikePaths';
import {bike} from './bikeLoad';
import {setActiveCamera, hoveringCamera, trailingCamera, inspectCamera} from './cameraControls';
import {setHLIntensity} from './createLights';
import {town} from './townLoad';
import {visibilityDuringGame, visibilityOutsideGame, hideCameraSelect, showCameraSelect} from './hide';

let decisionPoints = [];
let period = 2000; // periodic timer
let activeSegment = 0;
let position = 0;
let bikeSpeed = 2;
let list = pathList;
let previousActive = null;
let timer_id = null;
let inspect_id = null, inspect_period = 500, initReward = 100, bonus = 0;
let choose_timer_id = null, countdown_interval_id = null, choose_period = 20000, interval = null, reward = initReward, timeoutLoss = 10, badDecision = 20, goodDecision = 20, goodHabit = 5;

function resetReward() {
    reward = initReward;
    bonus = 0;
}

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

function cleanup() {

    resetReward();
    // resetSegment();
    // resetPosition();

    //delete dangling dialog(s)
    $.each(BootstrapDialog.dialogs, function(id, dialog) {
                            dialog.close();
    });
    // Cleanup timers
    if (choose_timer_id) {
        clearTimeout(choose_timer_id);
        choose_timer_id = null;
    }
    if (timer_id)
    {
        clearTimeout(timer_id);
    }
    if (countdown_interval_id) {
        clearInterval(countdown_interval_id);
    }
    $.each(town.dpArrows, function(id, dpArrow) {
        dpArrow.position.z = -1;
    });
    restartCycling(0);
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
     
     setBikeSpeed(2 + 5*Math.random());
     setHLIntensity(6);
     // bike.anim1.paused = true;
     bike.anim.paused = true;
     hideCameraSelect();
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
    reward -= timeoutLoss; // User did respond in time - penalize
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

function restartCycling(segment, dialogRef, speed, arrowObj, curInterval) {
    reward += bonus;
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
       setBikeSpeed(speed+getBikeSpeed());
    }
    if (arrowObj) {
       arrowObj.position.z = -1; // hide directional arrows
    }
    if (curInterval) {
        clearInterval(curInterval);
    }
    bike.anim.paused = false;
    setActiveCamera(trailingCamera);
    setHLIntensity(4.0);
    showCameraSelect();

}

function displayCountdown(seconds_left) {

    interval = setInterval(function() {
        bonus = seconds_left;
        if ((seconds_left <= 6) && (seconds_left > 0)) {
            $( ".display_cnt" ).html( "<font color='red'>" + --seconds_left + "</font>" );

        } else if (seconds_left > 0) {
            $('.display_cnt').html(--seconds_left);
        }
        if (seconds_left <= 0)
        {
           // $('#display_id').append("<span>Going with Random Choice!</span>");
           clearInterval(interval);
           interval = null;
           seconds_left = 0;
        }
    }, 1000);
    return interval;
}

function setInspectCamera(rotateY) {
    setActiveCamera(inspectCamera);
    let temp =  new THREE.Vector3;
    temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
    inspectCamera.position.lerp(temp, 0.2);
    inspectCamera.lookAt( bike.mesh.position );
    inspectCamera.rotation.x = 0;
    inspectCamera.rotation.y = rotateY;
    inspectCamera.rotation.z = 0;
    inspect_id = setTimeout(resetCamera, inspect_period);
    reward += goodHabit;
}

function decisionPoint1()
{

    choose_timer_id = setTimeout(chooseForRider, choose_period, 1, 3, town.dpArrows[0], null, 10);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div > </div>');


    countdown_interval_id = displayCountdown(choose_period/1000);
    // $textAndPic.append('<img src="./images/right.png" />');
    $textAndPic.append("<strong>CountDown: </strong> <span class=display_cnt> </span>");
    previousActive = activeSegment;
    town.dpArrows[0].position.z = 1;
    let dialog = BootstrapDialog.show({
        title: 'DP-1: Limited Time to decide!',
        cssClass: 'decisionPoint1',
        message: $textAndPic,
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue Straight',
            cssClass: 'btn-primary',
            action: function(dialogRef){
              reward -= badDecision; // risky move to pass next to parked car.
              restartCycling(1, dialogRef, null, town.dpArrows[0], countdown_interval_id);
            }
        }, {
            label: 'Turn Right',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                reward += goodDecision; // reward defensive choice
                restartCycling(3, dialogRef, 1, town.dpArrows[0], countdown_interval_id);
            }
        }, {
            label: 'Look Left',
            cssClass: 'btn-success lookout',
            action: function(dialogRef){
                setInspectCamera(Math.PI);
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-warning lookout1',
            action: function(dialogRef){
                setInspectCamera(0);
            }
        }]

    });

}      

function decisionPoint2()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 2, 4, town.dpArrows[1], 2, 2);  // args: segment1, segment2, etc.
    let $textAndPic = $('<div ></div>');
    countdown_interval_id = displayCountdown(choose_period/1000);
    $textAndPic.append("<strong>CountDown: </strong> <span class=display_cnt> </span>");
 
    previousActive = activeSegment;
    town.dpArrows[1].position.z = 1;
    BootstrapDialog.show({
        title: 'DP-2: Limited seconds to choose a direction!',
        cssClass: 'decisionPoint1',
        message: $textAndPic,
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue Straight',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(2, dialogRef, 2, town.dpArrows[1], countdown_interval_id);
                reward += goodDecision;
            }
        }, {
            label: 'Turn Right',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                reward -= badDecision;
                restartCycling(4, dialogRef, 1, town.dpArrows[1], countdown_interval_id);
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-warning lookout',
            action: function(dialogRef){
                setInspectCamera(0);
            }
        }]
    });
    
}

function decisionPoint3()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 6, 5, town.dpArrows[2], null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div ></div>');
    $textAndPic.append('Caution: potential car door opening! <br />');
    countdown_interval_id = displayCountdown(choose_period/1000);
    $textAndPic.append("<strong>CountDown: </strong> <span class=display_cnt> </span>");
    previousActive = activeSegment;
    town.dpArrows[2].position.z = 1;
    BootstrapDialog.show({
        title: 'DP-3: Limited seconds to choose a direction!',
        cssClass: 'decisionPoint1',
        message: $textAndPic,
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue Straight',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                reward -= badDecision;
                restartCycling(6, dialogRef, null, town.dpArrows[2], countdown_interval_id);

            }
        }, {
            label: 'Steer Away',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                reward += goodDecision;
                restartCycling(5, dialogRef, null, town.dpArrows[2], countdown_interval_id);

            }
        }, {
            label: 'Look Back',
            cssClass: 'btn-warning lookout',
            action: function(dialogRef){
                setInspectCamera(-Math.PI);
            }
        }]
    });
   
}

function decisionPoint4()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 8, 7, town.dpArrows[3], null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div ></div>');
    // $textAndPic.append('<img src="./images/left.png" />');
    countdown_interval_id = displayCountdown(choose_period/1000);
    $textAndPic.append("<strong>CountDown: </strong> <span class=display_cnt> </span>");
    previousActive = activeSegment;
    town.dpArrows[3].position.z = 1;
    BootstrapDialog.show({
        title: 'DP-4: Limited seconds to choose a direction!',
        cssClass: 'decisionPoint2',
        message: $textAndPic,
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Turn Left',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(8, dialogRef, null, town.dpArrows[3], countdown_interval_id);
  
            }
        }, {
            label: 'Continue Straight',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(7, dialogRef, null, town.dpArrows[3], countdown_interval_id);
            }
        }, {
            label: 'Look Left',
            cssClass: 'btn-success lookout',
            action: function(dialogRef){
                setInspectCamera(Math.PI/2);
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-warning lookout1',
            action: function(dialogRef){
                setInspectCamera(-Math.PI/2);
            }    
        }, {
            label: 'Look Back',
            cssClass: 'btn-info lookout2',
            action: function(dialogRef){
                setInspectCamera(-Math.PI);
            }    
        }]
    });
   
}

function decisionPoint5()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 10, 9, town.dpArrows[4], null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div ></div>');
    // $textAndPic.append('<img src="./images/right.png" />');
    countdown_interval_id = displayCountdown(choose_period/1000);
    $textAndPic.append("<strong>CountDown: </strong> <span class=display_cnt> </span>");

    previousActive = activeSegment;
    town.dpArrows[4].position.z = 1;
    BootstrapDialog.show({
        title: 'DP-5: Don\'t Tempt Drivers!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Turn Right',
            cssClass: 'btn-primary',
            action: function(dialogRef) {
                restartCycling(10, dialogRef, null, town.dpArrows[4], countdown_interval_id);
    
            }
        }, {
            label: 'Continue Straight',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(9, dialogRef, null, town.dpArrows[4], countdown_interval_id);
            }
                }, {
            label: 'Look Left',
            cssClass: 'btn-success lookout',
            action: function(dialogRef){
                setInspectCamera(Math.PI);
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-warning lookout1',
            action: function(dialogRef){
                setInspectCamera(0);
            }
        }]
    });
   
}

function decisionPoint6()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 13, 14, town.dpArrows[5], null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div ></div>');
    // $textAndPic.append('<img src="./images/left.png" />');
    countdown_interval_id = displayCountdown(choose_period/1000);
    $textAndPic.append("<strong>CountDown: </strong> <span class=display_cnt> </span>");

    previousActive = activeSegment;
    town.dpArrows[5].position.z = 1;
    BootstrapDialog.show({
        title: 'DP-6: Limited seconds to choose a direction',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Turn Left',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling (13, dialogRef, null, town.dpArrows[5], countdown_interval_id);
            }
        }, {
            label: 'Continue Straight',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                restartCycling(14, dialogRef, null, town.dpArrows[5], countdown_interval_id);
            }
                }, {
            label: 'Look Left',
            cssClass: 'btn-success lookout',
            action: function(dialogRef){
                setInspectCamera(Math.PI/2);
            }
        }, {
            label: 'Look Back',
            cssClass: 'btn-warning lookout',
            action: function(dialogRef){
                setInspectCamera(Math.PI);
            }
        }]
    });
   
}

function decisionPoint7()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 11, 12, town.dpArrows[6], null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div ></div>');
    // $textAndPic.append('<img src="./images/left.png" />');
    countdown_interval_id = displayCountdown(choose_period/1000);
    $textAndPic.append("<strong>CountDown: </strong> <span class=display_cnt> </span>");
    previousActive = activeSegment;
    town.dpArrows[6].position.z = 1; 

    BootstrapDialog.show({
        title: 'DP-7: Don\'t take chances!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Turn Left',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(11, dialogRef, null, town.dpArrows[6], countdown_interval_id);
            }
        }, {
            label: 'Cross to Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                reward -= 20;
                restartCycling(12, dialogRef, null, town.dpArrows[6], countdown_interval_id);

            }
        }, {
            label: 'Look Left',
            cssClass: 'btn-success lookout',
            action: function(dialogRef){
                setInspectCamera(Math.PI/2);
               
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-warning lookout1',
            action: function(dialogRef){
                setInspectCamera(-Math.PI/2);
                
            }
        }]
    });
   
}

function decisionPoint8()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 9, 10, town.dpArrows[7], null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div ></div>');
    // $textAndPic.append('<img src="./images/left.png" />');
    countdown_interval_id = displayCountdown(choose_period/1000);
    $textAndPic.append("<strong>CountDown: </strong> <span class=display_cnt> </span>");
    previousActive = activeSegment;
    town.dpArrows[7].position.z = 1; 
    BootstrapDialog.show({
        title: 'DP-8: Don\'t take chances!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Turn Left',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(9, dialogRef, null, town.dpArrows[7], countdown_interval_id);
                // town.dp8Arrows.position.z = -1; 
            }
        }, {
            label: 'Continue Straight to Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                reward -= 20;
                restartCycling(10, dialogRef, null, town.dpArrows[7], countdown_interval_id);
            }
                }, {
            label: 'Look Left',
            cssClass: 'btn-success lookout',
            action: function(dialogRef){
                setInspectCamera(Math.PI/2);
                
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-warning lookout1',
            action: function(dialogRef){
                setInspectCamera(-Math.PI/2);
                
            }
        }]
    });
   
}

function decisionPoint9()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 15, 16, town.dpArrows[8], null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div ></div>');
    countdown_interval_id = displayCountdown(choose_period/1000);
    $textAndPic.append("<strong>CountDown: </strong> <span class=display_cnt> </span>");
    previousActive = activeSegment;
    town.dpArrows[8].position.z = 1; 
    BootstrapDialog.show({
        title: 'DP-9: Heavy Traffic Alert!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue on Road',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(15, dialogRef, null, town.dpArrows[8], countdown_interval_id);
            }
        }, {
            label: 'Cross to Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                reward -= 20;
                restartCycling(16, dialogRef, null, town.dpArrows[8], countdown_interval_id);    
            }
        }, {
            label: 'Look Back',
            cssClass: 'btn-warning lookout',
            action: function(dialogRef){
                setInspectCamera(-Math.PI/2);
             
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-success lookout1',
            action: function(dialogRef){
                setInspectCamera(0);
                
            }
        }]
    });
   
}

function decisionPoint10()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 17, 18, town.dpArrows[9], null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div ></div>');
    countdown_interval_id = displayCountdown(choose_period/1000);
    $textAndPic.append("<strong>CountDown: </strong> <span class=display_cnt> </span>");
 
    previousActive = activeSegment;
    town.dpArrows[9].position.z = 1; 

    BootstrapDialog.show({
        title: 'DP-10: Pedestrians Alert!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue on Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                reward -= 20;
                restartCycling(17, dialogRef, null, town.dpArrows[9], countdown_interval_id);
                // town.dp10Arrows.position.z = -1;
            }
        }, {
            label: 'Cross to Roadside',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(18, dialogRef, null, town.dpArrows[9], countdown_interval_id);
            }
        }, {
            label: 'Look Back',
            cssClass: 'btn-warning lookout',
            action: function(dialogRef){
                setInspectCamera(-Math.PI);
               
            }
        }]
    });
   
}

function decisionPoint11()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 19, 20, town.dpArrows[10], null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div ></div>');
    countdown_interval_id = displayCountdown(choose_period/1000);
    $textAndPic.append("<strong>CountDown: </strong> <span class=display_cnt> </span>");
    previousActive = activeSegment;
    town.dpArrows[10].position.z = 1;
    BootstrapDialog.show({
        title: 'DP-11: Pedestrians Alert!!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue on Roadside',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(19, dialogRef, null, town.dpArrows[10], countdown_interval_id);
            }
        }, {
            label: 'Cross to Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                reward -= 20;
                restartCycling(20, dialogRef, null, town.dpArrows[10], countdown_interval_id);
            }
        }, {
            label: 'Look Left',
            cssClass: 'btn-success lookout',
            action: function(dialogRef){
                setInspectCamera(Math.PI);
                
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-warning lookout1',
            action: function(dialogRef){
                setInspectCamera(0);
                
            }
        }]
    });
   
}

function decisionPoint12()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 21, 22, town.dpArrows[11], null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div ></div>');
    countdown_interval_id = displayCountdown(choose_period/1000);
    $textAndPic.append("<strong>CountDown: </strong> <span class=display_cnt> </span>");

    previousActive = activeSegment;
    town.dpArrows[11].position.z = 1;
    BootstrapDialog.show({
        title: 'DP-12: Heavy Traffic Alert!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue on Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                reward -= 20;
                restartCycling(21, dialogRef, null, town.dpArrows[11], countdown_interval_id);
            }
        }, {
            label: 'Cross to Roadside',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(22, dialogRef, null, town.dpArrows[11], countdown_interval_id);
            }
        }, {
            label: 'Look Back',
            cssClass: 'btn-warning lookout',
            action: function(dialogRef){
                setInspectCamera(-Math.PI/2);
              
            }
        }]
    });
   
}

function decisionPoint13()
{
    choose_timer_id = setTimeout(chooseForRider, choose_period, 23, 24, town.dpArrows[12], null, null);  // args: segment1, segment2, speed1, speed2
    let $textAndPic = $('<div ></div>');
    countdown_interval_id = displayCountdown(choose_period/1000);
    $textAndPic.append("<strong>CountDown: </strong> <span class=display_cnt> </span>");
    previousActive = activeSegment;
    town.dpArrows[12].position.z = 1;
    BootstrapDialog.show({
        title: 'DP-13: Pedestrians Alert/Traffic Alert!',
        message: $textAndPic,
        cssClass: 'decisionPoint2',
        closeByBackdrop: false,
        closeByKeyboard: false,
        buttons: [{
            label: 'Continue on Roadside',
            cssClass: 'btn-primary',
            action: function(dialogRef){
                restartCycling(23, dialogRef, null, town.dpArrows[12], countdown_interval_id);
            }
        }, {
            label: 'Cross to Sidewalk',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                reward -= 20;
                restartCycling(24, dialogRef, null, town.dpArrows[12], countdown_interval_id);
            }
        }, {
            label: 'Look Right',
            cssClass: 'btn-success lookout',
            action: function(dialogRef){
                setInspectCamera(-Math.PI/2);
                
            }
        }, {
            label: 'Look Back',
            cssClass: 'btn-warning lookout1',
            action: function(dialogRef){
                setInspectCamera(-Math.PI);
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
                resetReward();
                restartCycling(0,dialogRef);
            }
        }, {
            label: 'Leave Game',
            cssClass: 'btn-danger',
            action: function(dialogRef){
                visibilityOutsideGame();
                showCameraSelect();
                dialogRef.close();
                return;
            }
        }]
    });
}



export {activeSegment, resetSegment, resetPosition, getBikeSpeed, getPosition, setPosition, cleanup, reward};
