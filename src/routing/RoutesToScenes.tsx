import { FC, Suspense } from "react";
import { Route } from "wouter";
import { DataApp } from "../dataApp";
import Formula from "../layout/Formula";

type Props = {
  dataApp: DataApp;
};

const RoutesToScenes: FC<Props> = ({ dataApp }) =>
  Object.keys(dataApp).map((k, i) => {
    const Scene = dataApp[k].scene;
    return (
      <Route key={`${dataApp[k].title} + ${i}`} path={dataApp[k].path}>
        <Suspense fallback={<div>Loading</div>}>
          <Formula param={dataApp[k].param} />
          <Scene />
        </Suspense>
      </Route>
    );
  });

export default RoutesToScenes;
