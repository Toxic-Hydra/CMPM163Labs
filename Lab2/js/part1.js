var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); //Pretty cool, way simple

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Geometry
var geometry = new THREE.BoxGeometry(); //construct geometry, vertices and shit
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); //construct material, color
var material2 = new THREE.MeshBasicMaterial( { color: 0xff0000 } );//red
var material3 = new THREE.MeshBasicMaterial( { color: 0x0000ff } );//blue 

var cube = new THREE.Mesh(geometry, material);//actually create cube. 3 steps.
var cube2 = new THREE.Mesh(geometry, material2);
var cube3 = new THREE.Mesh(geometry, material3);

scene.add( cube );
scene.add( cube2 );
scene.add( cube3 );

//initial cube pos
cube2.position.y = 2;
cube3.position.x = 3;

camera.position.z = 5;

var breathe = 0; //Originally wanted a breathing effect but having it go super fast makes
//it look sillier.

function update() {
    //red
    breathe += 0.2;
    cube2.scale.x += Math.sin(breathe);

    //blue
    cube3.position.y += Math.sin(breathe);
    
    
    cube.rotation.x += 0.01; //ez pz three.js does matrix shit for you
    cube.rotation.y += 0.01;
}
//rendering
function animate() {
    requestAnimationFrame( animate );
    update();
    renderer.render(scene, camera);
}

animate();