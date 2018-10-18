/*
  Create a 3D Scene for our town and cycling routes
*/
'use strict';

import debug3dAxes from './dbg_3d_coord';
import infoButton from './info';
import {createPaths, pathList, CarSegments} from './bikePaths';
import Colors from './colors';
import {activeSegment, resetSegment, getBikeSpeed, getPosition, setPosition} from './decisionTree';
import {createBike, bike, pedals, front_wheel, back_wheel} from './bikeLoad';
import {createTown, town, parkedCarDoor, redCar, yellowCar} from './townLoad';


let renderer, scene, trailingCamera, tcontrols, hoveringCamera, hcontrols;
let carPosition = 0;
let keyboard = new THREEx.KeyboardState();
let camera = hoveringCamera, carSpeed = 0.1;
let animId = null;
let gameEnd = false;

function clearText()
{   document.getElementById('output').innerHTML = '..........';   }

function appendText(txt)
{   document.getElementById('output').innerHTML += txt;   }



function createLights() {

  let hemisphereLight, ambientLight, shadowLight;

  // A hemisphere light is a gradient colored light; 
  // the first parameter is the sky color, the second parameter is the ground color, 
  // the third parameter is the intensity of the light
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, 0.9);
  ambientLight = new THREE.AmbientLight(0x111111);
  // A directional light shines from a specific direction. 
  // It acts like the sun, that means that all the rays produced are parallel. 
  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
  
  // to activate the lights, just add them to the scene
  scene.add(hemisphereLight);  
  scene.add(shadowLight);
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

// Algorithm based on simple 2D collision of objects with Axis-aligned bounding boxes (i.e no rotation)
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
// A collision occurs if any of the parts of the bounding boxes intersect.
function simpleCollision(obj1, obj2) 
{
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
// This ray based collision works but seems excessive for the simple collision situation
// function rayCollision() {
//   let originPoint = bikeCollider.position.clone();
//     // clearText();

//   for (let vertexIndex = 0; vertexIndex < bikeCollider.geometry.vertices.length; vertexIndex++)
//   {   
//       let localVertex = bikeCollider.geometry.vertices[vertexIndex].clone();
//       let globalVertex = localVertex.applyMatrix4( bikeCollider.matrix );
//       let directionVector = globalVertex.sub( bikeCollider.position );
//
//       let ray = new THREE.Ray( originPoint, directionVector.clone().normalize() );
//       let doorCollisionResult = (ray.intersectsBox( doorCollider.bBox ));

//       if ( doorCollisionResult === true) 
//       {
//         appendText(" Hit Door");
//         console.log(" Hit Door ");
//       }

//   }
// }
function restartGame() 
{
  location.reload();
  gameEnd = false;
}
function crashBike() {
  // bike.mesh.rotation.z = 0.2;
  // bike.mesh.position.set(bike.mesh.position.x-0.2, bike.mesh.position.y-0.2,bike.mesh.position.z); 
  // bike.rider.position.set(3,3,-9);
  // bike.rider.rotation.z = 0.3;
  BootstrapDialog.show({
      title: 'Game Over!',
      message: "Ready to Restart the Game?",
      closeByBackdrop: false,
      closeByKeyboard: false,
      buttons: [{
          label: 'Restart Game',
          action: function(dialogRef){
              restartGame();
              dialogRef.close();
              gameEnd = false;
          }
      }, {
          label: 'Leave Game',
          action: function(dialogRef){
              cancelAnimationFrame(animId);

              dialogRef.close();
              
              return;
          }
      }]
  });
  gameEnd = true;
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

  bike.mesh.position.x = point.x;
  bike.mesh.position.y = point.y;
  

  let angle = getAngle(segment, getPosition());
  if (angle > 0) {
    angle = - Math.PI + angle;
  }

  let up = new THREE.Vector3( 0, 0, 1 );

  // set the quaternion
  bike.mesh.quaternion.setFromAxisAngle( up, angle );

  if (bike.mesh.children.length > 5) 
  {
    pedals.rotation.x -=0.1;
    front_wheel.rotation.x -=0.1;
    back_wheel.rotation.x -=0.1;

    if (simpleCollision(bike.mesh, redCar) === true) {
      console.log("Hit Car!");
      crashBike();
    }

    if (parkedCarDoor !== null) {
      if (segment === 6) {
        // moving towards parked car. For now just open the door
        parkedCarDoor.bone.rotation.z = -1.5;
        // rayCollision();
        
        if (simpleCollision(bike.mesh, parkedCarDoor.doorCollider))
        {
          console.log("Hit Car Door!");
          crashBike();
        }
      }
      else {
        parkedCarDoor.bone.rotation.z = 0;
      }
    }
    
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

  // cc.position.x = point.x;
  // cc.position.y = point.y;
  
  // redCar.bbox = bbox1;
  

  let up = new THREE.Vector3( 0, 0, 1 );

  let angle = getAngle(segment, carPosition);
  if (angle > 0) {
    angle = - Math.PI + angle;
  }
  // set the quaternion
  car.quaternion.setFromAxisAngle( up, angle );
  

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

  updateCar(CarSegments.redCar, redCar);
  
  updateBike(segment);
  animId = requestAnimationFrame(animate);
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

  // if ( doorCollider !== null) {
  //   collidables.push(doorCollider);
  // }
  // add the objects
  createBike();
  
  bike.mesh.add(trailingCamera);
  // // Bike Collider
  // let colliderGeometry = new THREE.CubeGeometry(2,3,3,1,1,1);
  // let wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
  // bikeCollider = new THREE.Mesh( colliderGeometry, wireMaterial );
  // scene.add(bikeCollider);
  scene.add(bike.mesh);

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
  camera = hoveringCamera;
  // start a loop that will update the objects' positions 
  // and render the scene on each frame
  animate();
}


