import { FC } from "react";

type Props = {
  param: {
    fix?: { [key: string]: number };
    eq: { x: string; y: string; z: string };
  };
};

const Formula: FC<Props> = ({ param }) => {
  // const { param:{fix} } = dataApp;
  return (
    <div className="fixed z-10 bottom-5 left-5 flex flex-col gap-2 font-light italic w-fit opacity-0 ">
      {/* <h3 className="text-xl not-italic">The Halvorsen attractor</h3>
      <div className="w-full border-b border-dashed "></div> */}

      <h3 className="text-lg tracking-wide text-neutral-200">Equations : </h3>
      <div className="w-full border-b border-neutral-500  "></div>
      <div className="grid grid-cols-2 items-end px-2 pb-2 ">
        {param.fix &&
          Object.entries(param.fix).map(([k, v], i) => (
            <span key={i} className="tracking-widest text-lg">
              {k} = {v}
            </span>
          ))}
      </div>

      {/* <h3 className=" ">Equations :</h3> */}
      {/* <div className="w-full border-b border-dashed "></div> */}

      <div className="px-2 flex flex-col gap-2 ">
        {Object.entries(param.eq).map(([k, v], i) => (
          <span key={i} className="tracking-widest text-lg">
            {k} = {v}
          </span>
        ))}
      </div>
      <div className="w-full border-b  border-neutral-500"></div>

      {/* <p className="not-italic">Differential equation</p> */}
    </div>
  );
};

export default Formula;
