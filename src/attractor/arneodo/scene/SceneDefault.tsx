import { Canvas } from "@react-three/fiber";
import ParticlesFBO from "../particles/ParticlesFBO";
import { OrbitControls } from "@react-three/drei";

const SceneDefault = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [-12.3, 16, -5.25] }} dpr={2}>
        <ParticlesFBO />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default SceneDefault;
// _Vector3{x: -11.356837449778297, y: -18.70462157946972, z: -4.800200298375474}
// _Vector3{x: -17.519361158059468, y: -12.61772407042265, z: -4.39491443675761}
// _Vector3{x: -19.435041401140875, y: 12.225668809324498, z: 3.083869135107967}
// _Vector3{x: -12.289764994861859, y: 16.025373924579842, z: -5.252827555081314}
