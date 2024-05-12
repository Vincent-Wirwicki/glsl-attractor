import { useFrame, useThree } from "@react-three/fiber";
import { MutableRefObject, useEffect } from "react";
import useInitRenderTarget from "./useInitRenderTarget";
import { Camera, Scene, ShaderMaterial } from "three";

type Args = {
  size: number;
  scene: Scene;
  camera: Camera;
  simMatRef: MutableRefObject<ShaderMaterial | null>;
  renderMatRef: MutableRefObject<ShaderMaterial | null>;
};

const useParticlesFBO = ({
  size,
  scene,
  camera,
  simMatRef,
  renderMatRef,
}: Args) => {
  let target = useInitRenderTarget(size);
  let target1 = target.clone();

  const state = useThree();

  //init render scene
  useEffect(() => {
    const { gl } = state;
    gl.setRenderTarget(target);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(target1);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  useFrame(state => {
    const { gl, clock, camera:c } = state;
    console.log(c.position)
    if (simMatRef.current) {
      simMatRef.current.uniforms.uTime.value = clock.elapsedTime;
      simMatRef.current.uniforms.uPositions.value = target.texture;
    }

    if (renderMatRef.current) {
      renderMatRef.current.uniforms.uPositions.value = target1.texture;
    }

    gl.setRenderTarget(target1);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    //swap texture
    const temp = target;
    target = target1;
    target1 = temp;
  });
};

export default useParticlesFBO;
