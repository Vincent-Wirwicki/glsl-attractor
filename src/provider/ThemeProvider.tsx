import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  // useEffect,
  useState,
} from "react";
import { Vector3 } from "three";

// u for uniforms
// uColor = particles color
// uSize = particles size

type ThemeProviderProps = {
  children: ReactNode;
  uColor: Vector3;
  uSize: number;
};

type Theme = "light" | "dark";

type ThemeProviderState = {
  uColor: Vector3 | undefined;
  setuColor: (color: Vector3) => void;
  uSize: number;
  setuSize: (val: number) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  // theme: "system",
  uColor: undefined,
  setuColor: () => null,
  uSize: 4,

  setuSize: () => null,
  theme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [uColor, setuColor] = useState<Vector3>(new Vector3(0.2, 0.2, 0.2));
  const [uSize, setuSize] = useState<number>(6);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);
  const value = {
    uColor,
    setuColor: (color: Vector3) => setuColor(color),
    uSize,
    setuSize: (size: number) => setuSize(size),
    theme,
    setTheme: (theme: "light" | "dark") => setTheme(theme),
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
