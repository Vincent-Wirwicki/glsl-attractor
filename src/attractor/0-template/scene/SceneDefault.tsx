import { Canvas,  } from "@react-three/fiber";
import ParticlesFBODefault from "../particles/ParticlesFBODefault";

const SceneDefault = () => {

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 5, 15] }} dpr={2}>
        <ParticlesFBODefault />
      </Canvas>
    </div>
  );
};

export default SceneDefault;
