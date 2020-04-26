# Lab4: The one with texture mapping.

## Cubes
The Leftmost Cube was made through the provided Lab4 tutorial.
As was the center Cube using Three.js' built in Texturing and Normal Map methods.
The bottom cube was created using the same method however I used a rusty texture with a 
brick normal map to give it an interesting look.
The Cube at the top is rendered through the use of shaders and the texture2D function.
Finally the far right cube is also rendered with shaders. However, its texture tiles so 
the texture is displayed 4 times on each side. 
To achieve this I multiplied the UV texture space in the vertex shader by a value of 2.
This gets the texture to map from 0.0 -> 0.5 on both u and v. the next step is to enable
texture tiling. I achieved this by setting the wrap mode on the loaded texture to tiling:
```javascript
var t = loader.load("normal maps/176.jpg");
        t.wrapT = t.wrapS = THREE.RepeatWrapping;
```


### Answers to 24
Depending on the renderer, the following formula may use a ceiling or a floor to handle rounding.
..* A: to get the x value of a pixel from the texture: u * 8 (u * textureWidth)
..* B: to get the y value of a pixel from the texture: v * 8 (v * textureHeight)
..* C: the uv: (0.375, 0.25) correspond to a white pixel.

### Video

[Video Link](https://drive.google.com/file/d/1ZEzh1JWLMO3BvghageW-mQJ5Wl4bgbio/view?usp=sharing)