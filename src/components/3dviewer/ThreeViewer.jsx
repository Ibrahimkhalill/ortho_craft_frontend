/* eslint-disable react/no-unknown-property */
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function ObjModel({ src }) {
  const obj = useLoader(OBJLoader, src); // <-- FIXED
  return <primitive object={obj} scale={0.01} />;
}

export default function ThreeViewer({ data }) {
  return (
    <div className="w-full h-[350px]">
      <Canvas
        camera={{ position: [2, 3, 2] }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <OrbitControls />
        <ObjModel src={data} />
      </Canvas>
    </div>
  );
}
