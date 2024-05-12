import { LazyExoticComponent, lazy } from "react";

export type DataApp = {
  [key: string]: {
    title: string;
    path: string;
    scene: LazyExoticComponent<() => JSX.Element>;
    param: {
      fix: { [key: string]: number };
      eq: { x: string; y: string; z: string };
    };
  };
};

export const dataApp: DataApp = {
  dadras: {
    title: "Dadras",
    path: "/",
    scene: lazy(() => import("./attractor/dadras/scene/DadrasScene")),
    param: {
      fix: { a: 3, b: 2.7, c: 1.7, d: 2, e: 9 },
      eq: { x: "(y - a*x + b*y*z)", y: "(c*y - x*z + z)", z: "(d*x*y - e*z)" },
    },
  },
  halvorsen: {
    title: "Halvorsen",
    path: "/halvorsen",
    scene: lazy(() => import("./attractor/halvorsen/scene/SceneDefault")),
    param: {
      fix: { a: 1.89 },
      eq: {
        x: "a*x - 4.*y - 4.*z - y*y",
        y: "-a*y - 4.*z - 4.*x - z*z",
        z: "-a*z - 4.*x - 4.*y - x*x",
      },
    },
  },
  thomas: {
    title: "Thomas",
    path: "/thomas",
    scene: lazy(() => import("./attractor/thomas/scene/SceneDefault")),
    param: {
      fix: { b: 0.19 },
      eq: { x: "-b * x + sin(y)", y: "-b * y + sin(z)", z: "-b * z + sin(x)" },
    },
  },
  sakarya: {
    title: "Sakarya",
    path: "/sakarya",
    scene: lazy(() => import("./attractor/sakarya/scene/SceneDefault")),
    param: {
      fix: { a: 0.4, b: 0.3 },
      eq: { x: "-x + y + y*z", y: "-x -y + a*x*z", z: " z - b*x*y" },
    },
  },
  noseHoover: {
    title: "Nose Hoover",
    path: "/noseHoover",
    scene: lazy(() => import("./attractor/noseHoover/scene/SceneDefault")),
    param: {
      fix: { a: 1.5 },
      eq: { x: "y", y: "-x + y*z", z: "a - y*y" },
    },
  },
  rucklidge: {
    title: "Rucklidge",
    path: "/rucklidge",
    scene: lazy(() => import("./attractor/rucklidge/scene/SceneDefault")),
    param: {
      fix: { a: 6.7, k: 2 },
      eq: { x: "-k*x + a*y -y*z", y: "x", z: "-z + y*y" },
    },
  },
  arneodo: {
    title: "Arneodo",
    path: "/arneodo",
    scene: lazy(() => import("./attractor/arneodo/scene/SceneDefault")),
    param: {
      fix: { a: -5.5, b: 3.5, c: 1 },
      eq: { x: "y", y: "z", z: "-a*x - b*y -z +c *x*x*x" },
    },
  },
  bouali: {
    title: "Bouali",
    path: "/bouali",
    scene: lazy(() => import("./attractor/bouali/scene/SceneDefault")),
    param: {
      fix: { a: 0.3, s: 1, c: -1 },
      eq: {
        x: "x*(4. - y) + a*z",
        y: "-y*(1. - x*x)",
        z: "-x*(1.5 - s *z ) -0.05*z",
      },
    },
  },
  lorenzMod2: {
    title: "Lorenz mod 2",
    path: "/lorenzMod2",
    scene: lazy(() => import("./attractor/lorenzMod2/scene/SceneDefault")),
    param: {
      fix: { a: 0.9, b: 5, c: 9.9, d: 1 },
      eq: {
        x: "-a *x + y*y - z*z + a*c",
        y: "x*(y - b*z) + d",
        z: "z + x * (b*y + z)",
      },
    },
  },
  aizawa: {
    title: "aizawa",
    path: "/aizawa",
    scene: lazy(() => import("./attractor/aizawa/scene/SceneDefault")),
    param: {
      fix: { a: 0.9, b: 5, c: 9.9, d: 1 },
      eq: {
        x: "(z - b)*x - d*y",
        y: "d*x + (z - b)*y",
        z: "c + a*z - (z*z*z / 3.) - (x*x + y*y) * (1. + e*z) + f*z*x*x*x",
      },
    },
  },
};
  // lorenzMod1: {
  //   title: "Lorenz mod 1",
  //   path: "/lorenzMod1",
  //   scene: lazy(() => import("./attractor/lorenzMod1/scene/SceneDefault")),
  //   param: {
  //     fix: { a: 0.1, b: 4, c: 14, d: 0.08 },
  //     eq: {
  //       x: "-a *x + y*y - z*z + a*c",
  //       y: "x*(y - b*z) + d",
  //       z: "z + x * (b*y + z)",
  //     },
  //   },
  // },