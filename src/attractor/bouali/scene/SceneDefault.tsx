import { Canvas } from "@react-three/fiber";
import ParticlesFBO from "../particles/ParticlesFBO";
import { OrbitControls } from "@react-three/drei";

const SceneDefault = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [24.9, -21.75, 0.65] }} dpr={2}>
        <ParticlesFBO />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default SceneDefault;
// _Vector3{x: 0.7897078616265505, y: 15.46172571775727, z: -1.070155188500385}
// _Vector3{x: 0.6410029017239454, y: -6.739706631140567, z: -2.532054543505871}
// _Vector3{x: 24.891740882632394, y: -21.765002860324596, z: 0.637904464772701}x: 24.891734245344207y: -21.764961070757348z: 0.6372937680676851[[Prototype]]: Object
