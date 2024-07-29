import { Vector3 } from "three";

const ParticlesColor = ({
  colors,
  setuColor,
}: {
  colors: { [key: string]: Vector3 };
  setuColor: (color: Vector3) => void;
}) => {
  const vec3ToRgb = (v: Vector3) => [
    Math.round(v.x * 255),
    Math.round(v.y * 255),
    Math.round(v.z * 255),
  ];
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        Colors
        {Object.entries(colors).map(([k, v], i) => (
          <button
            key={`${i} + ${k}`}
            aria-label={`${k} color for particles`}
            name={`color-${k}`}
            style={{
              backgroundColor: `rgb(${[...vec3ToRgb(v)]})`,
            }}
            className="w-6 h-6 p-2 rounded-xl "
            onClick={() => setuColor(v)}
          ></button>
        ))}
      </div>
      {/*  
        <div>or pick a color</div>
        <input
        className="border-0 outline-0 w-full bg-neutral-950"
        aria-label="pick a color for particles"
        type="color"
        value={uColor ? vec3ToHex(uColor) : "#fff"}
        onChange={e => setuColor(hexToVector3(e.currentTarget.value))}
      /> */}
    </div>
  );
};

export default ParticlesColor;

// const vec3ToHex = (color: Vector3) => {
//   // Scale the values from [0, 1] to [0, 255]
//   const r = Math.round(color.x * 255);
//   const g = Math.round(color.y * 255);
//   const b = Math.round(color.z * 255);

//   // Convert to hex and pad with zeros if necessary
//   const rHex = r.toString(16).padStart(2, "0");
//   const gHex = g.toString(16).padStart(2, "0");
//   const bHex = b.toString(16).padStart(2, "0");

//   // Combine the hex values
//   return `#${rHex}${gHex}${bHex}`;
// };

// const hexToVector3 = (hex: string) => {
//   hex = hex.replace(/^#/, "");

//   const bigint = parseInt(hex, 16);
//   const r = (bigint >> 16) & 255;
//   const g = (bigint >> 8) & 255;
//   const b = bigint & 255;

//   return new Vector3(r / 255, g / 255, b / 255);
// };
