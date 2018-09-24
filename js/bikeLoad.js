'use strict';

var back_wheel = null,
    front_wheel = null,
    rider = null,
    pedals = null,
    bike = null;
let frame = null;


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
    objLoader.load('assets/Wheel_back1.obj', function (object) {
        object.scale.set(5, 5, 5);
        object.rotation.y = Math.PI/2;
        // object.position.z = 0;
        // bike.backWheel.add(object);
        object.position.y = -26;
        object.position.z = -5.5;
        back_wheel = object;
        bike.mesh.add(object);
        // move to scene3d
        // scene.add(bike.mesh);
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

export {createBike, bike, pedals, front_wheel, back_wheel}; //{createBike, bike, pedals, front_wheel, back_wheel, rider};
