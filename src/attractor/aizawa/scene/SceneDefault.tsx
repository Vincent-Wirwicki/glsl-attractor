import { Canvas } from "@react-three/fiber";
import ParticlesFBO from "../particles/ParticlesFBO";
import { OrbitControls } from "@react-three/drei";

const SceneDefault = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [-3, -0.85, 0.6] }} dpr={2}>
        <ParticlesFBO />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default SceneDefault;

