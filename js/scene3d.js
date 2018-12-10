/*
  Create a 3D Scene for our town and cycling routes
*/
'use strict';

import debug3dAxes from './dbg_3d_coord';
import {infoButton, selectCameraView} from './info';
import {createPaths, pathList, CarSegments, PedSegments} from './bikePaths';
import Colors from './colors';
import {activeSegment, resetSegment, resetPosition, getBikeSpeed, getPosition, setPosition, cleanup, reward} from './decisionTree';
import {createBike, bike} from './bikeLoad';
import {createTown, town, parkedCarDoor, cars, pedestrians} from './townLoad';
import {createCameras, getActiveCamera, setActiveCamera, hoveringCamera, trailingCamera, orbitControls, inspectCamera} from './cameraControls';
import {createLight} from './createLights';
import {visibilityDuringGame, visibilityOutsideGame, hideCameraSelect, hideAll} from './hide';

let renderer, scene;
let carPosition = 0, boy1Position = 0, robot1Position = 0;
let keyboard = new THREEx.KeyboardState();
let carSpeed = 0.1, pedSpeed = 0.05;
let animId = null;
let gameEnd = false;
let clock = new THREE.Clock();
let rs_logo = null, bike_anim = null;
let backReset = false, backReset1 = false;
let forwardReset = true, forwardReset1 = true;
let pauseCount = 0, pauseCount1 = 0, pauseCount2 = 0, crashed = false;


function createScene() {
  //This function will create the scene, the camera and the renderer
  // for this project
  //The aspect ratio of the camera will be derived from the window's height
  // width. the same parameters will be used for the renderer
  let height = window.innerHeight;
  let width = window.innerWidth;
  scene = new THREE.Scene(); // for now scene is declared as a global variable
  scene.fog = new THREE.Fog(Colors.white, 100, 1000);

  scene.add(debug3dAxes(100));
 
  scene.rotation.z += Math.PI/2;
  scene.rotation.x -= Math.PI/2;

  renderer = new THREE.WebGLRenderer({ 
    
    alpha: true, 

    antialias: true // will experiment with turning this on
  });
  renderer.setSize( width, height );
  // Enable shadow rendering for now
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  // Add the DOM element of the renderer to the 
  // div townId container 
  let container = document.getElementById('townId');
  container.appendChild(renderer.domElement);

 
  rs_logo = lottie.loadAnimation({
    container: document.getElementById('logo'), // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'js/data_rs.json' // the path to the animation json
  });

  bike_anim = lottie.loadAnimation({
    container: document.getElementById('bike'), // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'js/data_bike.json' // the path to the animation json
  });
  // scene.add(anim); Illegal anim is not a THREE.Object3D()

  infoButton();
  selectCameraView();

}



let Sky = function(){
  this.mesh = new THREE.Object3D();
  // Should add some birds and other flying objects
  
}


function createSky(){
  sky = new Sky();
  sky.mesh.position.y = -600;
  scene.add(sky.mesh);
}

let Road = function(){
  // this.mesh = new THREE.Object3D();
  let geometry = new THREE.PlaneGeometry( 1000, 2000);
  let material = new THREE.MeshBasicMaterial( {color: Colors.red, side: THREE.DoubleSide} );
  this.mesh = new THREE.Mesh( geometry, material );
  this.mesh.castShadow = true;
  this.mesh.position.set(0,0,-5);
}

function createRoad() {
  let road = new Road();
  road.mesh.position.y = -600;
  scene.add(road.mesh);
}

function createFloor() {
  // create floor
  let material = new THREE.MeshBasicMaterial({wireframe:true, color: 0x000000});
  let geometry = new THREE.PlaneGeometry(500, 500, 20, 20);
  let floor = new THREE.Mesh(geometry, material);
  let container = new THREE.Object3D();
  container.add(floor);
  scene.add(container);

}

// Algorithm based on simple 2D collision of objects with Axis-aligned bounding boxes (i.e no rotation)
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
// A collision occurs if any of the parts of the bounding boxes intersect.
function simpleCollision(obj1, obj2) 
{
  if (obj1 === null || obj2 === null) {
    return false;
  }
  if (obj1.position.x < obj2.position.x + obj2.wide &&
      obj1.position.x + obj1.wide > obj2.position.x &&
      obj1.position.y < obj2.position.y + obj2.long &&
      obj1.long + obj1.position.y > obj2.position.y) 
  {
    return true;
  }
  else
  {
    return false;
  }
}

