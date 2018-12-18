'use strict';

import {getDP} from './bikePaths';

let town = null, parkedCarDoor = null;
let cars, parkedCar = null, doorCollider = null;
let pedestrians = null;
let carSpeed = 0.1;

function cloneArrow(object, dp, yRotation) {
  let clone = object.clone(); // ex: DP21
        let pos = getDP(dp); //
        clone.position.set(pos.x, pos.y, -1);
        clone.rotation.y = yRotation; // ex: Math.PI/2;
        town.dpArrows[dp-1] = clone;
        town.add(clone);
}
function createHelperArrows()
{
  let mtlLoader = new THREE.MTLLoader();

  mtlLoader.load('assets/dp1-arrows.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/dp1-arrows.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = -Math.PI/2;
        object.position.set(-160, -165, -1); //DP1
        town.dpArrows[0] = object;
        town.add(object);

        // let clone = object.clone();
        // clone.position.set(-160, 25, -1); //DP2
        // town.dpArrows[1] = clone;
        // town.add(clone);
        cloneArrow(object, 2, -Math.PI/2); //DP2
        cloneArrow(object, 14, -Math.PI/2); //DP14
      });
  });

 mtlLoader.load('assets/dp10-arrows.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/dp10-arrows.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = -Math.PI/2;
        object.position.set(-10, 240, -1); //DP10
        town.dpArrows[9] = object;
        town.add(object);
        
      });
  });

mtlLoader.load('assets/dp12-arrows.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/dp12-arrows.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = 0; 
        object.position.set(140, -10, -1); //DP12
        town.dpArrows[11] = object;
        town.add(object);
        
      });
  });

mtlLoader.load('assets/dp13-arrows.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/dp13-arrows.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = -Math.PI/2;
        object.position.set(-55, 178, -1); //DP13 
        town.dpArrows[12] = object;
        town.add(object);
        
      });
  });

mtlLoader.load('assets/dp3-arrows.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/dp3-arrows.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = -Math.PI/2;
        object.position.set(-120, -170, -1); //DP3
        town.dpArrows[2] = object;
        town.add(object);
        
      });
  });



