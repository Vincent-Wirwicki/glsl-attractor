import { ShaderMaterial, Vector3 } from "three";

export default class RenderMat extends ShaderMaterial {
  constructor(color: Vector3 | undefined, size: number) {
    super({
      uniforms: {
        uPositions: { value: null },
        uTime: { value: 0 },
        uColor: { value: color ? color : new Vector3(0.15, 0.25, 0.5) },
        uSize: { value: size },
      },
      fragmentShader: /* glsl */ `

        uniform float uTime;
        uniform vec3 uColor;
        varying float vDistance;
        varying vec2 vUv;
        varying vec3 vPos;

        void main() {        
          // gl_FragColor = vec4(vec3(0.8),.8);
          float dist = length(gl_PointCoord.xy - vec2(0.5)) *0.5;
          // float dist = length(vDistance - vec2(0.5));
         
          vec3 color = uColor;

          gl_FragColor = vec4(color,1.);
        }`,

      vertexShader: /*glsl */ `
        uniform sampler2D uPositions;
        uniform float uTime;
        uniform float uSize;
        varying vec3 vPos;
        varying float vDistance;
        varying vec2 vUv;
        void main() {
          vec3 pos = texture2D( uPositions, position.xy ).xyz;
          vPos = position;
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.);
          vDistance = -mvPosition.z;
          gl_PointSize = uSize * (1./ -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;

        }`,
    });
  }
}

//   vec3 color = vec3(0.15,0.45,0.75);
// vec3 color = vec3(0.45,0.25,0.1);
// vec3 color = vec3(1.);

//   float angle = atan(vPos.x, vPos.y );
//   float alpha = cos(angle ) * sin(angle ) * dist;

//   dist = 1. - clamp(dist, 0.,1.);
//   if(dist > 0.85) alpha =0.15;
// if(t < 0.25) alpha = 0.;
// vec2 a = vUv - 0.5 ;
