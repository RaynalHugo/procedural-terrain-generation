export const vertexShader = /* glsl */ `
varying vec3 vUv; 
uniform float strength;
uniform float minValue;

void main() {
  vUv = position; 

  vec3 modifiedPosition = position;

  if (modifiedPosition.y / strength < minValue) {
    modifiedPosition.y = minValue * strength; 
  }

  vec4 modelViewPosition = modelViewMatrix * vec4(modifiedPosition, 1.0);
  gl_Position = projectionMatrix * modelViewPosition; 
}
`;

export const fragmentShader = /* glsl */ `

struct Color {
  vec3 color;
  float baseHeight; 
  float baseBlend; 
  float noiseFactor;
  float noiseFrequency;
  float noiseOffset;
  sampler2D texture;
};

uniform sampler2D colorTexture;
const int maxColorCount = 8;
uniform float strength;
varying vec3 vUv;

uniform Color colors[maxColorCount];


float inverseLerp(float a, float b, float value ) {
  return clamp((value - a) / (b - a), 0.0, 1.0);
}

float random (in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {

  float relativeHeight = clamp( vUv.y / strength , 0. ,1.);


  gl_FragColor = vec4(colors[0].color, 1);
//   gl_FragColor = vec4( relativeHeight ,0,0 , 1);



  for (int i = 0; i < maxColorCount; i++ ) {

    float computedNoise =  noise(vec2((vUv.x + colors[i].noiseOffset) * colors[i].noiseFrequency, (vUv.z + colors[i].noiseOffset) * colors[i].noiseFrequency));
    float noiseFactor = colors[i].noiseFactor;
    float baseBlendAddition = (computedNoise * noiseFactor - noiseFactor / 2.0);

    float colorStrength = inverseLerp( 
      - (colors[i].baseBlend - baseBlendAddition) / 2.0,
      (colors[i].baseBlend + baseBlendAddition) / 2.0,
      relativeHeight - colors[i].baseHeight
    );
    gl_FragColor = 
      (1.0 - colorStrength) * gl_FragColor 
      + colorStrength 
      * ( vec4(
        mix(
          colors[i].color, 
          texture2D( 
            colors[i].texture, 
            vec2(
              mod(vUv.x*10., 512.)/512., 
              mod(vUv.z*10., 512.)/512.
              )
            ).rgb,
          0.
          // 0.3
          ), 
        1)
       ) ; 
  };
// gl_FragColor = vec4(texture2D( colorTexture, vec2(vUv.x, vUv.y)).rgb, 1);
}
`;
