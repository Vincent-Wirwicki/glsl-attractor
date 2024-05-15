import { Canvas } from "@react-three/fiber";
import ParticlesFBO from "../particles/ParticlesFBO";

const SceneDefault = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [-6.02, -6.03, -5.03] }} dpr={2}>
        <ParticlesFBO />
      </Canvas>
    </div>
  );
};

export default SceneDefault;
