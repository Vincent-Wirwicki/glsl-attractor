import { FC, MutableRefObject } from "react";
import { AdditiveBlending, ShaderMaterial } from "three";
import RenderMat from "../../attractor/0-renderMat/RenderMat";
import { extend, Object3DNode } from "@react-three/fiber";
import { useTheme } from "../../provider/ThemeProvider";

extend({
  RenderMat,
});

declare module "@react-three/fiber" {
  interface ThreeElements {
    renderMat: Object3DNode<RenderMat, typeof RenderMat>;
  }
}

type Props = {
  size?: number;
  renderMatRef: MutableRefObject<ShaderMaterial | null>;
  particles: Float32Array;
};

const PointsGeo: FC<Props> = ({ particles, renderMatRef }) => {
  const { uColor, uSize } = useTheme();

  return (
    <points frustumCulled={false}>
      <renderMat
        ref={renderMatRef}
        args={[uColor, uSize]}
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
