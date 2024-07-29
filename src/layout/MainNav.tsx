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
      <ul className="nav-wrap-links">
        {Object.keys(dataApp)
          .sort((a, b) => {
            if (dataApp[a].title < dataApp[b].title) return -1;
            if (dataApp[a].title > dataApp[b].title) return 1;
            return 0;
          })
          .map((k, i) => (
            <Link
              key={i}
              to={dataApp[k].path}
              className={active =>
                active ? "nav-link text-neutral-200" : "nav-link "
              }
            >
              <li>{dataApp[k].title}</li>
            </Link>
          ))}
      </ul>
    </nav>
  );
};

export default MainNav;
