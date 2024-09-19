import { Canvas } from "@react-three/fiber";
import ParticlesFBO from "../particles/ParticlesFBO";
// import ParticlesFBOTwo from "../particles/ParticlesFBOTwo";
import { OrbitControls } from "@react-three/drei";

const SceneDefault = () => {
  return (
    <div className="w-full h-full">
      <div className="absolute z-50 top-1/2 left-1/2 w-40 h-40 translate-x-[-50%] translate-y-[-50%] rotate-45  mix-blend-difference bg-neutral-200 rounded-full "></div>
      <div className="absolute z-50 top-1/2 left-1/2 w-52 h-52 translate-x-[-50%] translate-y-[-50%] rotate-45  mix-blend-difference bg-neutral-200 "></div>
      <div className="absolute z-50 top-1/2 left-1/2 w-72 h-72 translate-x-[-50%] translate-y-[-50%] rotate-45  mix-blend-difference bg-neutral-200 "></div>
      <Canvas camera={{ position: [7.2, 7.2, 8] }} dpr={2}>
        <ParticlesFBO />
        {/* <ParticlesFBOTwo /> */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default SceneDefault;
// _Vector3{x: 0.7897078616265505, y: 15.46172571775727, z: -1.070155188500385}
// _Vector3{x: 0.6410029017239454, y: -6.739706631140567, z: -2.532054543505871}
// _Vector3{x: 24.891740882632394, y: -21.765002860324596, z: 0.637904464772701}x: 24.891734245344207y: -21.764961070757348z: 0.6372937680676851[[Prototype]]: Object
