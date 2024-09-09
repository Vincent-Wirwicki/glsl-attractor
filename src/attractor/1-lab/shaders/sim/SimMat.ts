import { DataTexture, FloatType, RGBAFormat, ShaderMaterial } from "three";
import { getRandomPI } from "../../../0-dataFn/getRandom";
import { getSphere } from "../../../0-dataFn/getSphere";
// import { getSphere } from "../../../0-dataFn/getSphere";

export default class SimMatThomas extends ShaderMaterial {
  constructor(size: number) {
    const positionsTexture = new DataTexture(
      getSphere(size, 4),
      size,
      size,
      RGBAFormat,
      FloatType
    );
    const positionsTexture2 = new DataTexture(
      getRandomPI(size),
      size,
      size,
      RGBAFormat,
      FloatType
    );

    positionsTexture.needsUpdate = true;
    positionsTexture2.needsUpdate = true;

    super({
      uniforms: {
        uPositions: { value: positionsTexture },
        uPositions2: { value: positionsTexture2 },
        uTime: { value: 0 },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
          }
      `,
      fragmentShader: /* glsl */ `
    uniform sampler2D uPositions;
    uniform sampler2D uPositions2;
    uniform float uTime;
    varying vec2 vUv;
    #define PI 3.141592653589793

      vec3 HalvorsenAttractor(vec3 pos, float t){
        float a = 1.89;

        vec3 target = vec3(0);
        float x = pos.x;
        float y = pos.y;
        float z = pos.z;

        target.x = -a*x - 4.*y - 4.*z - y*y;
        target.y = -a*y - 4.*z - 4.*x -z*z ;
        target.z = -a*z -4.*x - 4.*y - x*x ;
        
        return target * t;
      }     
      vec3 thomasAttractor(vec3 pos, float t){   
      const float b = 0.19;
      
      vec3 target = vec3(0); 
      float x = pos.x;
      float y = pos.y;
      float z = pos.z;

      target.x = -b*x + sin(y) ;
      target.y = -b*y + sin(z) ;
      target.z = -b*z + sin(x) ;   
      
      return target * t;
    }


    float random(in vec3 pos) {
    return fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
}
vec3  quintic(const in vec3 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }


float gnoise3(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = quintic(f);
    return -1.0 + 2.0 * mix( mix( mix( random(i + vec3(0.0,0.0,0.0)), 
                                        random(i + vec3(1.0,0.0,0.0)), u.x),
                                mix( random(i + vec3(0.0,1.0,0.0)), 
                                        random(i + vec3(1.0,1.0,0.0)), u.x), u.y),
                            mix( mix( random(i + vec3(0.0,0.0,1.0)), 
                                        random(i + vec3(1.0,0.0,1.0)), u.x),
                                mix( random(i + vec3(0.0,1.0,1.0)), 
                                        random(i + vec3(1.0,1.0,1.0)), u.x), u.y), u.z );
}



    float map(float v, float iMin, float iMax ) { return (v-iMin)/(iMax-iMin); }

float cubicOut(float t) {
  float f = t - 1.0;
  return f * f * f + 1.0;
}
float circularOut(float t) {
  return sqrt((2.0 - t) * t);
}

float backIn(float t) {
  return pow(t, 3.0) - t * sin(t * PI);
}

float cubicInOut(float t) {
  return t < 0.5
    ? 4.0 * t * t * t
    : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
}

float cubicIn(float t) {
  return t * t * t;
}

    void main() {
      vec2 uv = vUv;   
      vec3 pos = texture2D( uPositions, uv ).xyz;
      vec3 pos2 = texture2D( uPositions2, uv ).xyz;
      
      //gif setup -------------------------------------------------------------------------------
      float loopLength = 12.;
      float transitionStart = loopLength * .25;
      float time = mod(uTime, loopLength );

      float transitionProgress = map(time, transitionStart, loopLength);
      // float progress = clamp(transitionProgress, .025,.075);
      // float progress2 = clamp(transitionProgress, .0005,.001);
      
      float progress = mix( .025,.05, transitionProgress);
      float progress2 = mix( .00075,.001,transitionProgress);
      float progress3 = mix( 0.,.3,transitionProgress);
      float disp = gnoise3(vec3(0.5) );

      vec3 q = pos ;
      vec3 q2 = pos2;

      // 0.03 0.00095 (2. - progress2) * progress2
      vec3 target = q +  thomasAttractor(pos,  progress );
      vec3 target2 = q +  HalvorsenAttractor(pos2, progress2 );

      target -= disp *0.1 ;
      vec3 render = mix(target, target2, cubicOut(progress3));


      //--------------------------------------------------------------------------------------------

      gl_FragColor = vec4( render, 1.);
      }`,
    });
  }
}