function welcomeDialog() {
    let $textAndPic = $('<div class="welcomeDialog"></div>');
    $textAndPic.append('<img src="./images/gameLayout.png" />');
    $textAndPic.append('<video controls width="500" autoplay="true"> \
          <source src="./images/sampleRide.mp4" type="video/mp4"> \
          <source src="./images/sampleScene.png"> \
          Sorry, your browser doesn\'t support embedded videos. \
          </video>');
    $textAndPic.append('<p> In this level, the user is prompted to choose alternate paths for the cyclist. \
                        The objective of the game to \n make it to the end without a crash.</p>');
    $textAndPic.append('<div class="row"> \
                          <div class="border col-md-6 boxlayout"> \
                             <ul> Sample Interactions: \
                               <li> Cyclist stops at intersection. The user has to decide between going straight or turning right.</li> \
                               <li> Cyclist can and SHOULD check surrounding traffic before deciding on the next move. </li> \
                               <li> Cyclist can check the View from Behind, Right Side and/or Left Side.</li>\
                               <li> If the Cyclist does not make a choice when COUNTDOWN reaches 0, A random choice is done.</li> \
                             </ul> \
                          </div> \
                          <div class="border col-md-6 boxlayout"> \
                            <ul> Controls: \
                              <li> To Choose the Top Hovering Camera, Press 1 (Mobile: Red Camera Icon)</li> \
                              <li> To Choose the Trailing Camera, Press 2 (Mobile: Black Camera Icon)</li> \
                              <li> To Zoom in and Out, use middle mouse wheel(Mobile TBD)</li> \
                              <li> To Rotate around the Z axis, use left mouse button(Mobile TBD)</li> \
                              <li> To move the TOP Camera around, use right mouse button (Mobile: screen touch)</li> \
                            </ul> \
                          </div> \
                        </div>');
    
    BootstrapDialog.show({
      title: 'Ride Safely Interactive',
      message: $textAndPic,
      closeByBackdrop: false,
      closeByKeyboard: false,
      buttons: [{
        label: 'Start Game',
        cssClass: 'btn-success',
        action: function(dialogRef){
          visibilityDuringGame();
          dialogRef.close();
          // gameEnd = false;
          animate();
        }
      }, {
        label: 'Quit Game',
        cssClass: 'btn-danger',
        action: function(dialogRef) {
          visibilityOutsideGame();
          dialogRef.close();
          return;
        }
    }]
  });
}

function restartGame(dialogRef) 
{

  // location.reload();
  cleanup();
  // resetReward();
  // resetPosition();
  // resetSegment();
  // dialogRef.close();
  gameEnd = false;
  animate();

}

function crashBike() {
  // bike.mesh.rotation.z = 0.2;
  // bike.mesh.position.set(bike.mesh.position.x-0.2, bike.mesh.position.y-0.2,bike.mesh.position.z); 
  // bike.rider.position.set(3,3,-9);
  // bike.rider.rotation.z = 0.3;
  $.each(BootstrapDialog.dialogs, function(id, dialog) {
                            dialog.close();
    });
  cleanup(); // cleanup dangling timers 
  hideCameraSelect();
  BootstrapDialog.show({
      title: 'Game Over!',
      message: "Ready to Restart the Game?",
      closeByBackdrop: false,
      closeByKeyboard: false,
      buttons: [{
          label: 'Restart Game',
          cssClass: 'btn-success',
          action: function(dialogRef){
              restartGame(dialogRef);
              // dialogRef.close();
              // gameEnd = false;
          }
      }, {
          label: 'Leave Game',
          cssClass: 'btn-danger',
          action: function(dialogRef){
              visibilityOutsideGame();
              cancelAnimationFrame(animId);

              dialogRef.close();
              gameEnd = true;
              return;
          }
      }]
  });
  // stops further animation
  gameEnd = true;
}

