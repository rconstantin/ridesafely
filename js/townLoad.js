'use strict';

let town = null, parkedCarDoor = null;
let parkedCar = null, yellowCar = null, redCar = null, doorCollider;

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
  let bbox = null;
  loader.load( 'assets/car-low-poly6.dae',
    function (collada) {
      parkedCar = collada.scene;
      parkedCar.scale.set(3,3,3);
      parkedCar.traverse(function (child){
         if (child instanceof THREE.SkinnedMesh){  
         	  parkedCarDoor = child;
            parkedCarDoor.bone = child.skeleton.bones[0];
            // parkedCarDoor.long = 3;
            // parkedCarDoor.wide = 3;
            // child.geometry.computeBoundingBox();
           //  parkedCarDoor.bBox = new THREE.BoundingBoxHelper(child.geometry.boundingBox.min,
  									// child.geometry.boundingBox.max);
            // let colliderGeometry = new THREE.CubeGeometry(0.5,4,5,1,1,1,1);
            // let wireMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true } );
            // doorCollider = new THREE.Mesh( colliderGeometry, wireMaterial );
            // // doorCollider.updateMatrix();
            // doorCollider.position.set(-110,-170,3);
            // bbox = new THREE.Box3();
            // bbox.setFromObject( doorCollider );
            // // parkedCarDoor.add(doorCollider);
            // doorCollider.bBox = bbox;
            let colliderGeometry = new THREE.CubeGeometry(0.5,4,5,1,1,1,1);
            let wireMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true } );
            let doorCollider = new THREE.Mesh( colliderGeometry, wireMaterial );
            doorCollider.position.set(-110,-170,3);
            doorCollider.long = 0.5;
            doorCollider.wide = 4;
            parkedCarDoor.doorCollider = doorCollider;

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
      // town.add(doorCollider);
      town.add(parkedCar);
  }); 

  mtlLoader.setTexturePath('assets/');
  mtlLoader.load('assets/yellow2.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/yellow2.obj', function (object) {
        object.scale.set(5, 5, 5);
        yellowCar = object;
        yellowCar.rotation.x = Math.PI/2;
        yellowCar.rotation.y = Math.PI;
        yellowCar.rotation.z= 0;
        yellowCar.position.set(-4, 100,0);
        
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
    redCar.rotation.y = Math.PI;
    redCar.rotation.z= 0;
    redCar.position.set(250, 250,0);
    redCar.long = 8;
    redCar.wide = 6;
    town.add(redCar);
  }); 

  
}

export {createTown, town, parkedCarDoor, redCar, yellowCar};