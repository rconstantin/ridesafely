/*
  Create a 3D Scene for our town and cycling routes
*/
'use strict';

import debug3dAxes from './dbg_3d_coord';
import {createPaths, pathList} from './bikePaths';
import Colors from './colors';
import {activeSegment, speed, getPosition, setPosition} from './decisionTree';
import {createBike, bike, pedals, front_wheel, back_wheel} from './bikeLoad';


let renderer, scene, camera, controls;


let hemisphereLight, shadowLight;
let clock = new THREE.Clock();
let up = new THREE.Vector3( 0, 0, 1 );
let axis = new THREE.Vector3( );
let radians, tangent;

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

function move( segment ) {
  if (pathList === null) {
    return;
  }
  // add up position for movement
  let pos = getPosition();
  pos += 0.002 * speed ;
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
  
  bike.mesh.position.x = point.x-4;
  bike.mesh.position.y = point.y+4;


  let angle = getAngle(segment, getPosition());
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

  controls.update();
  renderer.render(scene, camera);
  
}

// animate
function animate() {
  let segment = activeSegment;
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


