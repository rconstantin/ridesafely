/*
  Create a 3D Scene for our town and cycling routes
*/
'use strict';

import debug3dAxes from './dbg_3d_coord';

// let THREE =  require('three');
// alternative syntax from es6
// import * as THREE from 'three';
// const scene = new THREE.Scene();

let renderer, scene, camera, controls, bike;
let angle = 0;
let position = 0;
let activeSegment = 0;
// direction vector for movement
// let direction = new THREE.Vector3(1, 0, 0);
// let up = new THREE.Vector3(0, 0, 1);
// let axis = new THREE.Vector3();
// scalar to simulate speed
let speed = 1; //2.5;
let pathList = [], decisionPoints = [];
let hemisphereLight, shadowLight;
let clock = new THREE.Clock();
let up = new THREE.Vector3( 0, 0, 1 );
let axis = new THREE.Vector3( );
let radians, tangent;
let period = 2000; // periodic timer
let back_wheel = null;
let front_wheel = null;
let rider = null;
let pedals = null;
let frame = null;

window.addEventListener('load', init, false);

let Colors = {
  red:0xC61A05,
  white:0xd8d0d1,
  brown:0x59332e,
  pink:0xF5A0F2,
  brownDark:0x23190f,
  lightblue: 0x80DFFF,
  blue:0x0000FF,
  orange:0xFC6531,
  beige: 0xEBCDA4,
  grey: 0x303030,
  yellow: 0xFFFF1A
};

function createLights() {
  // A hemisphere light is a gradient colored light; 
  // the first parameter is the sky color, the second parameter is the ground color, 
  // the third parameter is the intensity of the light
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, 0.9);
  
  // A directional light shines from a specific direction. 
  // It acts like the sun, that means that all the rays produced are parallel. 
  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

  // Set the direction of the light  
  shadowLight.position.set(150, 350, 350);
  
  // Allow shadow casting 
  shadowLight.castShadow = true;

  // define the visible area of the projected shadow
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;

  // define the resolution of the shadow; the higher the better, 
  // but also the more expensive and less performant
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;
  
  // to activate the lights, just add them to the scene
  scene.add(hemisphereLight);  
  scene.add(shadowLight);
}


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

    antialias: false // will experiment with turning this on
  });
  renderer.setSize( width, height );
  // Enable shadow rendering for now
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  // Add the DOM element of the renderer to the 
  // div townId container 
  let container = document.getElementById('townId');
  container.appendChild(renderer.domElement);

 
  let aspectRatio = width/height;
  let fieldOfView = 45;
  let nearPlane = 1,
      farPlane = 10000;
  // Camera setup: Do not add to scene to avoid rotation problems   
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
    );
 
  camera.position.set(-50, 250, 450 );

 
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;
  controls.update();

}
// First define a Bike Object

// Bike = function(){
//   // Create an empty container that will hold the different parts of the bike
//   this.mesh = new THREE.Object3D();
//   this.mesh.name = 'Bike';
//   let aBike = new THREE.Object3D();;
//   let geometry = new THREE.CylinderBufferGeometry( 5, 5, 2, 32 );
//   let material = new THREE.MeshPhongMaterial( {color: Colors.red} );//before MeshBasicMaterial
//   frontWheel = new THREE.Mesh( geometry, material );
//   frontWheel.rotation.x = 1.7*Math.PI / 2; 

//   this.mesh.add( frontWheel );

  
//   // this.mesh.add(aBike);
// }

function createBike() {
  bike = new THREE.Object3D();
  bike.mesh = new THREE.Object3D();
  // bike.backWheel = new THREE.Object3D();
  // bike.frontWheel = new THREE.Object3D();
  let mtlLoader = new THREE.MTLLoader();
  mtlLoader.setTexturePath('assets/');
  mtlLoader.load('assets/Wheel_back1.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    // objLoader.setPath('/examples/ridesafely/assets/');
    // objLoader.load('assets/norider_bicycle.obj', function (object) {
       objLoader.load('assets/Wheel_back1.obj', function (object) {
          object.scale.set(5, 5, 5);
          object.rotation.y = Math.PI/2;
          // object.position.z = 0;
          // bike.backWheel.add(object);
          object.position.y = -26;
          object.position.z = -5.5;
          back_wheel = object;
          bike.mesh.add(object);
          // bike.backWheel.add(object);
          // bike.backWheel.position.y = 0;
          scene.add(bike.mesh);
        });
    });

    // Front Wheel loading
     
    mtlLoader.load('assets/Wheel_front1.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
        objLoader.load('assets/Wheel_front1.obj', function (object) {
          object.scale.set(5, 5, 5);
          object.rotation.y = Math.PI/2;
          object.position.y = -9.5;
          object.position.z = -5.5;
          // bike.frontWheel.add(object);
          bike.mesh.add(object);
          front_wheel = object;
       });
  });
   


  mtlLoader.load('assets/frame-nopedals.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
       objLoader.load('assets/frame-nopedals.obj', function (object) {
          object.scale.set(5, 5, 5);
          object.rotation.z = Math.PI/2;
          object.position.set(0,-10,-5.5);
          bike.mesh.add(object);
          frame = object;
       });
  });

  // Pedals+crankArm

  mtlLoader.load('assets/pedalsCrankArms.mtl', function (mtl) {

    mtl.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
        objLoader.load('assets/pedalsCrankArms.obj', function (object) {
          object.scale.set(0.5, 0.5, 0.5);
          // object.rotation.z = Math.PI/2;
          object.position.set(0.5,-19,-5.0);
          // object.position.z = 0;
          // bike.frontWheel.add(object);
          pedals = object;
          bike.mesh.add(object);

       });
  });

  mtlLoader.load('assets/riderinpos.mtl', function (mtl) {

    mtl.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
       objLoader.load('assets/riderinpos.obj', function (object) {
          object.scale.set(5, 5, 5);
          object.rotation.y = Math.PI;
          object.rotation.x = Math.PI;
          object.rotation.x=Math.PI/2;
          // object.rotation.z=Math.PI/2;
          object.position.set(0,-21,-9);
          rider = object;
      
          bike.mesh.add(object);
       });
  });

  bike.mesh.position.z = 10;

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
  

