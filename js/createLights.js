'use strict';

let hemisphereLight = null;


function createLight(scene) {

  let ambientLight, shadowLight;

  // A hemisphere light is a gradient colored light; 
  // the first parameter is the sky color, the second parameter is the ground color, 
  // the third parameter is the intensity of the light
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, 4.0);
  ambientLight = new THREE.AmbientLight(0x111111, 6);
  // A directional light shines from a specific direction. 
  // It acts like the sun, that means that all the rays produced are parallel. 
  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
  
  // to activate tohe lights, just add them to the scene
  scene.add(hemisphereLight);  
  scene.add(shadowLight);
  scene.add(ambientLight);
  // scene.add(shadowLight);
}
function setHLIntensity(value) {
  hemisphereLight.intensity = value;
}

export {createLight, setHLIntensity};