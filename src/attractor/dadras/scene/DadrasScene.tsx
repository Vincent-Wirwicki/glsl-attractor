import { Canvas } from "@react-three/fiber";
import ParticlesFBO from "../particles/ParticlesFBO";


const DadrasScene = () => (
  <div className="w-full h-full">
    <Canvas camera={{ position: [0, 5, 15] }} dpr={2}>
      <ParticlesFBO />
    </Canvas>
  </div>
);

export default DadrasScene;