function collisionTests(segment) {

  if (segment === 0)
  {
    return;
  }
  
  if (simpleCollision(bike.mesh, cars.redCar) === true) {
    console.log("Hit Red Car!");
    crashBike();
  }

  if (simpleCollision(bike.mesh, cars.blueCar) === true) {
    console.log("Hit Blue Car!");
    crashBike();
  }
  if (simpleCollision(bike.mesh, cars.greenCar) === true) {
    console.log("Hit Blue Car!");
    crashBike();
  }
  if (simpleCollision(bike.mesh, cars.yellowCar1) === true) {
    console.log("Hit Blue Car!");
    crashBike();
  }

  if (simpleCollision(bike.mesh, pedestrians.walkingBoy) === true) {
    console.log("Hit Boy!");
    crashBike();
  }

  if (simpleCollision(bike.mesh, pedestrians.walkingGirl) === true) {
    console.log("Hit Girl!");
    crashBike();

  }

  if (simpleCollision(bike.mesh, pedestrians.walkingGirl1) === true) {
    console.log("Hit Girl 1!");
    crashBike();

  }
  if (simpleCollision(bike.mesh, pedestrians.runningRobot) === true) {
    console.log("Hit Running Robot!");
    crashBike();

  }

  if (simpleCollision(bike.mesh, pedestrians.runningRobot1) === true) {
    console.log("Hit Running Robot1!");
    crashBike();
    
  }

  if (parkedCarDoor !== null) {
    if (segment === 6) {
      // moving towards parked car. For now just open the door
      if (Math.random() < 0.025) {
         parkedCarDoor.bone.rotation.z = -1.5;
         parkedCarDoor.doorCollider.position.y = -170;
      }
      // rayCollision();
      
      if (simpleCollision(bike.mesh, parkedCarDoor.doorCollider))
      {
        console.log("Hit Car Door!");
        crashBike();
      }
    }
    else {
      parkedCarDoor.bone.rotation.z = 0;
      parkedCarDoor.doorCollider.position.y = -172;
    }
  }
}

function updateScore() {
  $('#score').text("SCORE: " + reward);
}

function updateBike( segment ) {

  let temp = new THREE.Vector3;

  if (pathList === null) {
    return;
  }
  // add up position for movement
  let pos = getPosition();
  pos += 0.002 * getBikeSpeed() ;
  setPosition(pos);
  
  let point = pathList[segment].getPoint( getPosition());
  if (point === null) {
    
     return;
  }
  if (bike === null) {
    return;
  }
  if (bike.mesh === null) {
    return;
  }
  // GET RID OF AE side animation to avoid distraction
  rs_logo.destroy();
  bike_anim.destroy();

  bike.mesh.position.x = point.x;
  bike.mesh.position.y = point.y;
  
  temp.setFromMatrixPosition(bike.mesh.tripod.matrixWorld);
    
  inspectCamera.position.lerp(temp, 0.2);
  inspectCamera.lookAt( bike.mesh.position );
 
  let angle = getAngle(segment, getPosition());
  if (angle > 0) {
    angle = - Math.PI + angle;
  }
   if ((segment > 40) && (segment !== 52) && (segment !== 60) && (segment !== 66) && (segment !== 74) && (segment !== 75) && (segment !== 76) && (segment !== 77) && (segment !== 85)) 
   {
     angle -= Math.PI;
  }
  let up = new THREE.Vector3( 0, 0, 1 );

  // set the quaternion
  bike.mesh.quaternion.setFromAxisAngle( up, angle );
  
  if (bike.mesh.children.length > 4) 
  {
    // pedals.rotation.x -= 0.08;
    bike.front_wheel.rotation.x -=0.1;
    bike.back_wheel.rotation.x -=0.1;

    // collisionTests(segment);
    
  }
}

function obeySignLaw(segment, point) {
  if (segment === CarSegments.blueCar && (point.y === -160)) {

    if ((pauseCount > 0) && (pauseCount < 80)) 
    {
       pauseCount++;
       return true;
    }
    if (pauseCount >= 80) 
    {
      pauseCount = 0;
    }
  
    // pause at stop sign
    if ((point.x + 60.0 < 1)  &&  (point.x + 60.0 > 0)) {
      // carPosition -= 0.0015 * carSpeed ;
      pauseCount = 1;
      return true;
    } 
  }
  else if ((segment === CarSegments.yellowCar1) && (point.y === -160)) {
    if ((pauseCount2 > 0) && (pauseCount2 < 80)) 
    {
       pauseCount2++;
       return true;
    }
    if (pauseCount2 >= 80) 
    {
      pauseCount2 = 0;
    }
  
    // pause at stop sign
    if ((point.x + 60.0 < 1)  &&  (point.x + 60.0 > 0)) {
      // carPosition -= 0.0015 * carSpeed ;
      pauseCount2 = 1;
      return true;
    } 
  }
  else if ((segment === CarSegments.yellowCar1) &&  (point.x === -165)) {
    if ((pauseCount1 > 0) && (pauseCount1 < 80)) 
    {
       pauseCount1++;
       return true;
    }
    if (pauseCount1 >= 80) 
    {
      pauseCount1 = 0;
    }
  
    // pause at stop sign
    if ((point.y - 170.0 < 1)  &&  (point.y - 170.0 > 0)) {
      // carPosition -= 0.0015 * carSpeed ;
      pauseCount1 = 1;
      return true;
    } 
  }

  return false;
}
function updateCar( segment , car) {
  
  // add up position for movement
  if (car === null) {
    return;
  }
  // let randomSpeed = Math.floor((Math.random() * 10) + 1)/5.0; // number between 1 and 2
  carPosition += 0.0015 * (car.speed);
  
  let point = pathList[segment].getPoint(carPosition);
  if (point === null) 
  {
     carPosition = 0;
     return;
  }
  
  if (obeySignLaw(segment, point) === true)   // stop cars at certain stop signs.
  {
    return;
  }
  
  car.position.x = point.x;
  car.position.y = point.y;
  

  let up = new THREE.Vector3( 0, 0, 1 );

  let angle = getAngle(segment, carPosition);
  if (angle > 0) {
    angle = - Math.PI + angle;
  }
  else { angle = Math.PI + angle;}
  // set the quaternion
  car.quaternion.setFromAxisAngle( up, angle );


}


function updatePedestrians() {
  
  let segment = PedSegments.boy1;
  let segment1 = PedSegments.robot1;
  // add up position for movement
  if (pedestrians === null) {
    return;
  }
  boy1Position += 0.002 * pedSpeed ;
  robot1Position += 0.005 * pedSpeed ;

  let point = pathList[segment].getPoint(boy1Position);
  let point1 = pathList[segment1].getPoint(robot1Position);
  if (point === null) {
     boy1Position = 0;
     return;
  }
  if (point1 === null) {
    robot1Position = 0;
    return;
  }
  let prevPosition = pedestrians.walkingBoy.position.y;
  let prevPosition1 = pedestrians.runningRobot.position.x;
  if (prevPosition != 0) {
    if (prevPosition > point.y && backReset === false) {
      pedestrians.walkingBoy.rotation.y = 0;
      pedestrians.walkingGirl.rotation.y = 0;
      pedestrians.walkingGirl1.rotation.y = 0;
      
      backReset = true;
      forwardReset = false;
    }
    else if (prevPosition < point.y && forwardReset === false) {
      pedestrians.walkingBoy.rotation.y = Math.PI;
      pedestrians.walkingGirl.rotation.y = Math.PI;
      pedestrians.walkingGirl1.rotation.y = Math.PI;
      backReset = false;
      forwardReset = true;
    }
  }
  if (prevPosition1 != 0) {
    if (prevPosition1 > point1.x && backReset1 === false) {
      pedestrians.runningRobot.rotation.y = 3*Math.PI/2;
      pedestrians.runningRobot1.rotation.y = 3*Math.PI/2;
      backReset1 = true;
      forwardReset1 = false;
    }
    else if (prevPosition1 < point1.x && forwardReset1 === false) {
      pedestrians.runningRobot.rotation.y = Math.PI/2;
      pedestrians.runningRobot1.rotation.y = Math.PI/2;
      backReset1 = false;
      forwardReset1 = true;
    }
  }
  pedestrians.walkingBoy.position.x = point.x;
  pedestrians.walkingGirl.position.x = point.x - 5;
  pedestrians.walkingGirl1.position.x = point.x + 5;
  
  pedestrians.walkingBoy.position.y = pedestrians.walkingGirl.position.y = point.y;
  pedestrians.walkingGirl1.position.y = point.y - 5;
  
  pedestrians.runningRobot.position.x = point1.x;
  pedestrians.runningRobot1.position.x = point1.x;
  pedestrians.runningRobot.position.y = point1.y;
  pedestrians.runningRobot1.position.y = point1.y - 5;


}

function getAngle( segment, aPosition ) {
// get the 2Dtangent to the curve
  let tangent = pathList[segment].getTangent(aPosition).normalize();

  // change tangent to 3D
  let angle = - Math.atan( tangent.x / tangent.y);
  
  return angle;
}


// render
function render() {

  orbitControls.hcontrols.update();
  orbitControls.tcontrols.update();

  if ( keyboard.pressed("1") ) {
     setActiveCamera(hoveringCamera);  
  }
  if ( keyboard.pressed("2") ) {
     setActiveCamera(trailingCamera); 
  }
  let activeCamera = getActiveCamera();
  if (activeCamera)
  {
    renderer.render(scene, activeCamera);
  }

  let delta = clock.getDelta();
  if (bike.mixer) 
  {
    bike.mixer.update(delta);
  }
  if (town.billBoard && town.billBoard.mixer) 
  {
    town.billBoard.mixer.update(delta);
  }
  if (pedestrians.walkingBoy && pedestrians.walkingBoy.mixer) 
  {
    pedestrians.walkingBoy.mixer.update(delta);
  }
  if (pedestrians.walkingBoy1 && pedestrians.walkingBoy1.mixer) 
  {
    pedestrians.walkingBoy1.mixer.update(delta);
  }
  if (pedestrians.walkingGirl && pedestrians.walkingGirl.mixer) 
  {
    pedestrians.walkingGirl.mixer.update(delta);
  }
  if (pedestrians.walkingGirl1 && pedestrians.walkingGirl1.mixer) 
  {
    pedestrians.walkingGirl1.mixer.update(delta);
  }
  if (pedestrians.runningRobot && pedestrians.runningRobot.mixer) 
  {
    pedestrians.runningRobot.mixer.update(delta);
  }
  if (pedestrians.runningRobot1 && pedestrians.runningRobot1.mixer) 
  {
    pedestrians.runningRobot1.mixer.update(delta);
  }
  // if (bike.mixer1) bike.mixer1.update(delta);
  
}
// HANDLE MOUSE EVENTS

let mousePos = { x: 0, y: 0 };

function handleMouseMove(event) {
  let tx = -1 + (event.clientX / WIDTH)*2;
  let ty = 1 - (event.clientY / HEIGHT)*2;
  mousePos = {x:tx, y:ty};
}

window.addEventListener('load', init, false);


// animate
function animate() {

  if (gameEnd === true) 
  {
    return;
  }

  let segment = activeSegment;

  updateCar(CarSegments.redCar, cars.redCar);

  updateCar(CarSegments.blueCar, cars.blueCar);

  updateCar(CarSegments.yellowCar1, cars.yellowCar1);

  updateCar(CarSegments.greenCar, cars.greenCar);

  updateBike(segment);

  updateScore();

  updatePedestrians();

  collisionTests(segment);

  animId = requestAnimationFrame(animate);

  // temp.setFromMatrixPosition(goal.matrixWorld);
  // hoveringCamera.position.lerp(temp, 0.2);
  //hoveringCamera.lookAt( bike.mesh.position );

  render();
}

export function init() {

  // set up the scene, the camera and the renderer
  createScene();


  createCameras(scene, renderer, bike);

  createFloor();
  // add the lights
  createLight(scene);

  // add town components: roads, buildings cars
  createTown();
 
  scene.add(town);

  // if ( doorCollider !== null) {
  //   collidables.push(doorCollider);
  // }
  // add the objects
  createBike();
  

  // // Bike Collider
  // let colliderGeometry = new THREE.CubeGeometry(2,3,3,1,1,1);
  // let wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
  // bikeCollider = new THREE.Mesh( colliderGeometry, wireMaterial );
  // scene.add(bikeCollider);
  scene.add(bike.mesh);

  bike.mesh.add(trailingCamera);
  setActiveCamera(trailingCamera);
  // goal.position.set(0, -400, 50);
  // bike.mesh.add(goal);

  // let ccGeometry = new THREE.CubeGeometry( 50, 50, 25, 1, 1, 1 );
  // let ccMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); //, wireframe:true } );
  
  // cc = new THREE.Mesh(ccGeometry, ccMaterial);
  // cc.position.set(250, 250,1);
  // bbox1 = new THREE.Box3();
  // bbox1.setFromObject( cc );
  
  
  // // wall.position.set(100, 50, -100);
  // scene.add(cc);
  // collidableMeshList.push(cc);

  let lines = [];

  lines = createPaths();

  for (let i = 0; i < lines.length; i++) 
  {
     scene.add(lines[i]);
  }
  // pathList = list;
  // createRoad();

  // createSky();
  
  // start a loop that will update the objects' positions 
  // and render the scene on each frame
  //animate();
  hideAll();
  welcomeDialog();
  gameEnd = false;
}