mtlLoader.load('assets/dp10-arrows.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/dp10-arrows.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = -Math.PI/2;
        object.position.set(-10, 240, -1); //DP10
        town.dpArrows[9] = object;
        town.add(object);
        
      });
  });

  mtlLoader.load('assets/dp9-arrows.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/dp9-arrows.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = -Math.PI/2;
        object.position.set(-160,178, -1); //DP9
        town.dpArrows[8] = object;
        let clone = object.clone(); // DP11
        clone.position.set(-5, 178, -1);
        town.dpArrows[10] = clone;
        let clone1 = object.clone(); // DP5
        clone1.position.set(-40,25, -1);
        town.dpArrows[4] = clone1;
        
        town.add(object);
        town.add(clone);
        town.add(clone1);
       
      });
  });


  mtlLoader.load('assets/dpr-r-arrows.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/dpr-r-arrows.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = Math.PI/2;
        let pos = getDP(30);
        object.position.set(pos.x,pos.y,-1); //DP30
        town.dpArrows[29] = object;
        
        town.add(object);
       
      });
  });

  mtlLoader.load('assets/dpl-l-arrows.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/dpl-l-arrows.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = Math.PI;
        let pos = getDP(24);
        object.position.set(pos.x,pos.y,-1); //DP24
        town.dpArrows[23] = object;
        
        town.add(object);

        cloneArrow(object, 35, Math.PI/2);
       
      });
  });

  mtlLoader.load('assets/dp38-arrows.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/dp38-arrows.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = -Math.PI/2;
        let pos = getDP(38);
        object.position.set(pos.x,pos.y, -1); //DP38
        town.dpArrows[37] = object;
        
        town.add(object);
      });
  });


  mtlLoader.load('assets/dpr-rev-arrows.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/dpr-rev-arrows.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = Math.PI/2;
        let pos = getDP(29);
        object.position.set(pos.x,pos.y, -1); //DP29
        town.dpArrows[28] = object;
        
        town.add(object);
       
      });
  });

  mtlLoader.load('assets/dp36-arrows.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/dp36-arrows.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = -Math.PI/2;
        let pos = getDP(36);
        object.position.set(pos.x,pos.y, -1); //DP36
        town.dpArrows[35] = object;
        
        town.add(object);
        cloneArrow(object, 37, -Math.PI/2);
        cloneArrow(object, 27, Math.PI/1.3);
        cloneArrow(object, 31, -Math.PI/2);
        cloneArrow(object, 39, -Math.PI/2);
        
      });
  });

  mtlLoader.load('assets/dp40-arrows.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/dp40-arrows.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = -Math.PI/2;
        let pos = getDP(40);
        object.position.set(pos.x,pos.y, -1); //DP36
        town.dpArrows[39] = object;
        
        town.add(object);
                
      });
  });
  mtlLoader.load('assets/dp4-arrows.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/dp4-arrows.obj', function (object) {
        object.scale.set(0.8, 0.8, 0.8);
        object.rotation.x = Math.PI/2;
        object.rotation.y = -Math.PI/2;
        object.position.set(-55,-165, -1); //DP4
        town.dpArrows[3] = object;
        town.add(object);

        let clone = object.clone(); // DP7
        clone.position.set(100,25, -1);
        town.dpArrows[6] = clone;
        town.add(clone);
        clone = object.clone(); // DP6
        clone.position.set(100,-165, -1);
        town.dpArrows[5] = clone;
        town.add(clone);
        clone = object.clone(); // DP8
        clone.position.set(-60,35, -1);
        town.dpArrows[7] = clone;
        town.add(clone);
        ///////////////
        // Level 2
        ///////////////
        cloneArrow(object, 21, Math.PI/2);
        cloneArrow(object,22,Math.PI/2);
        cloneArrow(object,23,Math.PI/2);
        cloneArrow(object,25,Math.PI);
        cloneArrow(object,26,Math.PI/2);
        cloneArrow(object,28,Math.PI/2);
        cloneArrow(object,32,Math.PI);
        cloneArrow(object,33,-Math.PI/2);  
        cloneArrow(object,34,-Math.PI/2);
        

      });
  });

}
function createTown() 
{

	town = new THREE.Object3D();
  town.dpArrows = [];
	cars = new THREE.Object3D();
	pedestrians = new THREE.Object3D();

  let mtlLoader = new THREE.MTLLoader();
  let loader = new THREE.ColladaLoader();
 	
  
  // let bbox = null;
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
  
  createHelperArrows();
 
  mtlLoader.load('assets/start.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/start.obj', function (object) {
        object.scale.set(20, 20, 10);
        object.rotation.x = 0;
        object.rotation.y = -Math.PI/2;
        object.rotation.z = -Math.PI/2;
        object.position.set(-190, -250, 1);
        // town = object;
        town.add(object);
      });
  });

  mtlLoader.load('assets/finish-line.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/finish-line.obj', function (object) {
        object.scale.set(10, 10, 10);
        object.rotation.x = 0;
        object.rotation.y = -Math.PI/2;
        object.rotation.z = -Math.PI/2;
        object.position.set(240, 200, 1);
        // town = object;
        town.add(object);
      });
  });

  mtlLoader.load('assets/one-way.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/one-way.obj', function (object) {
        object.scale.set(8, 8, 8);
        object.rotation.x = Math.PI/2;
        object.rotation.y = 0;
        object.position.set(-110, 35, 0);
        let clone = object.clone();
        clone.position.set(-40, -60, 0.5);
        clone.rotation.y = -Math.PI/2;
        town.add(object);
        town.add(clone);
      });
  });


  
  loader.load( 'assets/car-low-poly6.dae',
    function (collada) {
      parkedCar = collada.scene;
      parkedCar.scale.set(3,3,3);
      parkedCar.traverse(function (child){
         if (child instanceof THREE.SkinnedMesh){  
         	  parkedCarDoor = child;
            parkedCarDoor.bone = child.skeleton.bones[0];
            let colliderGeometry = new THREE.CubeGeometry(0.5,4,5,1,1,1,1);
            let wireMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true } );
            let doorCollider = new THREE.Mesh( colliderGeometry, wireMaterial );
            doorCollider.position.set(-110,-172,3);
            doorCollider.long = 0.5;
            doorCollider.wide = 1;
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
      
      town.add(parkedCar);
  }); 

  mtlLoader.setTexturePath('assets/');
  mtlLoader.load('assets/yellow2.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/yellow2.obj', function (object) {
        object.scale.set(5, 5, 5);
        cars.yellowCar = object;
        cars.yellowCar.speed = (Math.random()+1) * carSpeed;
        cars.yellowCar.rotation.x = Math.PI/2;
        cars.yellowCar.rotation.y = Math.PI;
        cars.yellowCar.rotation.z= 0;
        cars.yellowCar.position.set(-4, 100,0);
        
        town.add(object);
      });
  });

  mtlLoader.setTexturePath('assets/');
  mtlLoader.load('assets/car-yellow1.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/car-yellow1.obj', function (object) {
        object.scale.set(3, 3, 3);
        cars.yellowCar1 = object;
        cars.yellowCar1.rotation.x = 0;
        cars.yellowCar1.rotation.y = 0;
        cars.yellowCar1.rotation.z= 0;
        cars.yellowCar1.long = 6;
        cars.yellowCar1.wide = 4;
        cars.yellowCar1.speed = (Math.random()+1) * carSpeed;
        town.add(cars.yellowCar1);
      });
  });

  mtlLoader.setTexturePath('assets/');
  mtlLoader.load('assets/car-green1.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/car-green1.obj', function (object) {
        object.scale.set(3, 3, 3);
        cars.greenCar = object;
        cars.greenCar.rotation.x = 0; //Math.PI/2;
        cars.greenCar.rotation.y = 0;
        cars.greenCar.rotation.z= Math.PI/2;
        cars.greenCar.long = 6;
        cars.greenCar.wide = 4;
        cars.greenCar.speed = (Math.random()+1) * carSpeed;
        
        town.add(cars.greenCar);
      });
  });
 loader.load( 'assets/car-low-red.dae',
    function (collada) {
    cars.redCar = collada.scene;
    cars.redCar.scale.x = cars.redCar.scale.y = cars.redCar.scale.z = 5;
    cars.redCar.traverse(function (child){
    
        child.traverse(function(e){
            e.castShadow = true;
            e.receiveShadow = true;
            if (e.material instanceof THREE.MeshPhongMaterial){
                e.material.needsUpdate = true;
            }   
        
        });
    
        
    });
    cars.redCar.updateMatrix();
    cars.redCar.rotation.y = Math.PI;
    cars.redCar.rotation.z= 0;
    cars.redCar.position.set(250, 250,0);
    cars.redCar.long = 6;
    cars.redCar.wide = 5;
    cars.redCar.speed = (Math.random()+1) * carSpeed;
    town.add(cars.redCar);
  }); 

  loader.load( 'assets/car-low-blue.dae',
    function (collada) {
    cars.blueCar = collada.scene;
    cars.blueCar.scale.x = cars.blueCar.scale.y = cars.blueCar.scale.z = 5;
    cars.blueCar.traverse(function (child){
    
        child.traverse(function(e){
            e.castShadow = true;
            e.receiveShadow = true;
            if (e.material instanceof THREE.MeshPhongMaterial){
                e.material.needsUpdate = true;
            }   
        
        });
    
        
    });
    cars.blueCar.updateMatrix();
    cars.blueCar.rotation.y = Math.PI;
    cars.blueCar.rotation.z= 0;
    cars.blueCar.position.set(250, 250,0);
    cars.blueCar.long = 6;
    cars.blueCar.wide = 5;
    cars.blueCar.speed = (Math.random()+1) * carSpeed;
    town.add(cars.blueCar);
  }); 
   createAnimChar();
  
}

