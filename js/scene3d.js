/*
  Create a 3D Scene for our town and cycling routes
*/
'use strict';

import debug3dAxes from './dbg_3d_coord';
import infoButton from './info';
import {createPaths, pathList, CarSegments} from './bikePaths';
import Colors from './colors';
import {activeSegment, getBikeSpeed, getPosition, setPosition} from './decisionTree';
import {createBike, bike, pedals, front_wheel, back_wheel} from './bikeLoad';
import {createTown, town, parkedCarDoor, redCar, yellowCar} from './townLoad';

// import lottie from 'lottie-web';


let renderer, scene, trailingCamera, tcontrols, hoveringCamera, hcontrols;
let carPosition = 0;
let keyboard = new THREEx.KeyboardState();
let camera = hoveringCamera, carSpeed = 0.1;

// let clock = new THREE.Clock();
// let axis = new THREE.Vector3( );
// let radians, tangent;

function createLights() {

  let hemisphereLight, ambientLight;

  // A hemisphere light is a gradient colored light; 
  // the first parameter is the sky color, the second parameter is the ground color, 
  // the third parameter is the intensity of the light
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, 0.9);
  ambientLight = new THREE.AmbientLight(0x111111);
  // A directional light shines from a specific direction. 
  // It acts like the sun, that means that all the rays produced are parallel. 
  // shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

  // // Set the direction of the light  
  // shadowLight.position.set(150, 350, 350);
  
  // // Allow shadow casting 
  // shadowLight.castShadow = true;

  // // define the visible area of the projected shadow
  // shadowLight.shadow.camera.left = -400;
  // shadowLight.shadow.camera.right = 400;
  // shadowLight.shadow.camera.top = 400;
  // shadowLight.shadow.camera.bottom = -400;
  // shadowLight.shadow.camera.near = 1;
  // shadowLight.shadow.camera.far = 1000;

  // // define the resolution of the shadow; the higher the better, 
  // // but also the more expensive and less performant
  // shadowLight.shadow.mapSize.width = 2048;
  // shadowLight.shadow.mapSize.height = 2048;
  
  // to activate the lights, just add them to the scene
  scene.add(hemisphereLight);  
  scene.add(ambientLight);
  // scene.add(shadowLight);
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
  trailingCamera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
    );
 

  trailingCamera.position.set(0, -250, 50);

  tcontrols = new THREE.OrbitControls(trailingCamera, renderer.domElement);
  tcontrols.enableDamping = true;
  tcontrols.dampingFactor = 0.25;
  tcontrols.enableZoom = true;
  tcontrols.update();
  
  // hovering camera
  hoveringCamera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
    );
  hoveringCamera.position.set(0, 350, 450);
  hoveringCamera.lookAt(scene.position);


  hcontrols = new THREE.OrbitControls(hoveringCamera, renderer.domElement);
  hcontrols.enableDamping = true;
  hcontrols.dampingFactor = 0.25;
  hcontrols.enableZoom = true;
  hcontrols.update();

  let anim = lottie.loadAnimation({
    container: document.getElementById('logo'), // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'js/data_rs.json' // the path to the animation json
  });

  lottie.loadAnimation({
    container: document.getElementById('bike'), // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'js/data_bike.json' // the path to the animation json
  });
  // scene.add(anim); Illegal anim is not a THREE.Object3D()

  infoButton();
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

function updateBike( segment ) {
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
  if (parkedCarDoor !== null) {
    if (segment === 6) {
      // moving towards parked car. For now just open the door
      parkedCarDoor.rotation.z = -1.5;
    }
    else {
      parkedCarDoor.rotation.z = 0;
    }
  }
  bike.mesh.position.x = point.x;
  bike.mesh.position.y = point.y;


  let angle = getAngle(segment, getPosition());
  if (angle > 0) {
    angle = - Math.PI + angle;
  }

  let up = new THREE.Vector3( 0, 0, 1 );

  // set the quaternion
  bike.mesh.quaternion.setFromAxisAngle( up, angle );

  if (bike.mesh.children.length > 3) {
      pedals.rotation.x -=0.1;
      front_wheel.rotation.x -=0.1;
      back_wheel.rotation.x -=0.1;
      
  }
  

}

function updateCar( segment , car) {
  
  // add up position for movement
  if (car === null) {
    return;
  }
  carPosition += 0.002 * carSpeed ;
  
  let point = pathList[segment].getPoint( carPosition);
  if (point === null) {
    
     return;
  }
  
  
  
  car.position.x = point.x;
  car.position.y = point.y;

  let up = new THREE.Vector3( 0, 0, 1 );

  let angle = getAngle(segment, carPosition);
  if (angle > 0) {
    angle = - Math.PI + angle;
  }
  // set the quaternion
  car.quaternion.setFromAxisAngle( up, angle );

}

function getAngle( segment, aPosition ){
// get the 2Dtangent to the curve
  let tangent = pathList[segment].getTangent(aPosition).normalize();

  // change tangent to 3D
  let angle = - Math.atan( tangent.x / tangent.y);
  
  return angle;
}

// render
function render() {

  hcontrols.update();
  tcontrols.update();

  if ( keyboard.pressed("1") ) {
     camera = hoveringCamera;  
  }
  if ( keyboard.pressed("2") ) {
     camera = trailingCamera; 
  }
  renderer.render(scene, camera);
  
}

// animate
function animate() {
  let segment = activeSegment;
  updateBike(segment);
  updateCar(CarSegments.redCar, redCar);
  requestAnimationFrame(animate);
  render();
}

export function init() {

  // set up the scene, the camera and the renderer
  createScene();

  createFloor();
  // add the lights
  createLights();

  // add town components: roads, buildings cars
  createTown();
  scene.add(town);

  // add the objects
  createBike();
  bike.mesh.add(trailingCamera);

  scene.add(bike.mesh);

  let lines = [];

  lines = createPaths();

  for (let i = 0; i < lines.length; i++) 
  {
     scene.add(lines[i]);
  }
  // pathList = list;
  // createRoad();

  // createSky();
  camera = hoveringCamera;
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


