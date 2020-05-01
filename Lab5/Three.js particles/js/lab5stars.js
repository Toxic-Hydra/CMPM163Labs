// setup the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 60;

var particles = []
const geo = new THREE.Geometry();
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
for(let i = 0; i < 2000; i++)
{
    const particle = {
        position: new THREE.Vector3(
            getRndInteger(-window.innerWidth/2, window.innerWidth/2),
            getRndInteger(-window.innerHeight/2, window.innerHeight/2 ),
            Math.random() * 3 - 3
        ),
        velocity: new THREE.Vector3(
            Math.random() * .02 - .01,
            0.06,
            Math.random() * .02 - .01
        ),
        acceleration: new THREE.Vector3(
            0,//Math.random() * .002 - .001,
            0,//Math.random() * .002 - .001,
            .002//Math.random() * .02 - .001
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

    var time = Date.now() * 0.00005;
    var h = (360 * (1.0 + time) % 360) / 360;
    material.color.setHSL(h, 0.5, 0.5);
    
    particles.forEach(p => {
        p.velocity.add( p.acceleration );
        p.position.add( p.velocity );
        if(p.position.z > 10) //Reset star array
        {
            p.position.x = getRndInteger(-window.innerWidth, window.innerWidth/2);
            p.position.y = getRndInteger(-window.innerHeight, window.innerHeight/2 );
            p.position.z = -10;

        }
    });
    points.geometry.verticesNeedUpdate = true;

	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();