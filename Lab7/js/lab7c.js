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
    texture1: { type: "t", value: new THREE.TextureLoader().load("images/terrain_texture.jpg")},
    heightMap1: {type: "t", value: new THREE.TextureLoader().load("images/heightMap1.png")}
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
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(20 , 20, 400, 400), material);
        plane.position.z = -20;
        
        plane.rotation.x = -1.2;
        scene.add(plane);
    }
}


const mat = new THREE.MeshPhongMaterial({ 
    color:0x2288ff,
    shininess:100, 
    side: THREE.DoubleSide,
    opacity: 0.2,
    transparent: true,
    });

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
plane.position.y = 0.3;
plane.rotation.x = -1.2;
scene.add(plane);

var sonic;
var loader = new THREE.GLTFLoader();
loader.load('scene.gltf',
function(gltf) {
    sonic = gltf.scene;
    sonic.scale.set(0.05, 0.05, 0.05);
    sonic.position.x = 6.5;
    sonic.position.z = -20;
    sonic.position.y = 1;
    scene.add(gltf.scene);

},
function(xhr) {
    console.log((xhr.loaded/xhr.total*100) + "% loaded");
},
function(error) {
    console.error(error);
});



function animate(time) {
    
    if(matShader)
        matShader.uniforms.time.value = time/1000;

    if(sonic)
    {
        var angle = (time + sonic.position.z)*0.001;
        sonic.position.x += Math.sin(angle)*0.002;
    }
        

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate)