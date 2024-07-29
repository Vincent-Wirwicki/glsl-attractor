import { Canvas } from "@react-three/fiber";
import ParticlesFBO from "../particles/ParticlesFBO";

const SceneDefault = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [-10.5, 13.7, -4.25] }} dpr={2}>
        <ParticlesFBO />
      </Canvas>
    </div>
  );
};

export default SceneDefault;
