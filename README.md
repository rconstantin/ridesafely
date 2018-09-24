# ridesafely
## A Three.js game about bike riding safety.
1. This project is using Babel and Webpack to organize and run locally.
2. To build, run: npm run webpack
3. To run Locally (Starting up the http-server): npm start (http-server -p 8000 => http://localhost:8000/ to run)
4. Directory structure: 
    * assets: contains Blender models (*.obj and *.mtl) (needed to run and should be installed on server)
    * images: contains pics used by site (needed to run and should be installed on server)
    * lib: contains js libraries needed to run project and should be installed on server (three and bootstrap could be installed/extracted
       from node_modules but for now they are not to speed the build)
    * js: contains the js modules that are bundled into build/app.bundle.js
    * build: contains app.bundle.js and app.bundle.js.map to be uploaded on server
  
 
