varying vec3 vUv;
//Adaptation of Classic shadertoy shader.
uniform vec3 Resolution;
uniform float Time;

void update( out vec4 fragColor, in vec2 fragCoord) {
    vec2 nor = fragCoord/Resolution.xy;
    vec3 color = 0.5 + 0.5*cos(Time + nor.xyx + vec3(0, 2, 4));

    fragColor = vec4(color, 1.0);
}

void main() {
    update(gl_FragColor, gl_FragCoord.xy);
}