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

    vec3 rucklidgeAttractor(vec3 pos, float dt){
        const float a = 6.7;
        const float k = 2.;	
    

        vec3 target = vec3(0);
        float x = pos.x;
        float y = pos.y;
        float z = pos.z;

        target.x = -k*x + a*y -y*z ;
        target.y = x;
        target.z = -z + y*y;
        
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
      // pos2 -= abs(sin(transitionProgress));
      // pos2 += noseHoverAttractor(vec3(q + transitionProgress), 0.001) ;

      vec3 dir2 = normalize(pos);
      vec3 disp = q +  rucklidgeAttractor( pos2 , 0.05  );
      float t2 = length(disp);
      // pos2 *= transitionProgress;
        float force = 0.15*mix(0., 1., smoothstep(0.,2., abs(pos2.y   ))); 

      vec3 target = q +  rucklidgeAttractor(pos - force   , 0.05    );
            // target = abs(transitionProgress  * t2);


      // vec3 render = mix(max(q, min(disp, pos)), target  , transitionProgress );

      //--------------------------------------------------------------------------------------------

      gl_FragColor = vec4(target, 1.);
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
