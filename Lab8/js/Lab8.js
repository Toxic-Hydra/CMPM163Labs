// setup the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
scene.background = new THREE.Color( 0xffbf00 );
document.body.appendChild(renderer.domElement);
camera.position.z = 10;
camera.position.y = 3;
camera.lookAt(0,0,0);




// PlaneGeometry
const mat = new THREE.MeshPhongMaterial({color:0xEDC9AF, shininess:100, side:THREE.DoubleSide});
var planeSize = 30;
var p = new THREE.PlaneGeometry(planeSize, planeSize, 100, 100);
var plane = new THREE.Mesh(p, mat);
var planeCenter = new THREE.Vector3(0,-parseInt(planeSize/4),-planeSize/2);
plane.position.z = planeCenter.z;
plane.position.y = planeCenter.y;
plane.rotation.x = Math.PI/2;
scene.add(plane);

// add the lights all around the city
for(var a = 270; a < 270 * 2; a+=100) {
var light = new THREE.PointLight(0xffffff, 1, planeSize * 1.5);
light.position.set(
planeSize * Math.cos(THREE.MathUtils.degToRad(a)),
  planeCenter.y + planeSize/2,
  planeCenter.z + planeSize * Math.sin(THREE.MathUtils.degToRad(a)));
scene.add(light);
}

//make the camera able to rotate around the city 
//based on the a,d keys
var angle = THREE.MathUtils.degToRad(270);
camera.position.x = planeSize * 1.2 * Math.cos(angle);
camera.position.z = planeCenter.z + planeSize * 1.2 * Math.sin(angle);
camera.position.y = 4;
camera.lookAt(0,0,planeCenter.z);
document.onkeypress =  function(event) {
var x = event.key;
if(x == 'a') {
angle += 0.1;
} else if (x == 'd') {
angle -= 0.1;
}
camera.position.x = planeSize * 1.2 * Math.cos(angle);
camera.position.z = planeCenter.z + planeSize * 1.2 * Math.sin(angle);
camera.lookAt(0,0,planeCenter.z);
};

//Pure Javscript load perlin noise
//canvas context
function initContext(canvasID, contextType)
{
    var canvas = document.createElement('canvas');
    var context = canvas.getContext(contextType);
    return context;
}

//Loads image calling readImage after
function loadImage(imageSource, context)
{
    var imageObj = new Image();
    imageObj.onload = function() {
        context.drawImage(imageObj, 0, 0);

        var imageData = context.getImageData(0 , 0, planeSize, planeSize); //sampling from 0, 0, to 34, 34
        readImage(imageData);
    };

    imageObj.src = imageSource;
}


var texture = new THREE.TextureLoader().load("images/building.png");
var grass = new THREE.TextureLoader().load("images/grass.jpg");

//Called upon image loading.
function readImage(imageData)
{
    //Noise is greyscale, meaning we only really need to grab the red value. so every 4th value.
    var noiseData = [];
    
    for(var i = 0; i < imageData.data.length; i+=4)
    {
        //console.log(imageData.data[i]);
        noiseData.push(imageData.data[i]);
    }

    var it = 0;
    //now our noise data is in an array.
    //Covering the plane in cubes
    for(var r = -planeSize/2; r < planeSize/2; r++)
    {
        for(var c = -planeSize/2; c < planeSize/2; c++ )
        {
            it++; //using this value gives us a world that resembles the noise texture.
            var noise = noiseData[Math.floor(Math.random() * noiseData.length)];
            var noiseSet = noiseData[it]/255;
            
            //console.log((noise/255)*10);
            if(noiseSet < 0.3)
            {
                var geometry = new THREE.BoxGeometry();
                var material = new THREE.MeshPhongMaterial( { color: 0xadd8e6 } );
                var cube = new THREE.Mesh(geometry, material);

                cube.scale.y = 0.1;
                cube.position.z = planeCenter.z + c + cube.scale.z/2;
                cube.position.x = r + cube.scale.x / 2;
                cube.position.y = planeCenter.y + cube.scale.y/2;
            
                scene.add(cube);
                continue;
            }
            else if(noiseSet < 0.4) //grassy fields
            {
                var geometry = new THREE.BoxGeometry();
                var material = new THREE.MeshPhongMaterial( { map: grass } );
                var cube = new THREE.Mesh(geometry, material);

                cube.scale.y = 0.1;
                cube.position.z = planeCenter.z + c + cube.scale.z/2;
                cube.position.x = r + cube.scale.x / 2;
                cube.position.y = planeCenter.y + cube.scale.y/2;
            
                scene.add(cube);
                continue;
            }
            else if(noiseSet < 0.5) //Lowering density of the city.
            {
                continue;
            }
            
            var geometry = new THREE.BoxGeometry();
            //geometry.faces.splice( 3, 1 );
            geometry.uvsNeedUpdate = true;
            geometry.faceVertexUvs[0][2].push(new THREE.Vector2(0, 0));
            geometry.faceVertexUvs[0][2].push(new THREE.Vector2(0, 0));
            geometry.faceVertexUvs[0][2].push(new THREE.Vector2(0, 0));
            geometry.faceVertexUvs[0][2].push(new THREE.Vector2(0, 0));
            
            
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1,1);
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            var material = new THREE.MeshPhongMaterial( { map: texture } );
            var cube = new THREE.Mesh(geometry, material);

            //randomization
            cube.rotation.y = Math.random()*Math.PI*2;
            //doing this after positioning will place the cubes at their half way point
            //with their new height. This results in a blob like figure which is not what we want.
            
            cube.scale.y = (noiseData[it]/256)*10;//noise/15;

            //console.log(noiseData[Math.floor(Math.random() * noiseData.length)] *.001);
            cube.scale.x = noise * .004;//noise/255;
            cube.scale.z = noise * .004;//noise/255;

            cube.position.z = planeCenter.z + c + cube.scale.z/2;
            cube.position.x = r + cube.scale.x / 2;
            cube.position.y = planeCenter.y + cube.scale.y/2;
            
            scene.add(cube);
        }
    }
}

var context = initContext('canvas', '2d');
loadImage('images/perlin_34_34.jpg', context);


function animate() {
requestAnimationFrame(animate);
renderer.render(scene, camera);
}
animate();