function createPath(pId, src, dst) {

  pathList[pId] = new THREE.Path();
  pathList[pId].moveTo(src.x, src.y);
  for (let i = 0; i < dst.length; i++) {
    pathList[pId].lineTo(dst[i].x, dst[i].y);
    // pathList[pId].quadraticCurveTo( dst[i].x-1, dst[i].y-1, dst[i].x, dst[i].y );
  }

  drawPath(pId);
}

function createPaths() {  

  // the pathList
  let destP = [], src;
  
  // P1 with 0 based indices
  
  src = new THREE.Vector3(-250,-240,0);
  destP[0] = new THREE.Vector3(-160,-240,0);
  destP[1] = new THREE.Vector3(-160,-185,0); 
  createPath(0, src, destP);

  // P2 with 0 based indices
  destP  = []; // reset destP array
  src = new THREE.Vector3(-160,-185,0);
  destP[0] = new THREE.Vector3(-160,35,0);
  createPath(1, src, destP);

  // P3
  src = new THREE.Vector3(-160,35,0);
  destP[0] = new THREE.Vector3(-160,185,0);
  destP[1] = new THREE.Vector3(250,185,0); 
  // 0 based indices
  createPath(2, src, destP);
 
  // P4
  destP  = []; // reset destP array
  src = new THREE.Vector3(-160,-185,0);
  destP[0] = new THREE.Vector3(-135,-185,0);
  // 0 based indices
  createPath(3, src, destP);
  
  // P5
  destP  = []; // reset destP array
  src = new THREE.Vector3(-160,35,0);
  destP[0] = new THREE.Vector3(-40,35,0);
  // 0 based indices
  createPath(4, src, destP);

  // P6
  destP  = []; // reset destP array
  src = new THREE.Vector3(-135,-185,0);
  destP[0] = new THREE.Vector3(-80,-150,0);
  destP[1] = new THREE.Vector3(-40,-185,0); 
  // 0 based indices
  createPath(5, src, destP);

  // P7
  destP  = []; // reset destP array
  src = new THREE.Vector3(-135,-185,0);
  destP[0] = new THREE.Vector3(-80,-170,0);
  destP[1] = new THREE.Vector3(-40,-185,0); 
  // 0 based indices
  createPath(6, src, destP);

  // P8
  destP  = []; // reset destP array
  src = new THREE.Vector3(-40,-185,0);
  destP[0] = new THREE.Vector3(110,-185,0);
  // 0 based indices
  createPath(7, src, destP);

  // P9
  destP  = []; // reset destP array
  src = new THREE.Vector3(-40,-185,0);
  destP[0] = new THREE.Vector3(-40,35,0); // 35 instead of 10 to reach DP5
  // 0 based indices
  createPath(8, src, destP);

  // P10
  destP  = []; // reset destP array
  src = new THREE.Vector3(-40,35,0);
  destP[0] = new THREE.Vector3(-10,35,0);
  destP[1] = new THREE.Vector3(-10,185,0);
  destP[2] = new THREE.Vector3(250,185,0); 
  // 0 based indices
  createPath(9, src, destP);
  
  // P11
  destP  = []; // reset destP array
  src = new THREE.Vector3(-40,35,0);
  destP[0] = new THREE.Vector3(110,35,0);
  // 0 based indices
  createPath(10, src, destP);

  // P12
  destP  = []; // reset destP array
  src = new THREE.Vector3(110,35,0);
  destP[0] = new THREE.Vector3(110,185,0);
  destP[1] = new THREE.Vector3(250,185,0); 
  // 0 based indices
  createPath(11, src, destP);

  // P13
  destP  = []; // reset destP array
  src = new THREE.Vector3(110,35,0);
  destP[0] = new THREE.Vector3(185,35,0);
  destP[1] = new THREE.Vector3(185,185,0); 
  destP[2] = new THREE.Vector3(250,185,0); 
  // 0 based indices
  createPath(12, src, destP);

  // P14
  destP  = []; // reset destP array
  src = new THREE.Vector3(110,-185,0);
  destP[0] = new THREE.Vector3(110,35,0);
  destP[1] = new THREE.Vector3(110,185,0); 
  destP[2] = new THREE.Vector3(250,185,0); 
  // 0 based indices
  createPath(13, src, destP);

  // P15
  destP  = []; // reset destP array
  src = new THREE.Vector3(110,-185,0);
  destP[0] = new THREE.Vector3(185,-185,0);
  destP[1] = new THREE.Vector3(185,185,0); 
  destP[2] = new THREE.Vector3(250,185,0); 
  // 0 based indices
  createPath(14, src, destP);

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
  scene.add(line);
  // Start angle and point
  previousAngle = getAngle( segment, position );
  previousPoint = pathList[segment].getPoint( position );

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
setTimeout(check, period);

function check() {
  if (pathList[activeSegment] != null && pathList[activeSegment].getPoint(position) === null) 
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
                position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }, {
            label: 'Turn Right',
            action: function(dialogRef){
                activeSegment = 3;  //P4
                position = 0;
                speed=10;
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
                position = 0;
                speed=2;
                dialogRef.close();
                setTimeout(check, period);
            }
        }, {
            label: 'Turn Right',
            action: function(dialogRef){
                activeSegment = 4;  //P5
                position = 0;
                speed=2;
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
                position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }, {
            label: 'steer away',
            action: function(dialogRef){
                activeSegment = 5;  //P6
                position = 0;
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
                position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }, {
            label: 'Full stop - continue straight when clear',
            action: function(dialogRef){
                activeSegment = 7;  //P8
                position = 0;
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
                position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }, {
            label: 'Full stop - continue straight when clear',
            action: function(dialogRef){
                activeSegment = 9;  //P10
                position = 0;
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
                position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }, {
            label: 'Full stop - continue straight to sidewalk',
            action: function(dialogRef){
                activeSegment = 14;  //P15
                position = 0;
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
                position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }, {
            label: 'Full stop - continue straight to sidewalk',
            action: function(dialogRef){
                activeSegment = 12;  //P13
                position = 0;
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
                position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }, {
            label: 'Full stop - continue straight to sidewalk',
            action: function(dialogRef){
                activeSegment = 10;  //P11
                position = 0;
                dialogRef.close();
                setTimeout(check, period);
            }
        }]
    });
   
}

function getActiveSegment(){
    return activeSegment;
}
let previousPoint, previousAngle;
function move( segment ) {
  
  // add up position for movement
  position += 0.002 * speed ;
  
  let point = pathList[segment].getPoint( position);
  if (point === null) {
    
     return;
  }
  if (bike === null) {
    return;
  }
  if (bike.mesh === null) {
    return;
  }
  
  bike.mesh.position.x = point.x-4;
  bike.mesh.position.y = point.y+4;


  let angle = getAngle(segment, position);
  if (angle > 0) {
    angle = - Math.PI + angle;
  }
  // set the quaternion
  bike.mesh.quaternion.setFromAxisAngle( up, angle );

  if (bike.mesh.children.length > 3) {
      pedals.rotation.x -=0.1;
      front_wheel.rotation.x -=0.1;
      back_wheel.rotation.x -=0.1;
      
  }
  
  previousPoint = point;
  previousAngle = angle;
  
}

function getAngle( segment, position ){
// get the 2Dtangent to the curve
  let tangent = pathList[segment].getTangent(position).normalize();

  // change tangent to 3D
  let angle = - Math.atan( tangent.x / tangent.y);
  
  return angle;
}

// render
function render() {

  controls.update();
  renderer.render(scene, camera);
  
}

// animate
function animate() {
  let segment = getActiveSegment();
  move(segment);
  requestAnimationFrame(animate);
  render();
}

export function init() {

  // set up the scene, the camera and the renderer
  createScene();

  createFloor();
  // add the lights
  createLights();

  // add the objects
  createBike();

  createPaths();

  // createRoad();

  // createSky();

  // start a loop that will update the objects' positions 
  // and render the scene on each frame
  animate();
}

// HANDLE MOUSE EVENTS

let mousePos = { x: 0, y: 0 };

function handleMouseMove(event) {
  let tx = -1 + (event.clientX / WIDTH)*2;
  let ty = 1 - (event.clientY / HEIGHT)*2;
  mousePos = {x:tx, y:ty};
}

window.addEventListener('load', init, false);

// export default {
//   init:init;
// };
