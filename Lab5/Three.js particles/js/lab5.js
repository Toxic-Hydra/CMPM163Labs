// setup the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 
window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 60;


//Cool vertices
var vertices = [];

for ( var i = 0; i < 1000; i ++ ) {
	var x = THREE.MathUtils.randFloatSpread( 500 );
	var y = THREE.MathUtils.randFloatSpread( 500 );
	var z = THREE.MathUtils.randFloatSpread( 100 );
	vertices.push( x, y, z );
}

//Buffer geometry is an efficient implementation of point geometry.
//I suppose if we want particles the thing to do is a bunch of billboarded points.
var geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new 
THREE.Float32BufferAttribute(vertices, 3));


//Setting the points to an epic circle man
var sprite = new THREE.TextureLoader().load('disc.png');
var material = new THREE.PointsMaterial( { map: sprite, alphaTest: 0.5, transparent: true } );
material.color.setHSL( 1.0, 0.3, 0.7);

var points = new THREE.Points(geometry, material);
scene.add(points);


var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	var mouseX = 0;
	var mouseY = 0;

function onDocumentMouseMove(event) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {
	if (event.touches.length == 1) {
		event.preventDefault();
		mouseX = event.touches[0].pageX - windowHalfX;
		mouseY = event.touches[0].pageY - windowHalfY;
	}
}

function onDocumentTouchMove(event) {
    if (event.touches.length == 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('touchstart', onDocumentTouchStart, false);
document.addEventListener('touchmove', onDocumentTouchMove, false);

function animate() {
    var time = Date.now() * 0.00005;
    var h = (360 * (1.0 + time) % 360) / 360;
    material.color.setHSL(h, 0.5, 0.5);

    camera.position.x += (mouseX - camera.position.x) * 0.0005;
    camera.position.y += (-mouseY - camera.position.y) * 0.0005;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();