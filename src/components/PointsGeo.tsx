import { FC, MutableRefObject } from "react";
import { AdditiveBlending, ShaderMaterial, Vector3 } from "three";
import RenderMat from "../attractor/0-template/shaders/render/RenderMat";
import { extend, Object3DNode } from "@react-three/fiber";

extend({
  RenderMat: RenderMat,
});

declare module "@react-three/fiber" {
  interface ThreeElements {
    renderMat: Object3DNode<RenderMat, typeof RenderMat>;
  }
}

type Props = {
  color: Vector3;
  renderMatRef: MutableRefObject<ShaderMaterial | null>;
  particles: Float32Array;
};

const PointsGeo: FC<Props> = ({ color, particles, renderMatRef }) => {
  return (
    <points>
      <renderMat
        ref={renderMatRef}
        args={[color]}
        blending={AdditiveBlending}
        depthWrite={false}
        transparent={false}
      />
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  );
};

export default PointsGeo;
