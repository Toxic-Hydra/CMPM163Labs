# Lab 3

## First cube far left
Built using Three.js built in material functionality. This material sets the color and specularity to Blue. 
It is also semi transparent giving it a bit of a ghostly appearance, Although it would look better in a proper scene.

## Two middle Cubes
Provided lab cubes.
The one furthest to the left uses the built in material functions to create a grey cube with green specular highlights and a bit of shine.
The second one uses a custom shader that passes in two colors into the fragment shader so they are interpolated.

## Far Right Cube
This cube uses a custom shader. For this shader I adapted a classic shader to better fit Three.js. 
This shader modifies the color of the cube by the passage of time. This works through the use of a cosine function
that is updated with a new deltaTime value every frame and passing that value from the javascript file to the fragment shader.
Its appearance is that of a cube that shifts to rainbow like colors.

## Video
[Very cool Video Link](https://drive.google.com/file/d/1Jak-KpnCmvFmzJF3RJkuT1IJQLilIU-E/view?usp=sharing)