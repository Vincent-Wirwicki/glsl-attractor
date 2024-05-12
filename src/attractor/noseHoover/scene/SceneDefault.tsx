import { Canvas } from "@react-three/fiber";
import ParticlesFBO from "../particles/ParticlesFBO";
import { OrbitControls } from "@react-three/drei";

const SceneDefault = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [9.5, 10, -5.2] }} dpr={2}>
        <ParticlesFBO />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default SceneDefault;
// _Vector3{x: -11.841280894944509, y: 3.4397541865479098, z: 8.06812604655794}x: -11.841280894944509y: 3.4397541865479098z: 8.06812604655794[[Prototype]]: Object
// 13.5, 1.55, -5.7  -11.85, 3.45, 8   [9.64, 4.5, -10.15]
// _Vector3{x: 9.64313099718305, y: 4.464325912466101, z: -10.16881599393219}x: 9.642961118889229y: 4.464302784262182z: -10.16898724111794[[Prototype]]: Object
// _Vector3{x: -9.518142035274249, y: 9.922903356344829, z: -5.209900303939304}
