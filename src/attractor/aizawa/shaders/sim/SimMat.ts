import { DataTexture, FloatType, RGBAFormat, ShaderMaterial } from "three";
import { getRandom, getRandomPI } from "../../../0-dataFn/getRandom";
// import { getSphere } from "../../../0-dataFn/getSphere";

export default class SimMatThomas extends ShaderMaterial {
  constructor(size: number) {
    const positionsTexture = new DataTexture(
      getRandom(size),
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

    vec3 aizawaAttractor(vec3 pos, float dt){
        const float a = .95;	
        const float b = .7;
        const float c = .6;
        const float d = 3.5;
        const float e = .25;
        const float f = .1;

        vec3 target = vec3(0);
        float x = pos.x;
        float y = pos.y;
        float z = pos.z;

        target.x = (z - b)*x - d*y;
        target.y = d*x + (z - b)*y;
        target.z = c + a*z - (z*z*z / 3.) - (x*x + y*y) * (1. + e*z) + f*z*x*x*x;

        return target *dt ;
        
    }

    float map(float v, float iMin, float iMax ) { return (v-iMin)/(iMax-iMin); }

    void main() {
      vec2 uv = vUv;   
      vec3 pos = texture2D( uPositions, uv ).xyz;
      vec3 pos2 = texture2D( uPositions2, uv ).xyz;
      
      //gif setup -------------------------------------------------------------------------------
      float loopLength = 6.;
      float transitionStart = 3.;
      float time = mod(uTime , loopLength );
      float transitionProgress = map(time, transitionStart, loopLength);
      vec3 q = pos;
      vec3 q2 = pos2;
  
      float force = 0.5*mix(0., 1., smoothstep(0.,2., abs(pos2.y   ))); 
      vec3 target = q +  aizawaAttractor(pos,0.01   );

      gl_FragColor = vec4(target, 1.);
      }`,
    });
  }
}
