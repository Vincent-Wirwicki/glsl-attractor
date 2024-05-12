import { Canvas } from "@react-three/fiber";
import ParticlesFBO from "../particles/ParticlesFBO";
import { OrbitControls } from "@react-three/drei";

const SceneDefault = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [-1.85, -1.45, 22] }} dpr={2}>
        <ParticlesFBO />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default SceneDefault;
// _Vector3{x: -1.8232594723952094, y: -1.4569619126758417, z: 22.039004155371885}x: -1.823644536098419y: -1.4569524264906173z: 22.03900842075215[[Prototype]]: Object
