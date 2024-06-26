import { Canvas } from "@react-three/fiber";
import ParticlesFBO from "../particles/ParticlesFBO";
import { OrbitControls } from "@react-three/drei";

const SceneDefault = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [-17.98, -0.7, 0] }} dpr={2}>
        <ParticlesFBO />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default SceneDefault;
// _Vector3{x: -18.018461789055493, y: -0.24317896297107686, z: -0.19179513840365833}
// _Vector3{x: 17.82243831295663, y: 1.6232687262100325, z: -1.9565764036636768}
