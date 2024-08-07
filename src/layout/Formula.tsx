import { FC, useState } from "react";

type Props = {
  param: {
    fix?: { [key: string]: number };
    eq: { x: string; y: string; z: string };
  };
};

const Formula: FC<Props> = ({ param }) => {
  // const { param:{fix} } = dataApp;
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div className="formula-wrap">
      <div className="" style={{ opacity: isOpen ? 1 : 0 }}>
        {/* <h3 className="formula-title">Equations </h3> */}
        {/* <div className="pb-5">Thomas attractor by Thomas</div> */}

        <div className="formula-wrap-text">
          {param.fix &&
            Object.entries(param.fix).map(([k, v], i) => (
              <span key={i} className="formula-text">
                {k} = {v}
              </span>
            ))}
        </div>
        <div className="formula-wrap-text ">
          {Object.entries(param.eq).map(([k, v], i) => (
            <span key={i} className="formula-text">
              {k} = {v}
            </span>
          ))}
        </div>
      </div>

      <button className="formula-btn" onClick={() => setIsOpen(!isOpen)}>
        <div>{isOpen ? "hide " : "show "}equation</div>
      </button>
    </div>
  );
};

export default Formula;
