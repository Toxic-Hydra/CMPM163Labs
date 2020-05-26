# Lab 8: Three.js Part

![inspiration](images/dense.jpg)

![My Render](images/myCity.PNG)

### What I did
In my city I used the perlin noise texture to create a densly packed city with small lakes and green areas, similar to the
Inspiration image.
Using a variable to count the iterations of spawned cubes, I placed that iteration into the noiseData array in order
to get several values corresponding to the city. 

noiseData values are first normalized to [0,1] by dividing the value by 255.
Buildings use noise to set the rotation, xz scale, and height.
Values less than 0.5 are blank zones where no building is spawned to decrease the density.
Values less than 0.4 are grass zones and are represented by a grassy texture (its so far away it just kinda shows as a green square zone).
Values less than 0.3 are considered lake zones and are filled in with a light blue plane.

I was not contacted back by my partner which means there was not much we could teach each other.
I will update this area if I they contact me since there are still days left before submission.