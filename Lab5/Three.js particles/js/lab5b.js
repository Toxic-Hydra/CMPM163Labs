// setup the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 60;

var particles = []
const geo = new THREE.Geometry();
for(let i = 0; i < 1000; i++)
{
    const particle = {
        position: new THREE.Vector3(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 3 - 3
        ),
        velocity: new THREE.Vector3(
            Math.random() * .02 - .01,
            0.06,
            Math.random() * .02 - .01
        ),
        acceleration: new THREE.Vector3(
            Math.random() * .002 - .001,
            Math.random() * .002 - .001,
            0
        ),
    }
    particles.push( particle );
    geo.vertices.push( particle.position );
}

var sprite = new THREE.TextureLoader().load('disc.png');
var material = new THREE.PointsMaterial( { map: sprite, alphaTest: 0.5, transparent: true } );
material.color.setHSL( 1.0, 0.3, 0.7);

var points = new THREE.Points(geo, material);
points.position.z = -4;
scene.add(points);

function animate() {
    particles.forEach(p => {
        p.velocity.add( p.acceleration );
        p.position.add( p.velocity );
    });
    points.geometry.verticesNeedUpdate = true;

	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();