function createAnimChar() {

	let jloader = new THREE.JSONLoader();

	jloader.load('./assets/dooring.json', function (geometry, materials) {
      materials.forEach(function (material) {
        material.skinning = true;
      });
      let billBoard = new THREE.SkinnedMesh(
        geometry,
        materials//new THREE.MeshFaceMaterial(materials)
      );
      billBoard.scale.set(2,2,2);
      billBoard.position.set(-110,-180,0);
      billBoard.rotation.x = Math.PI/2;
      billBoard.rotation.y = -Math.PI;
      town.add(billBoard);
      town.billBoard = animCommons(billBoard, geometry.animations[1], 0.5);
      
 
    });

	// From Blender Model low-poly-boy-walk9.blend
   
   jloader.load('./assets/low-poly-boy-walk.json', function (geometry, materials) {
      materials.forEach(function (material) {
        material.skinning = true;
      });
      let walkingBoy = new THREE.SkinnedMesh(
        geometry,
        materials//new THREE.MeshFaceMaterial(materials)
      );
      walkingBoy.scale.set(1,1,1);
      walkingBoy.position.set(160,0,1);
      walkingBoy.rotation.y = Math.PI;
      walkingBoy.rotation.x = Math.PI/2;
      walkingBoy.wide = 2;
      walkingBoy.long= 2;
      town.add(walkingBoy);
      pedestrians.walkingBoy = animCommons(walkingBoy, geometry.animations[0], 2);
 
      let walkingBoy1 = walkingBoy.clone();
      walkingBoy1.position.set(-115, -110, 0);
      walkingBoy1.rotation.y = -Math.PI;
      walkingBoy1.wide = 2;
      walkingBoy1.long = 2;
      
      town.add(walkingBoy1);
      pedestrians.walkingBoy1 = animCommons(walkingBoy1, geometry.animations[0], 0.12);
 
    });

   // From Blender Model low-poly-girl-walk1.blend
  jloader.load('./assets/low-poly-girl-walk.json', function (geometry, materials) {
      materials.forEach(function (material) {
        material.skinning = true;
      });
      let walkingGirl = new THREE.SkinnedMesh(
        geometry,
        materials//new THREE.MeshFaceMaterial(materials)
      );
      walkingGirl.scale.set(1,1,1);
      walkingGirl.position.set(155,0,1);
      walkingGirl.rotation.y = Math.PI;
      walkingGirl.rotation.x = Math.PI/2;
      walkingGirl.wide = 2;
      walkingGirl.long = 2;
      town.add(walkingGirl);
      pedestrians.walkingGirl = animCommons(walkingGirl, geometry.animations[0], 2);
  
    });

  jloader.load('./assets/low-poly-girl-walk2.json', function (geometry, materials) {
      materials.forEach(function (material) {
        material.skinning = true;
      });
      let walkingGirl1 = new THREE.SkinnedMesh(
        geometry,
        materials//new THREE.MeshFaceMaterial(materials)
      );
      walkingGirl1.scale.set(1.2,1.2,1.2);
      walkingGirl1.position.set(165,0,1);
      walkingGirl1.rotation.y = Math.PI;
      walkingGirl1.rotation.x = Math.PI/2;
      walkingGirl1.wide = 2;
      walkingGirl1.long = 2;
      town.add(walkingGirl1);
      pedestrians.walkingGirl1 = animCommons(walkingGirl1, geometry.animations[0], 2);
  
    });

  jloader.load('./assets/robot-rig3.json', function (geometry, materials) {
      materials.forEach(function (material) {
        material.skinning = true;
      });
      let runningRobot = new THREE.SkinnedMesh(
        geometry,
        materials//new THREE.MeshFaceMaterial(materials)
      );
      runningRobot.scale.set(5,5,5);
      runningRobot.position.set(0,240,1);
      runningRobot.rotation.y = Math.PI/2;
      runningRobot.rotation.x = Math.PI/2;
      runningRobot.wide = 2;
      runningRobot.long = 2;
      town.add(runningRobot);
      pedestrians.runningRobot = animCommons(runningRobot, geometry.animations[3], 1);
 
    });

   jloader.load('./assets/robot-rig4.json', function (geometry, materials) {
      materials.forEach(function (material) {
        material.skinning = true;
      });
      let runningRobot1 = new THREE.SkinnedMesh(
        geometry,
        materials//new THREE.MeshFaceMaterial(materials)
      );
      runningRobot1.scale.set(5,5,5);
      runningRobot1.position.set(0,245,1);
      runningRobot1.rotation.y = Math.PI/2;
      runningRobot1.rotation.x = Math.PI/2;
      runningRobot1.wide = 2;
      runningRobot1.long = 2;
      town.add(runningRobot1);
      pedestrians.runningRobot1 = animCommons(runningRobot1, geometry.animations[3], 1.2);
 
    });
}

function animCommons(object, animation, scale) {

		object.mixer = new THREE.AnimationMixer(object);
		object.anim = object.mixer.clipAction(animation);
		object.anim.setEffectiveWeight(1);
		object.anim.enabled = true;
		object.anim.play();
		object.anim.timeScale = scale;
		object.anim.paused = false;

		return object;

}

export {createTown, town, parkedCarDoor, cars, pedestrians};