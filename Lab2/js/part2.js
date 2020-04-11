var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 
window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 200;

//Lighting
var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(50, 50, 50);
scene.add( light );

//Loader
var sonic;
var loader = new THREE.GLTFLoader();
loader.load('scene.gltf', function(gltf) {
    sonic = gltf.scene;
    scene.add( gltf.scene );
    animate();
}, function(xhr) {
    console.log((xhr.loaded/xhr.total * 100) + '% loaded' );
}, function(error) {
    console.error( error );
});

loader.load('cat.glb', function(gltf) {
    gltf.scene.position.x = -40;
    gltf.scene.rotation.y = 90;
    scene.add( gltf.scene );
}, function(xhr) {
    console.log((xhr.loaded/xhr.total * 100) + '% loaded' );
}, function(error) {
    console.error( error );
});

loader.load('dog.glb', function(gltf) {
    gltf.scene.position.x = 40;
    scene.add( gltf.scene );
}, function(xhr) {
    console.log((xhr.loaded/xhr.total * 100) + '% loaded' );
}, function(error) {
    console.error( error );
});

//Update
function animate()
{
    sonic.rotation.y += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
//animate();