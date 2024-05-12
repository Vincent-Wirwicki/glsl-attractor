import { Canvas } from "@react-three/fiber";
import ParticlesFBO from "../particles/ParticlesFBO";

const SceneDefault = () => (
  <div className="w-full h-full">
    <Canvas camera={{ position: [13, 13, 15] }} dpr={2}>
      <ParticlesFBO />
    </Canvas>
  </div>
);

export default SceneDefault;
