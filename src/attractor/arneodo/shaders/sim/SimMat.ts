import { DataTexture, FloatType, RGBAFormat, ShaderMaterial } from "three";
import { getRandom, getRandomPI } from "../../../0-dataFn/getRandom";
// import { getSphere } from "../../../0-dataFn/getSphere";

export default class SimMatThomas extends ShaderMaterial {
  constructor(size: number) {
    const positionsTexture = new DataTexture(
      getRandom(size, 3),
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

    vec3 arneodoAttractor(vec3 pos, float dt){
        const float a = -5.5;	
        const float b = 3.5;
        const float c = -1.;

        vec3 target = vec3(0);
        float x = pos.x;
        float y = pos.y;
        float z = pos.z;

        target.x = y ;
        target.y = z;
        target.z = -a*x - b*y -z +c *x*x*x;

        return target *dt ;
    }

    float quadraticOut(in float t) { return -t * (t - 2.0); }

    void main() {
      vec2 uv = vUv;   
      vec3 pos = texture2D( uPositions, uv ).xyz;
      vec3 pos2 = texture2D( uPositions2, uv ).xyz;    
      vec3 q = pos;
      float force = 0.15*mix(0., 1., smoothstep(0., 25., abs(pos2.y))); 
      vec3 target = q +  arneodoAttractor(pos,  quadraticOut(force));
      
      gl_FragColor = vec4(target, 1.);
      }`,
    });
  }
}

