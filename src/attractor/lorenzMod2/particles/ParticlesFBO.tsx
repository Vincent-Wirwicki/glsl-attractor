import { useRef } from "react";
import { ShaderMaterial, Vector3 } from "three";

import useInitFBOScene from "../../../hooks/useInitFBOScene";
import useInitParticles from "../../../hooks/useInitParticles";
import useOnResize from "../../../hooks/useOnResize";

import PortalMesh from "../../../components/PortalMesh";
import PointsGeo from "../../../components/PointsGeo";

import SimMatLorenzModTwo from "../shaders/sim/SimMat";
import { extend, Object3DNode } from "@react-three/fiber";
import useParticlesFBO from "../../../hooks/useParticlesFBO";

extend({
  SimMatLorenzModTwo,
});

declare module "@react-three/fiber" {
  interface ThreeElements {
    simMatLorenzModTwo: Object3DNode<
      SimMatLorenzModTwo,
      typeof SimMatLorenzModTwo
    >;
  }
}

const ParticlesFBO = () => {
  const size = 512;
  const color = new Vector3(0.95, 0.15, 0.15);

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
        <simMatLorenzModTwo ref={simMatRef} args={[size]} />
      </PortalMesh>
      <PointsGeo
        color={color}
        renderMatRef={renderMatRef}
        particles={particles}
      />
    </>
  );
};

export default ParticlesFBO;
