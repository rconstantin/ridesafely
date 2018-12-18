'use strict';

let bike = null;

function createBike() {
  bike = new THREE.Object3D();
  bike.mesh = new THREE.Object3D();
 
  let mtlLoader = new THREE.MTLLoader();
  let jloader = new THREE.JSONLoader();
  mtlLoader.setTexturePath('assets/');
  mtlLoader.load('assets/Wheel_back1.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/Wheel_back1.obj', function (object) {
        object.scale.set(5, 5, 5);
        object.rotation.y = Math.PI/2;
      
        object.position.y = -26;
        object.position.z = -5.5;
        bike.back_wheel = object;
        bike.mesh.add(object);
  
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
          bike.mesh.add(object);
          bike.front_wheel = object;
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
          // frame = object;
       });
  });

   // From Blender Model: low-poly-cycle-enzo9-9.json
   jloader.load('./assets/low-poly-cycle.json', function (geometry, materials) {
      materials.forEach(function (material) {
        material.skinning = true;
      });
      bike.rider = new THREE.SkinnedMesh(
        geometry,
        materials
      );
      bike.rider.scale.set(8,8,8);
      bike.rider.position.set(0,-19,-10);
      bike.rider.rotation.y = Math.PI;
      bike.rider.rotation.x = Math.PI/2;
      bike.mesh.add(bike.rider);
      
      bike.mixer = new THREE.AnimationMixer(bike.rider);
      bike.anim = bike.mixer.clipAction(geometry.animations[1]);
      bike.anim.setEffectiveWeight(1);
      bike.anim.enabled = true;
      bike.anim.play();
      bike.anim.paused = true;
      bike.anim.timeScale = 2;
      
      
      bike.anim.paused = false;
    });
    
    
    bike.mesh.wide = 1;
    bike.mesh.long = 3;
    bike.mesh.position.z = 2.2;
    bike.mesh.scale.set(0.2,0.2,0.2);

    // tripod for inspection camera
    bike.mesh.tripod = new THREE.Object3D;
    bike.mesh.add(bike.mesh.tripod);
    bike.mesh.tripod.position.set(0,2,25);

}

export {createBike, bike}; //{createBike, bike, pedals, front_wheel, back_wheel, rider};
