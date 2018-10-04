'use strict';

let town = null, parkedCarDoor = null;
let parkedCar = null, yellowCar = null, redCar = null;

function createTown() {

	town = new THREE.Object3D();
  let mtlLoader = new THREE.MTLLoader();

  mtlLoader.setTexturePath('assets/');
  mtlLoader.load('assets/road-design.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/road-design.obj', function (object) {
        object.scale.set(24, 24, 24);
        object.rotation.x = Math.PI/2;
        // road = object;
        town.add(object);
      });
  });
  mtlLoader.setTexturePath('assets/');
  mtlLoader.load('assets/houses-layout.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/houses-layout.obj', function (object) {
        object.scale.set(2, 2, 2);
        object.rotation.x = Math.PI/2;
        // town = object;
        town.add(object);
      });
  });


  let loader = new THREE.ColladaLoader();
  
  loader.load( 'assets/car-low-poly6.dae',
    function (collada) {
      parkedCar = collada.scene;
      parkedCar.scale.set(3,3,3);
      parkedCar.traverse(function (child){
         if (child instanceof THREE.SkinnedMesh){  
            parkedCarDoor = child.skeleton.bones[0];
          }
          child.traverse(function(e){
            e.castShadow = true;
            e.receiveShadow = true;
            if (e.material instanceof THREE.MeshPhongMaterial){
                e.material.needsUpdate = true;
            }   
          
          });
      });
      parkedCar.updateMatrix();
      parkedCar.rotation.z = Math.PI/2;
      parkedCar.rotation.x= 0;
      parkedCar.position.set(-110, -175,0);
      town.add(parkedCar);
  }); 

  mtlLoader.setTexturePath('assets/');
  mtlLoader.load('assets/yellow2.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/yellow2.obj', function (object) {
        object.scale.set(5, 5, 5);
        object.rotation.x = Math.PI/2;
        yellowCar = object;
        yellowCar.rotation.x = Math.PI/2;
        yellowCar.rotation.z= 0;
        yellowCar.position.set(110, 170,0);
        town.add(object);
      });
  });

 loader.load( 'assets/car-low-red.dae',
    function (collada) {
    redCar = collada.scene;
    redCar.scale.x = redCar.scale.y = redCar.scale.z = 5;
    redCar.traverse(function (child){
    
        child.traverse(function(e){
            e.castShadow = true;
            e.receiveShadow = true;
            if (e.material instanceof THREE.MeshPhongMaterial){
                e.material.needsUpdate = true;
            }   
        
        });
    
        
    });
    redCar.updateMatrix();
    redCar.rotation.x = 0;
    redCar.rotation.z= 0;
    redCar.position.set(110, 100,0);
    town.add(redCar);
  }); 

  
}

export {createTown, town, parkedCarDoor};