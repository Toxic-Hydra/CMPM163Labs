// setup the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 
window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.y = 5;
camera.position.z = 0;
camera.rotation.x = -.5;

const light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(1,1,1).normalize();
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.3));

var uniforms = {
    texture1: { type: "t", value: new THREE.TextureLoader().load("images/snow.jpg")},
    heightMap1: {type: "t", value: new THREE.TextureLoader().load("images/1182OS_02_05.jpg")}
};

//Experimented with Shader Loading modes. TBH none of them are satisfying
//But external loading allows me to edit the shaders with more clarity.
var shaderLoader = new THREE.FileLoader();
var fshader, vshader, material, count = 0;

shaderLoader.load('Shaders/fragmentShader.frag',
    function(data) {
        console.log(data);
        fshader = data;
        count++;
        createPlane();
    },
    function(xhr) {
        console.log((xhr.loaded/xhr.total*100) + '% loaded');
    },
    function(err) {
        console.error("Error FragShader");
    });

shaderLoader.load("Shaders/vertexShader.vert",
    function(data) {
        console.log(data);
        vshader = data;
        count++;
        createPlane();
    },
    function(xhr) {
        console.log((xhr.loaded/xhr.total*100) + "% loaded");
    },
    function(err) {
        console.error("Error vertexShader");
    });

function createPlane()
{
    if(count == 2) {
        material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vshader,
            fragmentShader: fshader
        });
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(10 , 10, 400, 400), material);
        plane.position.z = -10;
        plane.position.y = -1;
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);
    }
}




function animate(time) {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate)