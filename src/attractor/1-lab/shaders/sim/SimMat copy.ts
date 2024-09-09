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

    vec3 boualiAttractor(vec3 pos, float dt){
        vec3 target = vec3(0);
        float x = pos.x;
        float y = pos.y;
        float z = pos.z;

        // sprott R
        // target.x = .9 - y;
        // target.y = .4+z;
        // target.z = x*y - z;


        // sprott A
        // target.x = y ;
        // target.y = -x + y*z;
        // target.z = 1. - y*y;

        // sprott B
        // target.x = y *z;
        // target.y = x-y;
        // target.z = 1. - x*y;

        // sprott C
        // target.x = y*z ;
        // target.y = x - y;
        // target.z = 1. - x*x;

        // sprott D
        // const float a = 3.;
        // target.x = -y ;
        // target.y = x+z;
        // target.z = x*z + a*y*y;

        // sprott E
        // const float a = 4.;
        // target.x = y*z ;
        // target.y = x*x - y;
        // target.z = 1. - a*x;

        // sprott F
        // const float a = .5;
        // target.x = y + z ;
        // target.y = -x + a*y;
        // target.z = x*x - z;
        const float a = 1.5;	

        target.x = y ;
        target.y = -x + y*z;
        target.z = a - y*y;

        return target *dt ;
        
    }


    //   vec3 lorenzAttractor(vec3 pos, float dt){
    //     const float a = 10.;	
    //     const float p = 28.;
    //     const float b = 8./3.;
    //     const float d = 2.5;

    //     vec3 target = vec3(0);
    //     float x = pos.x;
    //     float y = pos.y;
    //     float z = pos.z;

    //     target.x = a*(y - x);
    //     target.y = x*(p - z) - y;
    //     target.z = x*y - b*z;

    //     return target *dt ;
        
    // }

    // vec3 fourWing3attractor(vec3 pos, float dt){
    //     const float a = 10.;	
    //     const float b = 40.;
    //     const float c = 2.;
    //     const float d = 2.5;

    //     vec3 target = vec3(0);
    //     float x = pos.x;
    //     float y = pos.y;
    //     float z = pos.z;

    //     target.x = x + y + y*z;
    //     target.y = y*z - x*z;
    //     target.z = -z - x*y + 1. ;
    //     return target *dt ;
        
    // }
    
    // vec3 coualiAttractor(vec3 pos, float dt){
    // inverse of arneado
    //     const float a = .8;	
    //     const float b = -1.1;
    //     const float c = -.45;
    //     const float d = -1.;
    //      const float e = 1.;


    //     vec3 target = vec3(0);
    //     float x = pos.x;
    //     float y = pos.y;
    //     float z = pos.z;

    //     target.x = y;
    //     target.y = z;
    //     target.z = a*x + b*y + c*z + d*x*x*x;
    //     return target *dt ;
    // }


    float map(float v, float iMin, float iMax ) { return (v-iMin)/(iMax-iMin); }

    void main() {
      vec2 uv = vUv;   
      vec3 pos = texture2D( uPositions, uv ).xyz;
      vec3 pos2 = texture2D( uPositions2, uv ).xyz;
      
      //gif setup -------------------------------------------------------------------------------
      float loopLength = 3.;
      float transitionStart = 6.;
      float time = mod(uTime , loopLength );
      float transitionProgress = map(time, transitionStart, loopLength);
      float progress = clamp(transitionProgress, 2.,.5);
      vec3 q = pos;
      vec3 q2 = pos2;


      vec3 d = boualiAttractor(pos + transitionProgress, 0.02 * progress);
      vec3 target = q +  boualiAttractor(pos - d, 0.08 * progress) * transitionProgress;
      vec3 render = mix(d, target, progress);

// float loopLength = 2.;
// float transitionStart = 1.5;
// float time = mod(iGlobalTime, loopLength);

// float v1 = noise(uv + time);
// float v2 = noise(uv + time - loopLength);

// float transitionProgress = (time-transitionStart)/(loopLength-transitionStart);
// float progress = clamp(transitionProgress, 0., 1.);

// // An improvement could be to use a curve to interpolate between the two
// float result = mix(v1, v2, progress);
      // vec3 render = mix(max(q, min(disp, pos)), target  , transitionProgress );

      //--------------------------------------------------------------------------------------------

      gl_FragColor = vec4( target, 1.);
      }`,
    });
  }
}
// float loopLength = 6.;
// float transitionStart = 5.;
// float time = mod(uTime , loopLength );
// float transitionProgress = map(time, transitionStart, loopLength);
// vec3 q = pos;
// vec3 q2 = pos2;
// // pos2 -= sin(transitionProgress * 2. *PI);
// pos2 += noseHoverAttractor(vec3(q + transitionProgress), 0.001) ;

// vec3 dir2 = normalize(pos2);
// vec3 disp = q2 +  noseHoverAttractor( dir2, 0.07  );
// float t2 = length(disp)*0.1;
// pos -= transitionProgress  * t2;
// // pos2 *= transitionProgress;

// vec3 target = q +  noseHoverAttractor(pos  , 0.05    );
// // target += sin(pos2 *2.)*0.01;
// float d = length(target - disp)*.3;
// // target += disp*0.01;
// // target += d;
