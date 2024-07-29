import { Canvas } from "@react-three/fiber";
import ParticlesFBO from "../particles/ParticlesFBO";
import { OrbitControls } from "@react-three/drei";

const SceneDefault = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [-35, -2.65, -4.75] }} dpr={2}>
        <ParticlesFBO />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default SceneDefault;
// -17.98, -0.7, 0
// -60, -4.5, -8
