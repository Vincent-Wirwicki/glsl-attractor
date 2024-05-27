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

    vec3 lorenzMod2attractor(vec3 pos, float dt){
        const float a = .9;	
        const float b = 5.;
        const float c = 9.9;
        const float d = 1.;

        vec3 target = vec3(0);
        float x = pos.x;
        float y = pos.y;
        float z = pos.z;

        target.x = -a *x + y*y - z*z + a*c;
        target.y = x*(y - b*z) + d;
        target.z = z + x * (b*y + z);
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
      vec3 disp = lorenzMod2attractor(1.- pos2 , 0.002  );
      float t2 = length(disp);
      // pos2 *= transitionProgress;
                    // pos += snoiseVec3(pos )*0.004; 

        float force = 0.15*mix(0., 1., smoothstep(0.,2., abs(disp.y   )));
      vec3 target = q +  lorenzMod2attractor(pos + disp   ,  0.002   ) ;
              // target += curlNoise(target )*0.004; 

            // target = abs(transitionProgress  * t2);

      // vec3 render = mix(max(q, min(disp, pos)), target  , transitionProgress );

      //--------------------------------------------------------------------------------------------

      gl_FragColor = vec4(target, 1.);
      }`,
    });
  }
}
