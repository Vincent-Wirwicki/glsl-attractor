import { Vector3 } from "three";
import { useTheme } from "../../provider/ThemeProvider";
import ParticlesColor from "./ParticlesColor";
import ParticlesSize from "./ParticlesSize";

const ConfigTheme = () => {
  const { setuColor, setuSize, uSize, setTheme, theme } = useTheme();
  const vecColors = {
    orange: new Vector3(0.15, 0.05, 0.025),
    blue: new Vector3(0.15, 0.25, 0.5),
    black: new Vector3(0.8, 0.8, 0.8),
    white: new Vector3(0.3, 0.3, 0.3),
  };
  return (
    <div className="fixed z-50 top-5 right-5 flex flex-col gap-4 h-fit p-2">
      <div className="flex gap-5">
        <p>Theme :</p>
        <button
          onClick={() => setTheme("light")}
          style={{ opacity: theme === "light" ? 1 : 0.5 }}
        >
          light
        </button>
        <button
          onClick={() => setTheme("dark")}
          style={{ opacity: theme === "dark" ? 1 : 0.5 }}
        >
          dark
        </button>
      </div>

      <h3>Particle</h3>
      <ParticlesColor colors={vecColors} setuColor={setuColor} />
      <ParticlesSize uSize={uSize} setuSize={setuSize} />
    </div>
  );
};

export default ConfigTheme;

// const SettingsIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     height="24px"
//     viewBox="0 -960 960 960"
//     width="24px"
//     fill="#e8eaed"
//   >
//     <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
//   </svg>
// );
