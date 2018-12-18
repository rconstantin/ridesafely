'use strict';

let activeCamera = null, trailingCamera = null, hoveringCamera = null, orbitControls = null;
let inspectCamera = null;


function createCameras( scene , renderer) {

 
  let aspectRatio = window.innerWidth/window.innerHeight;
  let fieldOfView = 45, fieldOfView1 = 45;  //45;
  let nearPlane = 1, //1,
      farPlane = 1000; //10000;


  orbitControls = new THREE.Object3D();
  // Camera setup: Do not add to scene to avoid rotation problems   
  trailingCamera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
    );
 

  trailingCamera.position.set(0, -250, 50);

  // Default ActiveCamera to be the trailingCamera
  activeCamera = trailingCamera;

 
  orbitControls.tcontrols = new THREE.OrbitControls(trailingCamera, renderer.domElement);
  orbitControls.tcontrols.maxPolarAngle = Math.PI; 
  orbitControls.tcontrols.minPolarAngle = 2.4;
  orbitControls.tcontrols.maxAzimuthAngle=Math.PI/6;
  orbitControls.tcontrols.minAzimuthAngle=-Math.PI/6;
  orbitControls.tcontrols.minDistance = 50;
  orbitControls.tcontrols.maxDistance = 250; 
  orbitControls.tcontrols.enableDamping = true;
  orbitControls.tcontrols.dampingFactor = 0.25;
  orbitControls.tcontrols.enableZoom = true;
  orbitControls.tcontrols.update();

  // hovering camera
  hoveringCamera = new THREE.PerspectiveCamera(
    fieldOfView1,
    aspectRatio,
    nearPlane,
    farPlane
    );
  hoveringCamera.position.set(0, 350, 450); 
  hoveringCamera.lookAt(scene.position);

  orbitControls.hcontrols = new THREE.OrbitControls(hoveringCamera, renderer.domElement);
  orbitControls.hcontrols.maxPolarAngle = 1.4; // limiting angle
  orbitControls.hcontrols.minPolarAngle = Math.PI/4; // limiting angle
  orbitControls.hcontrols.maxAzimuthAngle=Math.PI/2;
  orbitControls.hcontrols.minAzimuthAngle=-Math.PI/2;
  orbitControls.hcontrols.minDistance = 50;
  orbitControls.hcontrols.maxDistance = 400; 
  orbitControls.hcontrols.enableDamping = true;
  orbitControls.hcontrols.dampingFactor = 0.25;
  orbitControls.hcontrols.enableZoom = true;
  orbitControls.hcontrols.update();

  inspectCamera = new THREE.PerspectiveCamera(
    35,
    aspectRatio,
    0.1,
    1000
    );
  inspectCamera.position.set(0,2,25);

}

function setActiveCamera (aCamera) {
    activeCamera = aCamera;
}
function getActiveCamera() {
	return activeCamera;
}

export {createCameras, getActiveCamera, setActiveCamera, hoveringCamera, trailingCamera, orbitControls, inspectCamera};