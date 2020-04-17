// setup the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 
window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

THREE.Cache.enabled = true;
var count = 0;
var rcount = 0;
var loader = new THREE.FileLoader();
var fshader, vshader, rvShader, rfShader;

//Methods
var geometry1, material1, mesh1;

function addCoolCube() {
    if(count == 2) {
        let uniforms = {
            colorB: {type: 'vec3', value: new
                        THREE.Color(0xACB6E5)},
            colorA: {type: 'vec3', value: new
                        THREE.Color(0x74ebd5)}
        };

        geometry1 = new THREE.BoxGeometry(1, 1, 1);
        material1 = new THREE.ShaderMaterial( { 
            uniforms: uniforms,
            fragmentShader: fshader,
            vertexShader: vshader,
            precision: "mediump"
        });
        mesh1 = new THREE.Mesh(geometry1, material1);
        mesh1.position.x = 2;
        scene.add(mesh1);
    }
}

var geometry2, material2, mesh2;
const runiforms = {
    Resolution: {type: 'vec3', value: new THREE.Vector3()},
    Time: {type: 'float', value: 0}
}

function addRainCube() {
    if(rcount == 2) {
        

        geometry2 = new THREE.BoxGeometry(1, 1, 1);

        material2 = new THREE.ShaderMaterial( { 
            uniforms: runiforms,
            fragmentShader: rfShader,
            vertexShader: rvShader,
            //precision: "mediump"
        });
        mesh2 = new THREE.Mesh(geometry2, material2);
        mesh2.position.x = 4;
        
        scene.add(mesh2);
    }
}

//Load vertex shader
loader.load('shaders/vertexShader.vert',
    function(data) {
        console.log(data); //Console output
        vshader = data;
        count += 1;
        addCoolCube();
    }, 
    //Callback onProgress
    function(xhr) {
        console.log((xhr.loaded/xhr.total * 100) + '%loaded');
    },
    //callback onError
    function(err) {
        console.error("Error, vertexShader");
    });

//load fragment shader
loader.load('shaders/fragmentShader.frag',
    function(data) {
        console.log(data); //Console output
        fshader = data;
        count += 1;
        addCoolCube();
    }, 
    //Callback onProgress
    function(xhr) {
        console.log((xhr.loaded/xhr.total * 100) + '%loaded');
    },
    //callback onError
    function(err) {
        console.error("Error, fragmentShader");
    });

//Load rainbow fragment

loader.load('shaders/rainbowFragment.frag',
    function(data) {
        console.log(data); //Console output
        rfShader = data;
        rcount += 1;
        addRainCube();
    }, 
    //Callback onProgress
    function(xhr) {
        console.log((xhr.loaded/xhr.total * 100) + '%loaded');
    },
    //callback onError
    function(err) {
        console.error("Error, RainbowFrag");
    });
//Load rainbow vertex
loader.load('shaders/rainbowVertex.vert',
    function(data) {
        console.log(data); //Console output
        rvShader = data;
        rcount += 1;
        addRainCube();
    }, 
    //Callback onProgress
    function(xhr) {
        console.log((xhr.loaded/xhr.total * 100) + '%loaded');
    },
    //callback onError
    function(err) {
        console.error("Error, rainbowVert");
    });



// setup the cube
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0x00ff00, shininess: 30 });
var matblue  = new THREE.MeshPhongMaterial( { color: 0x87CEEB, specular: 0x00008b, opacity: 0.5, transparent: true})
var cube = new THREE.Mesh( geometry, material );
var cube2 = new THREE.Mesh(geometry, matblue);
scene.add(cube);
scene.add(cube2);
cube2.position.x = -2;

// add the light
var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(10, 10, 10);
scene.add(light);

function animate(time) {
    time *= 0.001;
    requestAnimationFrame(animate);

    runiforms.Resolution.value.set(window.innerWidth, window.innerHeight, 1);
    runiforms.Time.value = time;    

    geometry.rotateX(0.01);
    geometry.rotateY(0.01);

    if(geometry1) {
        geometry1.rotateX(0.01);
        geometry1.rotateY(0.01);
    }

    if(geometry2) {
        geometry2.rotateX(0.01);
        geometry2.rotateY(0.01);
    }

    renderer.render(scene, camera);
}
animate();