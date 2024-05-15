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

    float map(float v, float iMin, float iMax ) { return (v-iMin)/(iMax-iMin); }
float quadraticOut(in float t) { return -t * (t - 2.0); }

    void main() {
      vec2 uv = vUv;   
      vec3 pos = texture2D( uPositions, uv ).xyz;
      vec3 pos2 = texture2D( uPositions2, uv ).xyz;
      
      //gif setup -------------------------------------------------------------------------------
      float loopLength = 2.5;
      float transitionStart = 7.5;
      float time = mod(uTime , loopLength );
      float transitionProgress = map(time, transitionStart, loopLength);
      float progress = mix(0.075,0.1,transitionProgress);
      vec3 q = pos;
      vec3 q2 = pos2;
      pos /= transitionProgress  + .25;
      // pos2 /= transitionProgress;

      vec3 disp = q +  thomasAttractor(pos2, quadraticOut(progress)  );
      vec3 target = q +  thomasAttractor(pos, quadraticOut(progress));
      // target += sin(pos2 *2.)*0.01;
      float d = length(target - disp)*.3;
      // target += disp*0.01;
      target += d;
      //--------------------------------------------------------------------------------------------

      gl_FragColor = vec4(target, 1.);
      }`,
    });
  }
}
