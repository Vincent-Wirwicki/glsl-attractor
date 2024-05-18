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

    vec3 noseHoverAttractor(vec3 pos, float dt){
        const float a = 1.5;	

        vec3 target = vec3(0);
        float x = pos.x;
        float y = pos.y;
        float z = pos.z;

        target.x = y ;
        target.y = -x + y*z;
        target.z = a - y*y;

        return target *dt ;
    }
float quadraticOut(in float t) { return -t * (t - 2.0); }

    float map(float v, float iMin, float iMax ) { return (v-iMin)/(iMax-iMin); }
  // ---------------------------------------------------------------------------------------------
      //	Simplex 3D Noise 
      //	by Ian McEwan, Ashima Arts

    vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
      vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

      vec4 permute(const in vec4 v) { return mod289(((v * 34.0) + 1.0) * v); }

      float snoise(vec3 v)
        {
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
          
      // First corner
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 =   v - i + dot(i, C.xxx) ;
          
      // Other corners
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
          
        //   x0 = x0 - 0.0 + 0.0 * C.xxx;
        //   x1 = x0 - i1  + 1.0 * C.xxx;
        //   x2 = x0 - i2  + 2.0 * C.xxx;
        //   x3 = x0 - 1.0 + 3.0 * C.xxx;
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
        vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
          
      // Permutations
        i = mod289(i);
        vec4 p = permute( permute( permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
          
      // Gradients: 7x7 points over a square, mapped onto an octahedron.
      // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
        float n_ = 0.142857142857; // 1.0/7.0
        vec3  ns = n_ * D.wyz - D.xzx;
          
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
          
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
          
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
          
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
          
        //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
        //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
          
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
          
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
          
      //Normalise gradients
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
          
      // Mix final noise value
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                      dot(p2,x2), dot(p3,x3) ) );
        }
    void main() {
      vec2 uv = vUv;   
      vec3 pos = texture2D( uPositions, uv ).xyz;
      vec3 pos2 = texture2D( uPositions2, uv ).xyz;
      
      //gif setup -------------------------------------------------------------------------------
      float loopLength = 1.;
      float transitionStart = 2.;
      float time = mod(uTime , loopLength );
      float transitionProgress = map(time, transitionStart, loopLength);
      // float progress = clamp(transitionProgress, 0.05,0.075);
      float progress = mix(0.05,0.075,transitionProgress);
      vec3 q = pos;
      vec3 q2 = pos2;
      // pos2 -= abs(sin(transitionProgress));
      // pos2 += noseHoverAttractor(vec3(q + transitionProgress), 0.001) ;

      vec3 dir2 = normalize(pos);
      vec3 disp = q +  noseHoverAttractor( pos2 , 0.05  );
    
      float t2 = length(disp);
      // pos2 *= transitionProgress;
        float force = 0.15*mix(0.5, 1., smoothstep(5.,10., fract(pos2.y   ))); 
          float nn = snoise(pos2 - transitionProgress * .5 ) *0.01;

      vec3 target = pos +  noseHoverAttractor(pos - transitionProgress * nn, progress   );
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
