// setup the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

//Loading
var loader = new THREE.TextureLoader();

var texture = loader.load("normal maps/197.jpg");
var normMap = loader.load("normal maps/197_norm.jpg");

//shaderloading
THREE.Cache.enabled = false;
var count = 0;
var tcount = 0;
var sloader = new THREE.FileLoader();
var fshader, vshader;
var tfshader, tvshader;

sloader.load('shaders/vertexShader.vert',
        function(data) {
            console.log(data);
            vshader = data;
            count++;
            addTextureShaderCube();
        },
        function(xhr) {
            console.log((xhr.loaded/xhr.total * 100)+ '% loaded');
        },
        function(err) {
            console.error('Error VertexShader');
        });

sloader.load('shaders/fragmentShader.frag',
        function(data) {
            console.log(data);
            fshader = data;
            count++;
            addTextureShaderCube();
        },
        function(xhr) {
            console.log((xhr.loaded/xhr.total * 100)+ '% loaded');
        },
        function(err) {
            console.error('Error fragShader');
        });

sloader.load('shaders/tvertexShader.vert',
        function(data) {
            console.log(data);
            tvshader = data;
            tcount++;
            addTileShaderCube();
        },
        function(xhr) {
            console.log((xhr.loaded/xhr.total * 100)+ '% loaded');
        },
        function(err) {
            console.error('Error tVertexShader');
        });

sloader.load('shaders/fragmentShader.frag',
        function(data) {
            console.log(data);
            tfshader = data;
            tcount++;
            addTileShaderCube();
        },
        function(xhr) {
            console.log((xhr.loaded/xhr.total * 100)+ '% loaded');
        },
        function(err) {
            console.error('Error tfragShader');
        });

var geo1, mat1, mesh1;

function addTextureShaderCube() {
    if(count == 2)
    {
        var t = loader.load("normal maps/177.jpg");
        t.wrapT = t.wrapS = THREE.RepeatWrapping;
        let uniforms = {
            texture1: {type: "t", value: t}
        };

        geo1 = new THREE.BoxGeometry(1, 1, 1);
        mat1 = new THREE.ShaderMaterial( {
            uniforms: uniforms,
            fragmentShader: fshader,
            vertexShader: vshader,
            precision: "mediump"
        });

        mesh1 = new THREE.Mesh(geo1, mat1);
        mesh1.position.y = 2;
        scene.add(mesh1);
    }
}
var geo2, mat2, mesh2;

function addTileShaderCube() {
    if(tcount == 2)
    {
        var t = loader.load("normal maps/176.jpg");
        t.wrapT = t.wrapS = THREE.RepeatWrapping;
        let uniforms = {
            texture1: {type: "t", value: t}
        };

        geo2 = new THREE.BoxGeometry(1, 1, 1);
        mat2 = new THREE.ShaderMaterial( {
            uniforms: uniforms,
            fragmentShader: fshader,
            vertexShader: tvshader,
            precision: "mediump"
        });

        mesh2 = new THREE.Mesh(geo2, mat2);
        mesh2.position.x = 2;
        scene.add(mesh2);
    }
}

// setup the cube
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshPhongMaterial( { map: texture, normalMap: normMap } );

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var material = new THREE.MeshPhongMaterial( { map: texture } );
var cube2 = new THREE.Mesh(geometry, material);
scene.add(cube2);
cube2.position.x -= 2;

var tex3 = loader.load("normal maps/163.jpg");
var norm3 = loader.load("normal maps/154_norm.jpg");
var material3 = new THREE.MeshPhongMaterial( { map: tex3, normalMap: norm3 } );
var cube3 = new THREE.Mesh(geometry, material3);
scene.add( cube3 );
cube3.position.y -= 2;

// add the light
var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(10, 10, 10);
scene.add(light);

var value = 0;

function animate() {
    light.position.x = Math.sin(value)*100;
    value += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

