import { useRef } from "react";
import { ShaderMaterial } from "three";

import useInitFBOScene from "../../../hooks/useInitFBOScene";
import useInitParticles from "../../../hooks/useInitParticles";
import useOnResize from "../../../hooks/useOnResize";

import PortalMesh from "../../../components/three/PortalMesh";
import PointsGeo from "../../../components/three/PointsGeo";

import SimMatRucklidge from "../shaders/sim/SimMat";
import { extend, Object3DNode } from "@react-three/fiber";
import useParticlesFBO from "../../../hooks/useParticlesFBO";

extend({
  SimMatRucklidge,
});

declare module "@react-three/fiber" {
  interface ThreeElements {
    simMatRucklidge: Object3DNode<SimMatRucklidge, typeof SimMatRucklidge>;
  }
}

const ParticlesFBO = () => {
  const size = 512;

  const simMatRef = useRef<ShaderMaterial | null>(null);
  const renderMatRef = useRef<ShaderMaterial | null>(null);

  const { scene, camera, positions, uvs } = useInitFBOScene();
  const particles = useInitParticles(size);

  useOnResize();

  useParticlesFBO({
    size,
    scene,
    camera,
    renderMatRef,
    simMatRef,
  });

  return (
    <>
      <PortalMesh uvs={uvs} positions={positions} scene={scene}>
        <simMatRucklidge ref={simMatRef} args={[size]} />
      </PortalMesh>
      <PointsGeo renderMatRef={renderMatRef} particles={particles} />
    </>
  );
};

export default ParticlesFBO;
