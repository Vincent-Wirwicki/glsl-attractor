import { Canvas } from "@react-three/fiber";
import ParticlesFBO from "../particles/ParticlesFBO";
import { OrbitControls } from "@react-three/drei";

const SceneDefault = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 1, 3] }} dpr={2}>
        <ParticlesFBO />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default SceneDefault;
// _Vector3{x: 0.13589303545797712, y: -1.052360343436808, z: 1.2627572926436121}
//       <Canvas camera={{ position: [0.1, -3.3, -1] }} dpr={2}>
// _Vector3{x: 0.2047071370220041, y: -1.3464609050562037, z: 0.6414284427222603}
// _Vector3{x: 0.023663917847905724, y: -1.2887092065862549, z: -0.16336105300426818}
