'use strict';

let town = null, parkedCarDoor = null;
let cars, parkedCar = null, doorCollider = null;
let pedestrians = null;

function createTown() 
{

	town = new THREE.Object3D();
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
  
  mtlLoader.load('assets/stop_sign.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/stop_sign.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = -Math.PI/2;
        object.position.set(-145, -178, -1);
        let clone = object.clone();
        clone.position.set(-55, -178, -1);
        clone.rotation.y = -Math.PI;
        town.add(object);
        town.add(clone);
      });
  });
  
  mtlLoader.load('assets/dp1-arrows.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/dp1-arrows.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = -Math.PI/2;
        object.position.set(-160, -165, -1); //DP1
        town.dp1Arrows = object;
        let clone = object.clone();
        clone.position.set(-160, 25, -1); //DP2
        town.dp2Arrows = clone;
        town.add(object);
        town.add(clone);
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
        town.dp10Arrows = object;
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
        town.dp12Arrows = object;
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
        town.dp13Arrows = object;
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
        town.dp3Arrows = object;
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
        town.dp10Arrows = object;
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
        town.dp9Arrows = object;
        let clone = object.clone(); // DP11
        clone.position.set(-5, 178, -1);
        town.dp11Arrows = clone;
        let clone1 = object.clone(); // DP5
        clone1.position.set(-40,25, -1);
        town.dp5Arrows = clone1;
        
        town.add(object);
        town.add(clone);
        town.add(clone1);
       
      });
  });

  mtlLoader.load('assets/dp4-arrows.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/dp4-arrows.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = -Math.PI/2;
        object.position.set(-55,-165, -1); //DP4
        town.dp4Arrows = object;
        let clone = object.clone(); // DP7
        clone.position.set(100,25, -1);
        town.dp7Arrows = clone;
        let clone1 = object.clone(); // DP6
        clone1.position.set(100,-165, -1);
        town.dp6Arrows = clone1;
        let clone2 = object.clone(); // DP8
        clone2.position.set(-60,35, -1);
        town.dp8Arrows = clone2;
        
        town.add(object);
        town.add(clone);
        town.add(clone1);
        town.add(clone2);
      });
  });

  mtlLoader.load('assets/donotenter_sign.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/donotenter_sign.obj', function (object) {
        object.scale.set(1, 1, 1);
        object.rotation.x = Math.PI/2;
        object.rotation.y = -Math.PI;
        object.position.set(-145, 16, -1);
        let clone = object.clone();
        clone.position.set(-145, 58, -1);
        // town = object;
        town.add(object);
        town.add(clone);
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
      // cars.blackCar = parkedCar.clone();
      // cars.blackCar.add(parkedCarDoor);
      // town.add(doorCollider);
      town.add(parkedCar);
      // town.add(cars.blackCar);
  }); 

  mtlLoader.setTexturePath('assets/');
  mtlLoader.load('assets/yellow2.mtl', function (mtl) {

    mtl.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('assets/yellow2.obj', function (object) {
        object.scale.set(5, 5, 5);
        cars.yellowCar = object;
        cars.yellowCar.rotation.x = Math.PI/2;
        cars.yellowCar.rotation.y = Math.PI;
        cars.yellowCar.rotation.z= 0;
        cars.yellowCar.position.set(-4, 100,0);
        
        town.add(object);
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
    cars.redCar.long = 8;
    cars.redCar.wide = 6;
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
    cars.blueCar.long = 8;
    cars.blueCar.wide = 6;
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
      
      // town.billBoard.mixer = new THREE.AnimationMixer(billBoard);
      // town.billBoard.anim = town.billBoard.mixer.clipAction(geometry.animations[1]);
      // town.billBoard.anim.setEffectiveWeight(1);
      // town.billBoard.anim.enabled = true;
      // town.billBoard.anim.play();
      // town.billBoard.anim.timeScale = 0.5;
      
      // town.billBoard.anim.paused = false;
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
      // town.walkingBoy = walkingBoy;
      // town.walkingBoy.mixer = new THREE.AnimationMixer(walkingBoy);
      // town.walkingBoy.anim = town.walkingBoy.mixer.clipAction(geometry.animations[0]);
      // town.walkingBoy.anim.setEffectiveWeight(1);
      // town.walkingBoy.anim.enabled = true;
      // town.walkingBoy.anim.play();
      // town.walkingBoy.anim.timeScale = 0.5;
      
      // town.walkingBoy.anim.paused = false;
      // Clone the walking boy with different color cloths
      let walkingBoy1 = walkingBoy.clone();
      walkingBoy1.position.set(-115, -110, 0);
      walkingBoy1.rotation.y = -Math.PI;
      walkingBoy1.wide = 2;
      walkingBoy1.long = 2;
      
      town.add(walkingBoy1);
      pedestrians.walkingBoy1 = animCommons(walkingBoy1, geometry.animations[0], 0.12);
      // town.walkingBoy1.mixer = new THREE.AnimationMixer(town.walkingBoy1);
      // town.walkingBoy1.anim = town.walkingBoy1.mixer.clipAction(geometry.animations[0]);
      // town.walkingBoy1.anim.setEffectiveWeight(1);
      // town.walkingBoy1.anim.enabled = true;
      // town.walkingBoy1.anim.play();
      // town.walkingBoy1.anim.timeScale = 0.7;
      
      // town.walkingBoy1.anim.paused = false;
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
      // town.walkingGirl.mixer = new THREE.AnimationMixer(walkingGirl);
      // town.walkingGirl.anim = town.walkingGirl.mixer.clipAction(geometry.animations[0]);
      // town.walkingGirl.anim.setEffectiveWeight(1);
      // town.walkingGirl.anim.enabled = true;
      // town.walkingGirl.anim.play();
      // town.walkingGirl.anim.timeScale = 2;
      
      // town.walkingGirl.anim.paused = false;
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
      // town.runningRobot.mixer = new THREE.AnimationMixer(runningRobot);
      // town.runningRobot.anim = town.runningRobot.mixer.clipAction(geometry.animations[3]);
      // town.runningRobot.anim.setEffectiveWeight(1);
      // town.runningRobot.anim.enabled = true;
      // town.runningRobot.anim.play();
      // town.runningRobot.anim.timeScale = 1;
      
      // town.runningRobot.anim.paused = false;
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
      // town.runningRobot1.mixer = new THREE.AnimationMixer(runningRobot1);
      // town.runningRobot1.anim = town.runningRobot1.mixer.clipAction(geometry.animations[3]);
      // town.runningRobot1.anim.setEffectiveWeight(1);
      // town.runningRobot1.anim.enabled = true;
      // town.runningRobot1.anim.play();
      // town.runningRobot1.anim.timeScale = 1.2;
      
      // town.runningRobot1.anim.paused = false;
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