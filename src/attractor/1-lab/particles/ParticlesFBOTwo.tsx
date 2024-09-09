import { useRef } from "react";
import { ShaderMaterial } from "three";

import useInitFBOScene from "../../../hooks/useInitFBOScene";
import useInitParticles from "../../../hooks/useInitParticles";
import useOnResize from "../../../hooks/useOnResize";

import PortalMesh from "../../../components/three/PortalMesh";
import PointsGeo from "../../../components/three/PointsGeo";

import SimMatLabTwo from "../shaders/sim/SimMatTwo";
import { extend, Object3DNode } from "@react-three/fiber";
import useParticlesFBO from "../../../hooks/useParticlesFBO";

extend({
  SimMatLabTwo,
});

declare module "@react-three/fiber" {
  interface ThreeElements {
    simMatLabTwo: Object3DNode<SimMatLabTwo, typeof SimMatLabTwo>;
  }
}

const ParticlesFBOTwo = () => {
  const size = 512;

  const simMatRef = useRef<ShaderMaterial | null>(null);
  const renderMatRef = useRef<ShaderMaterial | null>(null);

  const { scene, camera, positions, uvs } = useInitFBOScene();
  const particles = useInitParticles(size);

  // useOnResize();

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
        <simMatLabTwo ref={simMatRef} args={[size]} />
      </PortalMesh>
      <PointsGeo renderMatRef={renderMatRef} particles={particles} />
    </>
  );
};

export default ParticlesFBOTwo;
