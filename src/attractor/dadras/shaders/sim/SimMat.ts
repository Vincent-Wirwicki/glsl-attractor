import { DataTexture, FloatType, RGBAFormat, ShaderMaterial } from "three";
import { getRandomPI } from "../../../0-dataFn/getRandom";
import { getSphere } from "../../../0-dataFn/getSphere";

export default class SimMatDadras extends ShaderMaterial {
  constructor(size: number) {
    const positionsTexture = new DataTexture(
      getRandomPI(size),
      size,
      size,
      RGBAFormat,
      FloatType
    );

    const positionsTexture2 = new DataTexture(
      getSphere(size, 1),
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

    vec3 dadrasAttractor(vec3 pos, float t){
      const float a = 3.;
      const float b = 2.7;
      const float c = 1.7;
      const float d = 2.;
      const float e = 9.;
      
      vec3 target = vec3(0);
      float x = pos.x;
      float y = pos.y;
      float z = pos.z;

      target.x = (y - a*x + b*y*z) ;
      target.y = (c*y - x*z + z) ;
      target.z = (d*x*y - e*z);
      
      return target * t;
    }

    vec3 dadrasAttractorD1(vec3 pos ){
      float a = 3.;
      float b = 2.7;
      float c = 1.7;
      float d = 2.;
      float e = 9.;
      vec3 target = vec3(0);
      target.x = -a * (pos.x) + (1.0 + b * pos.z) * (pos.y ) + (b * pos.y) * (pos.z );
      target.y = -pos.z * (pos.x ) + c * (pos.y ) + (pos.z );
      target.z = (d * pos.y) * (pos.x ) + (d * pos.x) * (pos.y ) - e * (pos.z );
      return target;
    }

    void main() {
      vec2 uv = vUv;   
      vec3 pos = texture2D( uPositions, uv ).xyz;
      vec3 pos2 = texture2D( uPositions2, uv ).xyz;
      float r = length(pos2);
      
      //gif setup -------------------------------------------------------------------------------
      // float loopLength = 15.;
      // float transitionStart =5.;
      // float time = mod(uTime, loopLength);

      // float transitionProgress = (time-transitionStart)/(loopLength-transitionStart);
      // float progress = clamp(transitionProgress, 0., 1.);
      // float offset = sin(transitionProgress * PI *2.) * cos(transitionProgress * PI *2.);
      
      // vec3 target = dadrasAttractor(pos + offset + vec3(1.5)  ,0.005  )  ;
      // vec3 target2 = dadrasAttractorD1(pos2 + offset + vec3(1.5));
      //--------------------------------------------------------------------------------------------
      
      vec3 target = dadrasAttractor(pos, 0.005  ) ;
      // derivate value
      vec3 target2 = dadrasAttractorD1(pos2);
      //particles speed
      float d  = length(target - target2 )*0.25;  
      pos +=(target) *d ; 
      
      gl_FragColor = vec4(pos, 1.);
      }`,
    });
  }
}
// float animationDuration = 3.0; // Duration of animation cycle
// float t = uTime / animationDuration; // Normalized time within the animation cycle
// vec3 repeatOffset = vec3(.0, .0,0.); // Adjust as needed for different axes
