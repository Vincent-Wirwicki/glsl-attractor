import { Canvas } from "@react-three/fiber";
import ParticlesFBO from "../particles/ParticlesFBO";
import { OrbitControls } from "@react-three/drei";

const SceneDefault = () => {
  return (
    <section className="w-full h-full">
      <Canvas camera={{ position: [-0.02, -0.85, 3.8], fov: 65 }} dpr={2}>
        <ParticlesFBO />
        <OrbitControls />
      </Canvas>
    </section>
  );
};

export default SceneDefault;
// 0.15, 2, 3
// very good -0.05, -0.35, 2.6
