import { FC } from "react";
import { Link } from "wouter";
import { DataApp } from "../dataApp";

type Props = {
  dataApp: DataApp;
};

const MainNav: FC<Props> = ({ dataApp }) => {
  return (
    <nav className="nav">
      <h3 className="pb-2">Strange attractor</h3>
      <div className="border-l pl-2 flex flex-col border-neutral-500">
        {Object.keys(dataApp).map((k, i) => (
          <Link
            key={i + "auzyia"}
            to={dataApp[k].path}
            className={active =>
              active ? "nav-link text-neutral-200" : "nav-link "
            }
          >
            {dataApp[k].title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MainNav;
