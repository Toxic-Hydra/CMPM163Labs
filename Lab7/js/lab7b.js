// setup the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 
window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

    // add two point lights
const light = new THREE.PointLight(0xffffff, 1.0);
light.position.set(-10,5,-25);
scene.add(light);
const light2 = new THREE.PointLight(0xffffff, 1.0);
light2.position.set(0,5,-25);
scene.add(light2);

const mat = new THREE.MeshPhongMaterial({ 
    color:0x2288ff,
    shininess:100, 
    side: THREE.DoubleSide
    });

//As much as I'd prefer to make my own shader, I took some time to understand why the tutorial asks us to modify the existing MeshPhongMaterial with our 
//own vertex code. Incredibly hacky but wv: https://github.com/mrdoob/three.js/issues/11475
var matShader;
mat.onBeforeCompile = (shader) => {
    shader.uniforms.time = { value: 0}
    shader.vertexShader = '\
    uniform float time;\
    \n' + shader.vertexShader

    const token = '#include <begin_vertex>';
    const customTransform = '\
    vec3 transformed = vec3(position);\
    float freq = 3.0;\
    float amp = 0.1;\
    float angle = (time + position.x)*freq;\
    transformed.z += sin(angle)*amp;\
    objectNormal = normalize(vec3(-amp * freq * cos(angle), 0.0, 1.0));\
    vNormal = normalMatrix * objectNormal;\
    '
    
    shader.vertexShader = shader.vertexShader.replace(token, customTransform);
    matShader = shader;
    
}

var p = new THREE.PlaneGeometry(20, 20, 100, 100);
var plane = new THREE.Mesh(p,mat);
plane.position.z = -20;
plane.rotation.x = -1.2;
scene.add(plane);

function animate(time) {
    if(matShader)
        matShader.uniforms.time.value = time/1000;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate)